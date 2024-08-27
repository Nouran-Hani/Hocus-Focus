import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

export default function Timer({ navigation }){

    StatusBar.setBarStyle('dark-content');

    const [time, setTime] = useState('');

    const press = (timeValue) => {
        setTime(timeValue)
        StatusBar.setBarStyle('light-content');
        navigation.navigate('start', { timer: timeValue });
    }

    const custome = () => {
        navigation.navigate('customize')
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <SafeAreaView style={{backgroundColor: '#25204f'}}/>
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

                <TouchableOpacity 
                style={styles.touch}
                onPress={() => custome()}>
                    <Text style={styles.buttonText}>
                    Customize
                    </Text>
                </TouchableOpacity>

                {/* <Footer navigation={navigation} /> */}
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
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },

    touch: {
        backgroundColor: '#25204f',
        padding: 15,
        borderRadius: 20,
        margin: 10,
        width: 170,
    },

    select: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#25204f',
        marginTop: '35%',
        marginBottom: '30%',
    }
})