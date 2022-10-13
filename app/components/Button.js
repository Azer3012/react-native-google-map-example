import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({
    onPress=()=>{},
    btnStyle={},
    btnText
}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{...styles.btnStyle,...btnStyle}}
    
    >
        <Text>
            {btnText}
        </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    btnStyle:{
        height:48,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:20,
        borderWidth:1
    }
})