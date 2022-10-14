import {showMessage} from 'react-native-flash-message';
import {PermissionsAndroid, Platform} from 'react-native';
import GeoLocation from 'react-native-geolocation-service';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    GeoLocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading:position.coords.heading
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await GeoLocation.requestAuthorization(
          'whenInUse',
        );

        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('LOcation Permission denied');
      })
      .catch(error => {
        console.log('Ask Location Permission error: ', error);
        return reject(error);
      });
  });

const showError = message => {
  showMessage({
    message,
    type: 'danger',
  });
};
const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
  });
};

export {showError, showSuccess};
