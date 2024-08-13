import { createStackNavigator } from '@react-navigation/stack';
import Timer from './timer';
import Start from './start';
import Welcome from './welcomePage';
import Login from './login';
import Register from './register';
import Profile from './profile';
import Analysis from './analysis';
import ProfileDetails from './profileDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="timer">
        <Stack.Screen name="welcomePage" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="profileDetails" component={ProfileDetails} options={{ headerShown: false }} />
        <Stack.Screen name="analysis" component={Analysis} options={{ headerShown: false }} />
        <Stack.Screen name="timer" component={Timer} options={{ headerShown: false }} />
        <Stack.Screen name="start" component={Start} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}