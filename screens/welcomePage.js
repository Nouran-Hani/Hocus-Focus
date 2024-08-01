import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function Welcome({ navigation }){

    const image = require('../assets/logo.png');
    const image2 = require('../assets/logo2.png');

    const register = () => {
        navigation.navigate('Register')
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
            
            {/* <View style={styles.container2}>
                <Text style={styles.welcome}>
                    Welcome to FUCOSED, the application that will change your accademic life.
                    {'\n'} {'\n'} {'\n'} {'\n'}
                    Join us to enjoy the journy!
                </Text>
            </View> */}

            <View style={styles.container3}>
                <Pressable style={styles.button}
                onPress={register}>
                    <Text style={styles.buttontext}>
                        Register
                    </Text>
                </Pressable>

                <Pressable style={styles.button}
                onPress={login}>
                    <Text style={styles.buttontext}>
                        Login
                    </Text>
                </Pressable>
            </View>
        </View>   
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', // Horizontal center
    //   justifyContent: 'center',
    //   backgroundColor: '#fffbe8',
      backgroundColor: 'white',
    },
  
    container1: {
      marginTop: '30%',
      alignItems:'center',
    },
    
    container2: {
        marginTop: '20%',
        alignItems:'center',
        width: '80%', // Optional: Ensures container doesn't exceed parent container's width

    },

    container3: {
        marginTop: '40%',
        flexDirection: 'row',
    },

    button: {
        backgroundColor: 'darkblue',
        width: 125,
        height: 35,
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
        marginTop: 20,
    },

    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
      
    text1: {
        color: 'darkblue',
        fontSize: 30, // Added font size for better visibility
        marginTop: 10, // Space between image and text
    },

    welcome:{
        color: 'darkblue',
        // fontStyle: 'italic',
        fontSize: 20,
        textAlign: 'justify',
    },
    
}) 