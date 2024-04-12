import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { toast } from '../../lib/toaster'

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true)

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      toast("User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
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
            Sign in
          </Text>

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

          <Link href="" className="text-sm text-white font-pregular mt-4 self-end">
            Forgot password
          </Link>

          
          <CustomButton 
            title={'Log In'} 
            containerStyles="mt-7 w-full"
            handlePress={handleSignIn}
            isLoading={isSubmitting}
          />

          <Text className="text-sm text-white font-pregular mt-5 text-center">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-secondary font-psemibold">
              Signup
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn