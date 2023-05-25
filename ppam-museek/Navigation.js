import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './contexts/AuthProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';
// import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Home from './screens/home';
import Landing from './screens/landing';
import Login from './screens/login';
import Register from './screens/register';
// import TabNavigator from './TabNavigator';
// import ToDoForm from './screens/todo/form';

// import Teachers from './screens/teachers';
import Schedule from './screens/schedule';
import Profile from './screens/profile';
import SetSchedule from './screens/setSchedule';
import Details from './screens/details';
import Success from './screens/success';
import Reschedule from './screens/reschedule';
import Teacher from './screens/teacher';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const getTabBarVisibility = route => {
    // console.log(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    // console.log(routeName);
  
    if( routeName == 'SetSchedule' || routeName == "Details" || routeName == "Success" ||  routeName == "Reschedule") {
      return 'none';
    }
    return 'flex';
  };

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Teacher" component={Teacher}/>
            <Stack.Screen name="SetSchedule" component={SetSchedule}/>
            <Stack.Screen name="Success" component={Success}/>
        </Stack.Navigator>
    )
}

const ScheduleStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Schedule" component={Schedule}/>
            <Stack.Screen name="Details" component={Details}/>
            <Stack.Screen name="Reschedule" component={Reschedule}/>
            <Stack.Screen name="Success" component={Success}/>
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator 
            // innitialRouteName= {Home}
            screenOptions={
                    {
                        tabBarHideOnKeyboard: true,
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarActiveTintColor: "#FBBC05",
                        tabBarInactiveTintColor: "#464444",
                    }
                }
            >

            <Tab.Screen 
                name="HomeStack" 
                component={HomeStack} 
                options={({route}) => ({
                    tabBarStyle: {
                      display: getTabBarVisibility(route),
                      backgroundColor: 'white',
                      height:70,
                      paddingBottom:20,
                      paddingTop:10,
                    },
                    tabBarLabel: "Beranda",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"home"} size={size} color={color}/>
                    ),
                })}
                    />
                    
            <Tab.Screen 
                name="ScheduleStack" 
                component={ScheduleStack}
                options={({route}) => ({
                    tabBarStyle: {
                      display: getTabBarVisibility(route),
                      backgroundColor: 'white',
                      height:70,
                      paddingBottom:20,
                      paddingTop:10,
                    },
                    tabBarLabel: "Jadwal",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"calendar"} size={size} color={color}/>
                    ),})}
                    />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={({route}) => ({
                    tabBarStyle: {
                      display: getTabBarVisibility(route),
                      backgroundColor: 'white',
                      height:70,
                      paddingBottom:20,
                      paddingTop:10,
                    },
                    tabBarLabel: "Profil",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"person"} size={size} color={color}/>
                    ),
                })}
                    />

        </Tab.Navigator>
    );
};

export default function Navigation() {
    const { user } = useAuth();
    // console.log("user", user)
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {!user &&
                    <>
                        <Stack.Screen name="Landing" component={Landing} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register}/>
                    </>}
                {user &&
                    <>
                        <Stack.Screen name="Tab" component={TabNavigator} />
                        {/* <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Schedule" component={Schedule} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="SetSchedule" component={SetSchedule} />
                        <Stack.Screen name="Success" component={Success} />
                        <Stack.Screen name="Details" component={Details} /> */}
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}