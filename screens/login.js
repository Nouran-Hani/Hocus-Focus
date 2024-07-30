import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading'; // Correct import
import * as Font from 'expo-font';

const getFonts = () => Font.loadAsync({
  'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
  'PlayfairDisplay-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
});

export default function Login() {

  const image = require('../assets/logo.png');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handelSubmit = () => {
    if (email && password) {
      return(
        Alert.alert('Submitted!')
      );
    } else {
      Alert.alert('Error!')
    }
  }

  if(fontsLoaded){
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
              keyboardType='email-address'
              inputType='email'
              value={email}
              onChange={setEmail}
              style={styles.input} 
            />
          </View>

          <View style={styles.container3}>
            <TextInput 
              placeholder='Your Password' 
              secureTextEntry={!showPassword}
              value={password}
              onChange={setPassword}
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

          <View style={styles.container4}>
            <Pressable style={styles.button}
              onPress={handelSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
          </View>
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
    marginTop: '5%',
    alignItems:'center'
  },

  container2: {
    marginTop: '10%',
  },

  container3: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  container4: {
    alignItems: 'center'
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

  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize:17,
    fontFamily: 'PlayfairDisplay-Regular',

  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 40,
    backgroundColor: 'darkblue',
    borderRadius: 10
  }
});