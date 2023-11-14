import PushNotification from 'react-native-push-notification';

export class Notifications {
  constructor() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token: {os: string; token: string}) {
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (remoteMessage) {
        console.log('REMOTE / LOCAL NOTIFICATION ==>', remoteMessage);

        // process the notification here
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  scheduleNotification(date: string) {
    console.log('Dates: ', date);
    try {
      PushNotification.localNotificationSchedule({
        channelId: 'reminders',
        title: 'Reminder!!',
        message: 'you have set reminder',
        date: new Date(Date.now() + 1 * 1000),
      });
    } catch (error) {
      console.log('ERROR SCHEDULE NOTIFICATION:', error);
    }
  }
  setLocalNotification(remoteMessage: any) {
    console.log('Remote Message:', remoteMessage.notification.body);
    try {
      PushNotification.localNotification({
        channelId: 'reminders',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
      });
    } catch (error) {
      console.log('ERROR NOTIFICATION:', error);
    }
  }
}
