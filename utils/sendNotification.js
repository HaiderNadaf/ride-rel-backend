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
export async function sendNotification(title, body, pushToken) {
  if (!pushToken) return;

  const message = {
    to: pushToken,
    sound: "default",
    title,
    body,
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    console.log("Push sent:", data);
  } catch (err) {
    console.error("Push failed:", err);
  }
}
