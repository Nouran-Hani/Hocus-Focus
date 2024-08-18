import React, { useEffect} from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

export default function Welcome({ navigation }){
    const image = require('../assets/images/dark logo 2.png');
    StatusBar.setBarStyle('dark-content');

    // Animations
    const progress = useSharedValue(0)
    const scale = useSharedValue(2)
    const translateY = useSharedValue(0)
    const contentProgress = useSharedValue(0)

    const imageStyle = useAnimatedStyle(() => {    
        return {
            opacity: progress.value,
            transform: [
                { scale: scale.value },
                { rotate: `${progress.value * 2 * Math.PI}rad` },
                { translateY: translateY.value }
            ],
        };
    }, []);

    const textStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    }, []);

    const content = useAnimatedStyle(() => {
        return {
            opacity: contentProgress.value,
        }
    }, [])

    useEffect(() => {
        progress.value = withSpring(1, {}, () => {
            translateY.value = withTiming(-100, {duration: 1000}, () => {
                contentProgress.value = withTiming(1, { duration: 1000})
            });
        });
        scale.value = withSpring(1);
    }, []);

    const selectTime = () => {
        navigation.navigate('timer')
    }

    const sensor = () => {
        navigation.navigate('sensors')
    }

    return (
        <View style={styles.container}>
            <Animated.View style={imageStyle}>
                <Image
                    source={image} style={{ height: 150, width: 150 }}
                />
            </Animated.View>
            <Animated.Text style={[styles.text1, textStyle]}>
                Hocus Focus
            </Animated.Text>

            <Animated.View style={content}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={selectTime}>
                        <Text style={styles.buttonText}>Start a timer</Text>
                    </TouchableOpacity>
{/* 
                    <TouchableOpacity style={styles.button} onPress={sensor}>
                        <Text style={styles.buttonText}>Keep the phone away</Text>
                    </TouchableOpacity> */}
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', // Horizontal center
      justifyContent: 'center',
      backgroundColor: '#cce3f0',
    },

    text1: {
        color: '#25204f',
        fontSize: 30, // Added font size for better visibility
        marginTop: 10, // Space between image and text
        fontWeight: 'bold',
    },

    button: {
        backgroundColor: '#25204f',
        borderRadius: 15,
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },

    row: {
        // flexDirection: 'row',
    }
})