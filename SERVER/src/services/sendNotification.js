import { Expo } from "expo-server-sdk";

// Create Expo SDK client
let expo = new Expo();

// Send notification
const sendExpoNotification = async (token, title, message) => {
    const messages = [
        {
            to: token,
            sound: "default",
            title,
            body: message,
            data: { withSome: "data" },
        },
    ];
    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
        try {
            const receipts = await expo.sendPushNotificationsAsync(chunk);
            console.log(receipts);
        } catch (err) {
            console.error(err);
        }
    }
};

export default sendExpoNotification;