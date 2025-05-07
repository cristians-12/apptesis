// app/_layout.tsx
import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { SQLiteProvider } from "expo-sqlite";

// Evita que el splash desaparezca automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 1) Carga las fuentes
  const [fontsLoaded] = useFonts({
    MontserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // 2) Cuando fontsLoaded cambie a true, ocultamos el splash
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 3) Mientras no estén listas las fuentes, devolvemos null (la pantalla sigue en splash)
  if (!fontsLoaded) {
    return null;
  }

  // 4) Una vez cargadas, renderizamos las pantallas
  //    y llamamos a onLayoutRootView para quitar el splash
  return (
    <SQLiteProvider databaseName="registros.db">
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Slot />
      </View>
    </SQLiteProvider>
  );
}