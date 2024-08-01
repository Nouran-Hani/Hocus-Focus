import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function Register({ navigation }){

    const image = require('../assets/logo.png');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conf, setConf] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handelSubmit = () => {
        if (name && email && password && conf) {
          navigation.navigate('Profile');
        } else {
          Alert.alert('All fields are required!')
        }
      }

    const login = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={image} style={{ height: 100, width: 100 }} />
                <Text style={styles.text1}>
                    FOCUSED
                </Text>
            </View>

            <View>
                <Text style={styles.text2}>
                    Sign up
                </Text>
                
                <View style={styles.container3}>  
                    <TextInput
                    placeholder='Full Name'
                    value={name}
                    onChange={setName}
                    style={styles.input} 
                    />
                </View>

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
                </View>

                <View style={styles.container3}>
                    <TextInput 
                    placeholder='Confirm your Password' 
                    secureTextEntry={!showPassword}
                    value={conf}
                    onChange={setConf}
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

                <View  style={styles.container3}>
                    <Text style={styles.text3}>
                    Already have an account?
                    </Text> 
                    <Pressable style={styles.link} onPress={login}>
                        <Text style={styles.sign}> Sign in </Text>
                    </Pressable>
                </View>
            </View>

            <View>
                <Pressable style={styles.button}
                onPress={handelSubmit}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', // Horizontal center
    //   backgroundColor: '#fffbe8',
      backgroundColor: 'white',
    },

    container1: {
        marginTop: '5%',
        alignItems: 'center', // Horizontal center
    },
    
    container3: {
        flexDirection: 'row',
    },

    text1: {
        color: 'darkblue',
        fontSize: 30, // Added font size for better visibility
        marginTop: 10, // Space between image and text
    },

    text2: {
        color: 'darkblue',
        fontSize: 18, // Added font size for better visibility
        marginTop: 10, // Space between image and text
        fontWeight: 'bold',
        marginBottom: 20,
    },

    input: {
        width: 250,
        height: 40,
        padding: 10, 
        marginBottom: 20,
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    
    icon: {
        flexDirection: 'row',
        padding: 5,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,    
    },
    
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 280,
        height: 40,
        backgroundColor: 'darkblue',
        borderRadius: 10
    },

    link: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        marginBottom: 7,
    },

    text3: {
        marginBottom: 7,
    },

    sign:{
        color: 'blue',
    }
    
})