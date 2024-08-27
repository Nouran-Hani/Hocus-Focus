import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

export default function Feedback({ route, navigation }){
    StatusBar.setBarStyle('dark-content');

    const { feed } = route.params;
    const { initial } = route.params;
    const final = feed/initial * 100

    const hours = Math.floor(feed / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((feed % 3600) / 60).toString().padStart(2, '0');
    const seconds = (feed % 60).toString().padStart(2, '0');

    const press = () => { 
        navigation.navigate('welcome');
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <SafeAreaView style={{backgroundColor: '#25204f'}}/>
            <StatusBar style={{setBarStyle:'dark-content'}}/>  
            <View style={styles.container}>
                <Text style={styles.select}>
                    Session Feedback
                </Text>
                <Text style={styles.select2}>
                    Your focus time is {hours}:{minutes}:{seconds}
                </Text>

                <TouchableOpacity 
                style={styles.touch}
                onPress={() => press()}>
                    <Text style={styles.buttonText}>
                        start new timer
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#cce3f0'
    },

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
        marginTop: '35%',
        marginBottom: '35%',
    },

    select2: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#25204f',
        marginTop: '15%',
        marginBottom: '30%',
        textAlign: 'center'
    }
})