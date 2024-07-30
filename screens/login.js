import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';

export default function Login() {

  const image = require('./assets/logo.png')
  const image2 = require('./assets/logo2.png')
  const bg = require('./assets/bg.jpg')

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        
        <Image source={ image } style={{height: 100, width: 100}} />
            
        <Text style={styles.text1}>
            FOCUSED
        </Text>

      </View>
  
      <View style={styles.container2}>

        <Text style={styles.text2}>
          Email
        </Text>

        <TextInput 
          placeholder='example@gmai.com' 
          style={styles.input}
        />

        <Text style={styles.text2}>
          Password
        </Text>

        <TextInput 
          placeholder='*****' 
          secureTextEntry= {true}
          style={styles.input}
        />
        </View>

      <StatusBar style="auto" />
    </View>
  );
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

  text1: {
    color: 'darkblue',
    fontSize: 30, // Added font size for better visibility
    marginTop: 10, // Space between image and text
    fontFamily: 'sans-serif',
  },

  text2: {
    color: 'darkblue',
    fontSize: 15, // Added font size for better visibility
    marginTop: 10, // Space between image and text
  },

  input: {
    width: 250,
    height: 40,
    padding: 10, 
    marginBottom: 20,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
  }
});
