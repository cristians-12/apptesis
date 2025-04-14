// filepath: c:\apptesis\app\_layout.tsx
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Simula una carga (aumenta el tiempo aquí)
        await new Promise(resolve => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define tus pantallas aquí */}
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="about" options={{ title: "Acerca de" }} />
      <Stack.Screen name="profile" options={{ title: "Perfil" }} />
    </Stack>
  );
}