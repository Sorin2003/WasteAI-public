import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const offers = () => {
  return (
    <View>
      <Text>offers</Text>

    <Link href ="/home">Go home</Link>
      <Link href ="/scanner">Go Scanner</Link>
      <Link href ="/login">Go login</Link>
      <Link href ="/signUp">Go SignUp</Link>
      <Link href ="/pantry">Go Pantry</Link>
    </View>
  )
}

export default offers

