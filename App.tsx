import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {MessagingService} from './src/helpers/messagingService';

const App = () => {
  useEffect(() => {
    MessagingService.requestUserPermission();
    MessagingService.getDEviceFCMToken();
    const unsubscribe = MessagingService.deviceForegroundSubscribe(
      async remoteMessage => {
        console.log('FOREGROUND NOTIFICATIONSS');
      },
    );
    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
