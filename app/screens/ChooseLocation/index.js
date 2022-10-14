import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import AddressPickUp from '../../components/AddressPickUp'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { showError, showSuccess } from '../../helper/helper'


const ChooseLocation = ({route}) => {
  const navigation=useNavigation()
  const [state, setState] = useState({
    
    //gedeceyim yerin kordinatlari manual olaraq
    destinationCords: {},
  });
  const {destinationCords} = state;

  const checkValid=()=>{
    
    if(Object.keys(destinationCords).length===0){
      showError("Please select your destination location")
      return false
    }
    return true
  }
  const onDone=()=>{
    const isValid=checkValid()
    
    if(isValid){
      route.params.getCordinates({
        
        destinationCords
      })
      showSuccess("Success")
      navigation.goBack()
    }
    
  }

  
 
  const fetchDestinationCords=(lat,lng,zipCode,cityText)=>{
    
    setState({...state,destinationCords:{
      latitude:lat,
      longitude:lng
    }})
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      
      <AddressPickUp placeholderText={"Enter destination location"} fetchAddress={fetchDestinationCords}/>
      <Button btnText={"Done"} btnStyle={{marginTop:12}} onPress={onDone}/>
      </ScrollView>
    </View>
  )
}

export default ChooseLocation

const styles = StyleSheet.create({
  container:{
    flex:1,
   
  },
  scrollView:{
    backgroundColor:'white',
    flex:1
  }
})