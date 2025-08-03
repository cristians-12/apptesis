import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SQLiteProvider } from "expo-sqlite";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import Toast from "react-native-toast-message";
import BottomTabs from "./components/BottomTabs";
import Constants from "expo-constants";
import { WebSocketProvider } from "./context/WebsocketProvider";
import SplashScreenOwn from "./components/Splash/index";

// Evita que se oculte solo el splash nativo
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ---- Tarea para notificaciones en background ----
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND_NOTIFICATION_TASK";
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error("Error en tarea de fondo para notificaciones:", error);
    return;
  }
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
// -----------------------------------------------

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setShowCustomSplash(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  // Notificaciones y registro de tareas
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permiso de notificaciones denegado");
          return;
        }
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });
        console.log("Token de notificación push:", token.data);

        await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
      } catch (error) {
        console.error("Error al configurar notificaciones:", error);
      }
    };

    setupNotifications();

    return () => {
      const cleanup = async () => {
        try {
          await Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
        } catch (error) {
          console.error("Error al desregistrar tarea de fondo:", error);
        }
      };
      cleanup();
    };
  }, []);

  // Función para enviar notificaciones locales
  const sendLocalNotification = (msg: string) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificación Local",
        body: msg,
      },
      trigger: null,
    });
  };

  if (showCustomSplash) {
    return (
      <SplashScreenOwn
        onFinish={() => setShowCustomSplash(false)}
      />
    );
  }

  return (
    <SQLiteProvider databaseName="registros.db">
      <WebSocketProvider sendLocalNotification={sendLocalNotification}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        </SafeAreaView>
        <Toast />
      </WebSocketProvider>
    </SQLiteProvider>
  );
}