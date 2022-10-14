import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import imagePath from '../../constants/imagePath';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from '@env';
import {locationPermission, getCurrentLocation} from '../../helper/helper';

const Home = () => {
  const screen = Dimensions.get('window');

  const ASPECT_RATIO = screen.width / screen.height;

  const latitudeDelta = 0.04;
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;

  const mapRef = useRef();
  const markerRef=useRef()

  const [state, setState] = useState({
    //oldugum yerin kordinati manual olaraq
    currentLocation: {
      latitude: 40.52983,
      longitude: 50.00616,
    },
    //gedeceyim yerin kordinatlari manual olaraq
    destinationCords: {},
    isLoading:false,
    coordinate: new AnimatedRegion({
      latitude: 40.52983,
      longitude: 50.00616,
      latitudeDelta,
      longitudeDelta
    }),
    time:0,
    distance:0,
    heading:0
  });

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied === 'granted') {
      const {latitude, longitude,heading} = await getCurrentLocation();
      animate(latitude,longitude)
      setState({
        ...state,
        currentLocation: {
          latitude,
          longitude,
        },
        coordinate: new AnimatedRegion({
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }),
        time:0,
        distance:0,
        heading:heading
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  });

  

  const navigation = useNavigation();

  const {currentLocation, destinationCords,coordinate,isLoading,time,distance,heading} = state;

  const onPressLocation = () => {
    //rouute ile function gonderim heminsehifede datalari almaq ucun
    navigation.navigate('ChooseLocation', {getCordinates: fetchValues});
  };
  const fetchValues = data => {
    setState({
      ...state,

      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const animate=(latitude,longitude)=>{
    const newCoordinate={latitude,longitude}
    if(Platform.OS==='android'){
      if(markerRef.current){
        markerRef.current.animateMarkerToCoordinate(newCoordinate,7000)
      }
    }
    else{
      coordinate.timing(newCoordinate).start()
    }
  }

  const onCenter=()=>{
    mapRef.current.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  const fetchTime=(distance,time)=>{
    setState(state=>({...state,time,distance}))
  }

  return (
    <View style={styles.container}>
      {distance!==0 && time!==0 &&<View style={styles.timeAndDistance}>
        
          <Text>Time left :{time?.toFixed(0)}</Text>
          <Text>Distance left :{distance?.toFixed(0)}</Text>
        
      </View>}
      <View style={styles.mapView}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{...currentLocation, latitudeDelta, longitudeDelta}}
          
          
          >
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image source={imagePath.car} style={{width:40,height:40,transform:[{rotate:`${-heading}deg`}]}} resizeMode="contain"/>
          </Marker.Animated>
          {Object.keys(destinationCords).length > 0 && (
            <Marker
              coordinate={destinationCords}
              image={imagePath.icGreenMarker}
            />
          )}
          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={currentLocation}
              destination={destinationCords}
              apikey={API_KEY}
              strokeWidth={3}
              strokeColor="red"
              optimizeWaypoints={true}
              lineDashPattern={[0]}
              onReady={result => {
                
                fetchTime(result.distance,result.duration)
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // right:30,
                    // bottom:300,
                    // left:30,
                    // top:100
                  },
                });
              }}
            />
          )}
        </MapView>
        <TouchableOpacity 
        onPress={onCenter}
        style={styles.greenIndicator}
        >
          <Image source={imagePath.greenIndicator}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where are you going?</Text>
        <TouchableOpacity style={styles.btn} onPress={onPressLocation}>
          <Text>Choose your Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  mapView: {
    flex: 1,
   
    
  },
  safeAreaStyle: {
    flex: 0,
    zIndex: 3,
    backgroundColor: 'white',
    
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  btn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  greenIndicator:{
    position:'absolute',
    bottom:0,
    right:0
  },
  timeAndDistance:{
    alignItems:'center',
    marginVertical:16
  }
});
