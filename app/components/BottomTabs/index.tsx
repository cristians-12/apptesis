import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/home";
import ScheduleRegisterScreen from "../screens/schedule";
import { colors } from "@/app/utils/colors";
import DateScheduleScreen from "../screens/date-schedule";
import InfoScreen from "../screens/info";
import DailyConsumptionScreen from "../screens/daily-consumption";
import ConfigurationScreen from "../screens/configuration";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName:
            | "home"
            | "calendar"
            | "send"
            | "information-circle"
            | "list"
            | undefined;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Schedule") iconName = "send";
          else if (route.name === "Date") iconName = "calendar";
          else if (route.name === "Info") iconName = "information-circle";
          else if (route.name === "Consumption") iconName = "list";
          // else if (route.name === "Configuration") iconName = "settings";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Schedule" component={ScheduleRegisterScreen} />
      <Tab.Screen name="Date" component={DateScheduleScreen} />
      <Tab.Screen name="Consumption" component={DailyConsumptionScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      {/* <Tab.Screen name="Configuration" component={ConfigurationScreen} /> */}
    </Tab.Navigator>
  );
}
