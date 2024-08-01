import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Profile from '../screens/profile';
import Register from '../screens/register';
import Welcome from '../screens/welcomePage';
import ProfileDetails from '../screens/profileDetails';
import Analysis from '../screens/analysis';

const Stack = createStackNavigator();

function BaseStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="ProfileDetails" component={ProfileDetails}/>
        <Stack.Screen name="Analysis" component={Analysis}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseStack;