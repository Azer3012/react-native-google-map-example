import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import AddressPickUp from '../../components/AddressPickUp'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'


const ChooseLocation = () => {
  const navigation=useNavigation()
  const onDone=()=>{
    navigation.goBack()
  }
  const fetchAddressCords=(lat,lng)=>{
    console.log({lat,lng});
  }
  const fetchDestinationCords=(lat,lng)=>{
    console.log({lat,lng})
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <AddressPickUp placeholderText={"Enter pickup location"} fetchAddress={fetchAddressCords}/>
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