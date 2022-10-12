import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const App = () => {
  const [state, setState] = useState({
    pickUpCords: {
      latitude: 40.52983,
      longitude: 50.00616,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropLocationCords: {
      latitude: 40.47746,
      longitude: 49.94174,
      latitudeDelta: 0.0922,
      ongitudeDelta: 0.0421,
    },
  });
  const {dropLocationCords, pickUpCords} = state;

  const mapRef=useRef()
  return (
    <View style={styles.container}>
      <MapView 
      ref={mapRef}
      style={StyleSheet.absoluteFill} initialRegion={pickUpCords}>
        <Marker coordinate={pickUpCords} />
        <Marker coordinate={dropLocationCords} />
        <MapViewDirections
          origin={pickUpCords}
          destination={dropLocationCords}
          apikey={'AIzaSyCKsywDvvL08D1IjV4hYTmgpX6DmCk2V44'}
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
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
