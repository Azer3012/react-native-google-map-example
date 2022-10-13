import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {API_KEY} from "@env"


const AddressPickUp = ({placeholderText,fetchAddress}) => {

    const onPressAddress=(data,details)=>{
        
        const lat=details.geometry.location.lat
        const lng=details.geometry.location.lng
        fetchAddress(lat,lng)
        
    }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      placeholder={placeholderText}
      fetchDetails={true}
      onPress={onPressAddress}
      query={{
        key: API_KEY,
        language: 'en',
      }}
      styles={{
        textInputContainer:styles.containerStyle,
        textInput:styles.inputStyle
      }}
    />
    </View>
  )
}

export default AddressPickUp

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerStyle:{
        backgroundColor:'white'
    },
    inputStyle:{
        height:48,
        color:'black',
        fontSize:16,
        backgroundColor:'#F3F3F3',
        marginHorizontal:20
    }
})