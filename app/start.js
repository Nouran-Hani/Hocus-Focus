import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';

export default function Start({ route, navigation }) {
    // Initialize hooks
    const [permission, requestPermission] = useCameraPermissions();
    const facing = CameraType.front

    // Timer setup
    const { timer } = route.params; // Expecting timer to be passed in "HH:MM:SS" format
    const timeArray = timer.split(":").map(Number); // Convert to [HH, MM, SS]
    const initialTimeInSeconds = (timeArray[0] * 3600) + (timeArray[1] * 60) + timeArray[2];
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

    useEffect(() => {
        if (timeLeft === 0) {
            StatusBar.setBarStyle('dark-content');
            navigation.navigate('Timer');
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when timeLeft changes
    }, [timeLeft]);

    // Format time left for display
    const hours = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    // Conditional rendering based on permission
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} /> 

                <View style={styles.row}>
                <Text style={styles.timer}>{hours}</Text>
                <Text style={styles.timer}>{minutes}</Text>
                <Text style={styles.timer}>{seconds}</Text>
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
    },
    
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#25204f',
    },

    touch: {
        backgroundColor: '#cce3f0',
        padding: 15,
        borderRadius: 20,
        margin: 15,
    },

    camera: {
        height: 250,
        width: 250,
        marginBottom: 20,
    }
});
