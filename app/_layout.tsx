// App.js
import React, { useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { SQLiteProvider } from "expo-sqlite";
import * as Notifications from 'expo-notifications';
import Toast from "react-native-toast-message";
import Home from "./components/screens/home";
import BottomTabs from "./components/BottomTabs";

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

const Stack = createNativeStackNavigator();

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

  if (!fontsLoaded) {
    // Mientras cargan las fuentes, manten splash
    return null;
  }

  return (
    <SQLiteProvider databaseName="registros.db">
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          </Stack.Navigator> */}
          <BottomTabs />
        </NavigationContainer>
      </View>
      <Toast />
    </SQLiteProvider>
  );
}