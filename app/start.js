import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Switch, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';

export default function Start({ route, navigation }) {
    StatusBar.setBarStyle('light-content');
    // Initialize hooks
    const [permission, requestPermission] = useCameraPermissions();
    const [visability, setVisability] = useState(true)
    const facing = CameraType.front

    const toggleSwitch = () => {
        setVisability(previousState => !previousState);
    };

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
                <Text style={styles.message}>** We need your permission to show the camera</Text>
                <Pressable onPress={requestPermission} style={styles.touch}>
                    <Text style={styles.buttonText}> Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {visability? (
                <View style={styles.cameraborder}>
                    <CameraView style={styles.camera} facing={facing} /> 
                    <View style={styles.row}>
                        <Text style={styles.cameraText}>
                            Camera
                        </Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{false: '#767577', true: '#4f80d1'}}
                            thumbColor={visability ? '#a4c5fc' : '#acaaad'}
                            // ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={visability}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.vanish}>
                    <CameraView style={styles.cameraVanish} facing={facing} /> 
                    <View style={styles.row}>
                        <Text style={styles.cameraText}>
                            Camera
                        </Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{false: '#767577', true: '#4f80d1'}}
                            thumbColor={visability ? '#a4c5fc' : '#acaaad'}
                            // ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={visability}
                        />
                    </View>
                </View>
                )
            }
            
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
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 64,
        color: '#cce3f0',
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#cce3f0',
        // padding: 10,
        borderRadius: 10,
        margin: 5,
        height: 95,
        width: 95,
    },
    
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#25204f',
    },

    touch: {
        backgroundColor: '#cce3f0',
        padding: 10,
        borderRadius: 20,
        margin: 15,
    },

    camera: {
        height: 300,
        width: 250,
        marginTop: 20,
    },

    cameraVanish: {
        height: 0,
        width: 0,
    },

    cameraborder:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 370,
        width: 300,
        backgroundColor: '#cce3f0',
        borderRadius: 20,
        marginBottom: 20,
    },

    vanish: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 150,
        backgroundColor: '#cce3f0',
        borderRadius: 15,
        marginBottom: 20,
    },

    message: {
        textAlign: 'center',
        fontSize: 24,
        color:  "#cce3f0",
        fontWeight: 'bold',
        width: '90%',
    },

    switch: {
        // marginLeft: 'auto',
        // marginRight: 25,
    },

    cameraText: {
        color: '#25204f',
        fontSize: 14,
        width: 65,
        marginTop: 13,
        fontWeight: 'bold',
    }
});
