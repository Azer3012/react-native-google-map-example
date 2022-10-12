import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChooseLocation, Home } from '../screens'


  const Stack=createNativeStackNavigator()

const Stacks = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='ChooseLocation' component={ChooseLocation}/>
    </Stack.Navigator>
  )
}

export default Stacks

const styles = StyleSheet.create({})