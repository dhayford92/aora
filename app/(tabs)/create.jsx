import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import * as ImagePicker from 'expo-image-picker';
import { createVideoPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const [isuloading, setIsLoading] = React.useState(false)
  const {user} = useGlobalContext();
  const [form, setForm] = React.useState({
    title: '',
    prompt: '',
    video: '',
    thumbnail: ''
  })

  const openPicker = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image'? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (type === 'image') {
        setForm({...form, thumbnail: result.assets[0]})
      } else {
        setForm({...form, video: result.assets[0]})
      }
    
    }

  }

  const submetForm = async () => {
    if(!form.title || !form.prompt || !form.video || !form.thumbnail) {
      Alert.alert("Error", 'Please fill all fields')
      return
    }

    setIsLoading(true)
    try{
      await createVideoPost(form, user.$id)
      Alert.alert("Success", "Video uploaded successfully")
      setForm({
        title: '',
        prompt: '',
        video: '',
        thumbnail: ''
      })
    } catch(e) {
      Alert.alert("Error", e.message)
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>

        <FormField
            title="Video Title"
            value={form.title}
            handleChangeText={(text) => setForm({...form, title: text})}
            placeholder="Give your video a catchy title..."
            otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium ">Upload A Video</Text>
          <TouchableOpacity onPress={openPicker}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={ResizeMode.COVER}
                className="w-full h-[200px] bg-black-100 rounded-2xl"
              />
            ) : (  
              <View className="w-full h-[200px] bg-black-100 rounded-2xl items-center justify-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium ">Thumbnail Image</Text>
          <TouchableOpacity onPress={()=>openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-[200px] bg-black-100 rounded-2xl"
                resizeMode="cover"
              />
            ) : (  
              <View className="w-full h-[70px] bg-black-100 rounded-2xl flex-row items-center justify-center">
                <Image
                    source={icons.upload}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                <Text className="text-gray-100 text-sm font-pmedium ml-2">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
            title="AI Prompt"
            value={form.prompt}
            handleChangeText={(text) => setForm({...form, prompt: text})}
            placeholder="The AI prompt of your video...."
            otherStyles="mt-10"
        />

        <CustomButton
            title="Submit & Publish"
            handlePress={submetForm}
            containerStyles="mt-10"
            isLoading={isuloading}
        />
        

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create