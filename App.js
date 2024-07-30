import AppLoading from 'expo-app-loading'; // Correct import
import { MaterialIcons } from '@expo/vector-icons';
import Navigator from './routes/baseStack';
import { useState } from 'react';


const getFonts = () => Font.loadAsync({
  'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
  'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
});

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn} // Added error handling
      />
    );
  }
}