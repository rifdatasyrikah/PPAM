import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './contexts/AuthProvider';
import Home from './screens/home';
import Landing from './screens/landing';
import Login from './screens/login';
import Register from './screens/register';
// import ToDoForm from './screens/todo/form';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { user } = useAuth();

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
                        <Stack.Screen name="Register" component={Register} />
                    </>}
                {user &&
                    <>
                        <Stack.Screen name="Home" component={Home} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}