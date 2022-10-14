import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {API_KEY} from '@env';

const AddressPickUp = ({placeholderText, fetchAddress}) => {

  //For searching addres deatails
  const onPressAddress = (data, details) => {
    
    let resLength = details.address_components;
    let zipCode = '';
    let filterResCity = details.address_components.filter(val => {
      if (val.types.includes('locality') || val.types.includes('sublocality')) {
        return val;
      }
      if (val.types.includes('postal_code')) {
        let postalCode = val.long_name;
        zipCode = postalCode;
      }
      return false;
    });

    console.log(zipCode);
    let dataTextCityObj =
      filterResCity.length > 0
        ? filterResCity[0]
        : details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
          ];
    
    let cityText =
      dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
        ? dataTextCityObj.short_name
        : dataTextCityObj.long_name;

      
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng,zipCode,cityText);
  };
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
          textInputContainer: styles.containerStyle,
          textInput: styles.inputStyle,
        }}
      />
    </View>
  );
};

export default AddressPickUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: 'white',
  },
  inputStyle: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#F3F3F3',
    marginHorizontal: 20,
  },
});
