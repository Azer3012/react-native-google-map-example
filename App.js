import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './app/stacks/Stack'

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
