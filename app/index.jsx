import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function App() {

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{ height: "100%"}}
      >
        <View className="w-full min-h-[85vh] justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className="w-[300px] h-[300px]"
            resizeMode='contain'
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">
                Aora
              </Text>
            </Text>

            <Image
              source={images.path}
              className="w-[135px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode='contain'
            />
          </View>

          <Text className="text-sm text-white mt-7 text-center font-pregular">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>

          <CustomButton 
            title={'Continue with Email'} 
            containerStyles="mt-7 w-full"
            handlePress={() => router.push('/sign-in')}
          />
        </View>
      </ScrollView>
      
      <StatusBar backgroundColor='#161622' style="light" />
    </SafeAreaView>
  );
}


