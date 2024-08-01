import AppLoading from 'expo-app-loading'; // Correct import
// import { MaterialIcons } from '@expo/vector-icons';
import Navigator from './routes/baseStack';
import { useState } from 'react';


export default function App() {
  return (
    <Navigator />
  );
}