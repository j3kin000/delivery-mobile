import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {MessagingService} from './src/helpers/messagingService';
import {Notifications} from './src/helpers/notificationService';
import PushNotification from 'react-native-push-notification';

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

  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'my-channel',
        channelName: 'Test Channel',
        channelDescription: 'A channel to categorise your notifications',
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const handleNotification = () => {
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotificationSchedule({
      channelId: 'my-channel',
      title: 'Alarm Ringing',
      vibrate: true,
      vibration: 100,
      message: 'Message Here',
      actions: ['Accepts', 'Reject'],
      date: new Date(Date.now() + 100),
      allowWhileIdle: true,
      playSound: true,
      soundName: 'alarm_tone',
      // invokeApp: false,
      // importance: 'high',
      color: 'red',

      //repeatTime: 2,
    });
    PushNotification.configure({
      onAction: function (notification) {
        if (notification.action === 'Accept') {
          console.log('Alarm Snoozed');
        } else if (notification.action === 'Reject') {
          console.log('Alarm Stoped');
          //PushNotification.cancelAllLocalNotifications();
        } else {
          console.log('Notification opened');
        }
      },
      // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    });
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          handleNotification(), console.log('Schedule Notification');
        }}>
        <Text>aw</Text>
      </Pressable>
      <Text>Appss</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
