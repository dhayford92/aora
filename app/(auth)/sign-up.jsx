import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createUser, getCurrentUser } from '../../lib/appwrite'
import { toast } from '../../lib/toaster'

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignUp = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      toast("User registered successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode='contain'
          />
          <Text className="text-2xl text-white font-psemibold mt-6">
            Sign Up
          </Text>

          <FormField 
            title={'Username'}
            value={form.username}
            placeholder={'Your unique username'}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles={'mt-7'}
          />

          <FormField 
            title={'Email'}
            value={form.email}
            placeholder={'Enter your email'}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType={'email-address'}
            otherStyles={'mt-7'}
          />

          <FormField 
            title="Password"
            value={form.password}
            placeholder={'Enter your password'}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles={'mt-7'}
          />

          
          <CustomButton 
            title={'Sign Up'} 
            containerStyles="mt-7 w-full"
            handlePress={handleSignUp}
            isLoading={isSubmitting}
          />

          <Text className="text-sm text-white font-pregular mt-5 text-center">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-secondary font-psemibold">
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp