import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/home';
import ScheduleRegisterScreen from '../screens/schedule';
import { colors } from '@/app/utils/colors';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: 'home' | 'person' | 'settings' | undefined;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Schedule') iconName = 'settings';
                    else if (route.name === 'Settings') iconName = 'settings';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name='Schedule' component={ScheduleRegisterScreen} />
        </Tab.Navigator>
    );
}