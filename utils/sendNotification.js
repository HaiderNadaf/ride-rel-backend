// import { Expo } from "expo-server-sdk";
// import PushToken from "../models/PushToken.js";

// const expo = new Expo();

// export async function sendNotification(title, body) {
//   const tokens = await PushToken.find();

//   const messages = [];

//   for (let t of tokens) {
//     if (!Expo.isExpoPushToken(t.token)) continue;

//     messages.push({
//       to: t.token,
//       sound: "default",
//       title,
//       body,
//     });
//   }

//   if (messages.length > 0) {
//     const chunks = expo.chunkPushNotifications(messages);

//     for (let chunk of chunks) {
//       await expo.sendPushNotificationsAsync(chunk);
//     }

//     console.log("✅ Push sent:", messages.length);
//   }
// }
// services/pushNotifications.js
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!Device.isDevice) {
    Alert.alert("Error", "Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Permission Denied", "Push notifications will not work");
    return;
  }

  // Get the Expo push token
  token = (await Notifications.getExpoPushTokenAsync()).data;

  // Send token to your backend
  if (token) {
    try {
      await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/save-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error("Failed to save push token:", error);
    }
  }

  return token;
}
