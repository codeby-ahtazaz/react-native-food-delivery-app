import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const signup = () => {
  return (
    <View>
      <Text>signup</Text>
      <Button title='Sign in' onPress={ () => router.push("/sign-in")}></Button>
    </View>
  )
}

export default signup