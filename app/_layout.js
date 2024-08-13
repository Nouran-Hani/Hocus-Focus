import { createStackNavigator } from '@react-navigation/stack';
import Timer from './timer';
import Start from './start';
import Welcome from './welcome';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name='welcome' component={Welcome} options={{ headerShown : false}} />
        <Stack.Screen name="timer" component={Timer} options={{ headerShown: false }} />
        <Stack.Screen name="start" component={Start} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}