import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
// import * as Device from 'expo-device';
import Constants from 'expo-constants';

export default function useNotifications() {
    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();

    const registerForPushNotificationsAsync = useCallback(async () => {
        try {
            // if (!Device.isDevice) {
            //     Alert.alert("Error", "Push notifications are not supported on simulators.");
            //     return;
            // }

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
                if (finalStatus !== "granted") {
                    Alert.alert("Error", "Failed to get push token for push notifications!");
                    return;
                }
            }

            const token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId, // Asegúrate de configurar correctamente en app.json
            });

            console.log("Push token obtenido:", token?.data);

            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                });
            }

            return token;
        } catch (error) {
            console.error("Error obteniendo token de push:", error.message);
            // Alert.alert("Error", "Could not obtain push token for notifications.");
        }
    }, []);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token);
            }
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log("Notificación recibida:", notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Respuesta de notificación:", response);
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, [registerForPushNotificationsAsync]);

    const sendLocalNotification = useCallback(async (msg: string) => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert('Error', 'No tienes permisos de notificaciones');
                return;
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "DosifiApp 👋",
                    body: msg,
                    data: { customData: 'info importante' },
                },
                trigger: null, // Mostrar inmediatamente
            });
        } catch (error) {
            console.error("Error al enviar notificación local:", error.message);
            Alert.alert("Error", "No se pudo enviar la notificación local.");
        }
    }, []);

    return {
        sendLocalNotification,
        expoPushToken,
        notification,
    };
}