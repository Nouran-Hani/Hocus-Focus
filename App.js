import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; // Correct import
import { MaterialIcons } from '@expo/vector-icons';

const getFonts = () => Font.loadAsync({
  'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
});

export default function App() {

  const image = require('./assets/logo.png');
  const image2 = require('./assets/logo2.png');
  const bg = require('./assets/bg.jpg');

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <Image source={image} style={{ height: 100, width: 100 }} />
          <Text style={styles.text1}>
            FOCUSED
          </Text>
        </View>

        <View style={styles.container2}>
          <Text style={styles.text2}>
            Sign in
          </Text>
          <View style={styles.container3}>  
            <TextInput
              placeholder='example@gmai.com'
              iconName='email' 
              style={styles.input} 
            />
          </View> 
          <View style={styles.container3}>
            <TextInput 
              placeholder='Your Password' 
              secureTextEntry={!showPassword} 
              style={styles.input} 
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="gray"
            />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sign}>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Horizontal center
    backgroundColor: '#fff', // Background color for visibility
  },

  container1: {
    marginTop: '20%',
  },

  container2: {
    marginTop: '20%',
  },

  container3: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  text1: {
    color: 'darkblue',
    fontSize: 30, // Added font size for better visibility
    marginTop: 10, // Space between image and text
    fontFamily: 'PlayfairDisplay-Regular', // Corrected font family name
  },

  text2: {
    color: 'darkblue',
    fontSize: 18, // Added font size for better visibility
    marginBottom: 10, // Space between image and text
    // marginLeft: 8,
    fontFamily: 'PlayfairDisplay-Regular', // Corrected font family name
  },

  input: {
    width: 250,
    height: 40,
    padding: 10, 
    marginBottom: 20,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    fontFamily: 'PlayfairDisplay-Regular', // Corrected font family name
  },

  icon: {
    flexDirection: 'row',
    padding: 5,
  },

  sign: {
    backgroundColorcolor:'darkblue',
    fontFamily: 'PlayfairDisplay-Regular',
    borderRadius: 10,
  },
});
