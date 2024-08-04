import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Profile from '../screens/profile';
import Register from '../screens/register';
import Welcome from '../screens/welcomePage';
import ProfileDetails from '../screens/profileDetails';
import Analysis from '../screens/analysis';
import Timer from '../screens/timer';
import Start from '../screens/startTimer'

const Stack = createStackNavigator();

function BaseStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Timer">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="ProfileDetails" component={ProfileDetails}/>
        <Stack.Screen name="Analysis" component={Analysis}/>
        <Stack.Screen name="Timer" component={Timer} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseStack;