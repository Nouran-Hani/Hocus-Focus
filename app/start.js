import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Switch, Pressable, Button, SafeAreaView, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';

export default function Start({ route, navigation }) {
    StatusBar.setBarStyle('light-content');
    // Initialize hooks
    const [permission, requestPermission] = Camera.useCameraPermissions()
    const [visability, setVisability] = useState(true);
    const [cameraRef, setCameraRef] = useState(null);
    const [state, setState] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [error, setError] = useState("")

    const toggleSwitch = () => {
        setVisability(previousState => !previousState);
    };

    // Timer setup
    const { timer } = route.params; // Expecting timer to be passed in "HH:MM:SS" format
    const timeArray = timer.split(":").map(Number); // Convert to [HH, MM, SS]
    const initialTimeInSeconds = (timeArray[0] * 3600) + (timeArray[1] * 60) + timeArray[2];
    const [feedbackTime, setFeedbackTime] = useState(initialTimeInSeconds)
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

    useEffect(() => {
        if (timeLeft === 0) {
            StatusBar.setBarStyle('dark-content');
            setCameraRef(null);
            navigation.replace('feedback', 
                {feed: feedbackTime,
                initial: initialTimeInSeconds
            });
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when timeLeft changes
    }, [timeLeft]);

    useEffect(() => {
        if (!cameraRef) {return;}
        const intervalId = setInterval(() => {
            if (cameraRef) { // Ensure cameraRef is set before capturing
                handleCapture();
                // console.log('cameraRef is on');
            }
        }, 10000); // Trigger every 10 seconds
    
        // Clean up interval on component unmount or when cameraRef changes
        return () => {
            clearInterval(intervalId);
            // console.log('Interval cleared');
        };
    }, [cameraRef]); // Depend on cameraRef so it re-runs if cameraRef changes

    const handleCapture = async () => {
        if (cameraRef){
            const photo = await cameraRef.takePictureAsync({ base64: true, quality: 0.5 });
            
            // Send the captured image to your Flask backend
            const formData = new FormData();
            formData.append('image', {
                uri: photo.uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });
    
            try {
                const response = await axios.post('http://92.113.26.243:5001/video', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                setState(response.data.state);
                setError("");

                if (response.data.state === "disengaged" || response.data.state === "absent")
                    {
                    setFeedbackTime(feedbackTime => feedbackTime - 10);
                }
                console.log(response.data.state)
            } catch (error) {
                setError(error.message)
                setState("")
                console.log(error);
                // Alert.alert('Error', 'Failed to process the image.');
            }
        } else {
            console.log('Camera is not available or has been stopped.');
        }
    };

    useEffect(() => {
        // Show the notification when the component mounts
        setNotificationVisible(true);

        // Hide the notification after 5 seconds
        const timer = setTimeout(() => {
        setNotificationVisible(false);
        }, 5000);

        // Clean up the timer on unmount
        return () => clearTimeout(timer);
    }, []);


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

        {notificationVisible ?
        (<Text style={styles.not}>
            <Feather name="alert-triangle" size={15} color="red" /><Text>  </Text>
            Notifications are paused</Text>):(<></>)}

            {visability ? (
                <View style={styles.cameraborder}>
                    <Camera  // remove sound
                        style={styles.camera}
                        type={Camera.Constants.Type.front}
                        ref={ref => setCameraRef(ref)}
                    />
                    <View style={styles.row}>
                        <Text style={styles.cameraText}>
                            Camera
                        </Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: '#767577', true: '#4f80d1' }}
                            thumbColor={visability ? '#a4c5fc' : '#acaaad'}
                            onValueChange={toggleSwitch}
                            value={visability}
                        />
                    </View>
                    {/* <Button title="Capture Image" onPress={handleCapture} /> */}
                </View>
            ) : (
                <View style={styles.vanish}>
                    <Camera style={styles.cameraVanish}
                        type={Camera.Constants.Type.front}
                        ref={ref => setCameraRef(ref)}
                        />
                    <View style={styles.row}>
                        <Text style={styles.cameraText}>
                            Camera
                        </Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: '#767577', true: '#4f80d1' }}
                            thumbColor={visability ? '#a4c5fc' : '#acaaad'}
                            onValueChange={toggleSwitch}
                            value={visability}
                        />
                    </View>
                    {/* <Button title="Capture Image" onPress={handleCapture} /> */}
                </View>
            )}

            {state ? (<Text style={styles.message}>{state}</Text>): null}
            {state === "disengaged" ? ( 
                <Text style={styles.message}>Drink some coffee</Text>
            ) : state === "absent" ? (
                <Text style={styles.message}>Put your device correctly</Text>
            ): <Text style={styles.message}>No output</Text>}

            {error ? (<Text style={styles.error}>Error: {error}</Text>):null}

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
        height: 340,
        width: 260,
        marginTop: 12,
    },
    cameraVanish: {
        height: 0,
        width: 0,
    },
    cameraborder: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 410,
        width: 290,
        backgroundColor: '#cce3f0',
        borderRadius: 20,
        marginBottom: 20,
    },
    vanish: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 200,
        backgroundColor: '#cce3f0',
        borderRadius: 15,
        marginBottom: 20,
    },
    message: {
        textAlign: 'center',
        fontSize: 24,
        color: "#cce3f0",
        fontWeight: 'bold',
        width: '90%',
    },
    switch: {
    },
    cameraText: {
        color: '#25204f',
        fontSize: 14,
        width: 65,
        marginTop: 13,
        fontWeight: 'bold',
    },
    capturedImage: {
        width: 300,
        height: 300,
        marginTop: 20,
    },
    not: {
        fontSize: 15,
        color: 'red',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'red',
        textAlign: 'center',
        padding: 7,
        marginBottom: 10,  
        width: 250,
    },
    error: {
        textAlign: 'center',
        fontSize: 24,
        color: "red",
        fontWeight: 'bold',
        width: '90%',
    },
});
