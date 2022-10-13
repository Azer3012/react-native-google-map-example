import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import imagePath from '../../constants/imagePath';
import { useNavigation } from '@react-navigation/native';
import {API_KEY} from '@env'

const Home = () => {

 
  console.log(API_KEY);
  const navigation=useNavigation()
    const [state, setState] = useState({
        //oldugum yerin kordinati
        pickUpCords: {
          latitude: 40.52983,
          longitude: 50.00616,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        //gedeceyim yerin kordinatlari
        dropLocationCords: {
          latitude: 40.47746,
          longitude: 49.94174,
          latitudeDelta: 0.0922,
          ongitudeDelta: 0.0421,
        },
      });
      const {dropLocationCords, pickUpCords} = state;
    
      const mapRef=useRef()

      const onPressLocation=()=>{
        navigation.navigate('ChooseLocation')
      }
  return (
    <View style={styles.container}>
      <View  style={styles.mapView}>
      <MapView 
      ref={mapRef}
      style={StyleSheet.absoluteFill} initialRegion={pickUpCords}>
        <Marker coordinate={pickUpCords} image={imagePath.icCurLoc} />
        <Marker coordinate={dropLocationCords} image={imagePath.icGreenMarker} />
        <MapViewDirections
          origin={pickUpCords}
          destination={dropLocationCords}
          apikey={API_KEY}
          strokeWidth={3}
          strokeColor="red"
          optimizeWaypoints={true}
          onReady={result=>{
            mapRef.current.fitToCoordinates(result.coordinates,{
              edgePadding:{
                right:30,
                bottom:300,
                left:30,
                top:100
              }
            })
          }}
        />
      </MapView>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where are you going?</Text>
        <TouchableOpacity style={styles.btn} onPress={onPressLocation}>
          <Text>Choose your Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    mapView:{
      flex:1
    },
    bottomCard:{
      backgroundColor:'white',
      width:'100%',
      padding:30,
      borderTopEndRadius:24,
      borderTopStartRadius:24
    },
    btn:{
      backgroundColor:'white',
      borderWidth:1,
      borderRadius:4,
      height:48,
      alignItems:'center',
      justifyContent:'center',
      marginTop:16
    }
})