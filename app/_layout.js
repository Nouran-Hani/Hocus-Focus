import { createStackNavigator } from '@react-navigation/stack';
import Timer from './timer';
import Start from './start';
import Welcome from './welcome';
import Sensors from './sensors';
import Feedback from './feedback';
import Customize from './customize';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="timer">
        <Stack.Screen name='welcome' component={Welcome} options={{ headerShown : false}} />
        <Stack.Screen name="timer" component={Timer} options={{ headerShown: false }} />
        <Stack.Screen name='customize' component={Customize} options={{ headerShown : false}} />
        <Stack.Screen name="start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="sensors" component={Sensors} options={{ headerShown: false }} />
        <Stack.Screen name='feedback' component={Feedback} options={{ headerShown : false}} />
      </Stack.Navigator>
  );
}