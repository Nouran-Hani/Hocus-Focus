import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Start({ route }){

    const { timer } = route.params; // Assume timer is passed as "HH:MM:SS"

    // Convert timer string "HH:MM:SS" to total seconds
    const timeArray = timer.split(":").map(Number); // ["HH", "MM", "SS"] -> [HH, MM, SS]
    const initialTimeInSeconds = (timeArray[0] * 3600) + (timeArray[1] * 60) + timeArray[2];
  
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  
    useEffect(() => {
      if (timeLeft === 0) {
        Alert.alert('Finished');
        return;
      }
  
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000); // In milliseconds
  
      return () => clearInterval(intervalId); // Clean up on unmount or timeLeft change
    }, [timeLeft]);
  
    let hours = Math.floor(timeLeft / 60 / 60).toString().padStart(2, '0');
    let minutes = Math.floor(timeLeft / 60 % 60).toString().padStart(2, '0');
    let seconds = Math.floor(timeLeft % 60).toString().padStart(2, '0');

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.timer}>
                    {hours}
                </Text>
                <Text style={styles.timer}>
                    {minutes}
                </Text>
                <Text style={styles.timer}>
                    {seconds}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#25204f',
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
    },

    timer: {
        fontSize: 64,
        color: '#cce3f0',
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#cce3f0',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    }
})