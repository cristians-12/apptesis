import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from 'expo-font';
import { SQLiteProvider } from "expo-sqlite";
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import Toast from "react-native-toast-message";
import BottomTabs from "./components/BottomTabs";
import Constants from 'expo-constants';
import { WebSocketProvider } from "./context/WebsocketProvider";

SplashScreen.preventAutoHideAsync();

// Configura el manejador de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Define la tarea de fondo para notificaciones
const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND_NOTIFICATION_TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error, executionInfo }) => {
  if (error) {
    console.error("Error en tarea de fondo para notificaciones:", error);
    return;
  }
  console.log("Tarea de fondo para notificaciones ejecutada con datos:", data);
  if (data) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificación desde Segundo Plano",
        body: data?.message || data?.data || JSON.stringify(data) || "Tienes una nueva notificación",
      },
      trigger: null,
    });
  }
});

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),
    MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Solicita permisos y configura notificaciones
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permiso de notificaciones denegado');
          return;
        }
        console.log('Permiso de notificaciones concedido');

        const token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });
        console.log("Token de notificación push:", token.data);

        await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
        console.log("Tarea de fondo para notificaciones registrada:", BACKGROUND_NOTIFICATION_TASK);
      } catch (error) {
        console.error("Error al configurar notificaciones:", error);
      }
    };

    setupNotifications();

    return () => {
      const cleanup = async () => {
        try {
          await Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
          console.log("Tarea de fondo para notificaciones desregistrada.");
        } catch (error) {
          console.error("Error al desregistrar tarea de fondo:", error);
        }
      };
      cleanup();
    };
  }, []);

  // Función para enviar notificaciones locales (pasada al WebSocketProvider)
  const sendLocalNotification = (msg: string) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificación Local",
        body: msg,
      },
      trigger: null,
    });
  };

  if (!fontsLoaded) {
    return null; // Muestra pantalla de carga mientras se cargan las fuentes
  }

  return (
    <SQLiteProvider databaseName="registros.db">
      <WebSocketProvider sendLocalNotification={sendLocalNotification}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        </View>
        <Toast />
      </WebSocketProvider>
    </SQLiteProvider>
  );
}