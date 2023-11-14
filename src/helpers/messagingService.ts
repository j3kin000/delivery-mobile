import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export class MessagingService {
  static async requestUserPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  }

  static async getDEviceFCMToken() {
    const firebaseToken = await messaging().getToken();
    console.log('firebaseToken', firebaseToken);
  }

  static deviceForegroundSubscribe(
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => any,
  ) {
    const unsubscribe = messaging().onMessage(callback);
    return unsubscribe;
  }

  static deviceBackgroundSubscribe(
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => any,
  ) {
    return messaging().setBackgroundMessageHandler(callback);
  }

  //   static registerForRemoteMessages = () => {
  //     return messaging()
  //       .registerDeviceForRemoteMessages()
  //       .then(() => {
  //         MessagingService.requestUserPermission();
  //       })
  //       .catch(e => console.log(e));
  //   };
}
