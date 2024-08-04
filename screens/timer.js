import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function Timer({ navigation }){

    const [time, setTime] = useState('');

    const press = (timeValue) => {
        setTime(timeValue)
        navigation.navigate('Start', { timer: timeValue });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.select}>
                Select a timer
            </Text>

            <TouchableOpacity 
            style={styles.touch}
            onPress={() => press('00:30:00')}>
                <Text style={styles.buttonText}>
                    00:30:00
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.touch}
            onPress={() => press('01:00:00')}>
                <Text style={styles.buttonText}>
                    01:00:00
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.touch}
            onPress={() => press('01:30:00')}>
                <Text style={styles.buttonText}>
                    01:30:00
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cce3f0',
    },

    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },

    touch: {
        backgroundColor: '#25204f',
        padding: 15,
        borderRadius: 20,
        margin: 15,
    },

    select: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#25204f',
        marginTop: '10%',
        marginBottom: '35%',
    }
})