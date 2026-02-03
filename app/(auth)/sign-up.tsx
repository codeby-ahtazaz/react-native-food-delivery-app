import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { register } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const signUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ name: 'Easy Man', email: 'easy@mailinator.com', password: 'Test123!' })

  const submit = async () => {
    const {name, email, password} = form;

    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid name, email and password')

    setIsLoading(true)

    try {
      await register({name, email, password})

      Alert.alert('Success', 'User signed up successfully.')
      router.replace('/')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <View className=' gap-10 bg-white rounded-lg p-5 mt-5'>
      {/* <Text>signin</Text>
            <Button title='Sign up' onPress={() => router.push("/sign-up")}></Button> */}

      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
        label="Full name"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        title='Sign Up'
        isLoading={isLoading}
        onPress={submit}
      />

      <View className=' flex flex-row flex-center gap-2 mt-5'>
        <Text className=' base-regular text-gray-100' > Already have an account? </Text>
        <Link className=' base-bold text-primary'
          href="/(auth)/sign-in">Sign In</Link>
      </View>
    </View>
  )
}

export default signUp