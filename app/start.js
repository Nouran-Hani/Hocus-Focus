import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Switch, Pressable, Button, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import axios from 'axios';

export default function Start({ route, navigation }) {
    StatusBar.setBarStyle('light-content');
    // Initialize hooks
    const [permission, requestPermission] = Camera.useCameraPermissions()
    const [visability, setVisability] = useState(true);
    const [cameraRef, setCameraRef] = useState(null);
    const [state, setState] = useState('')
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

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
            navigation.navigate('feedback', 
                {feed: feedbackTime,
                initial: initialTimeInSeconds
            });
            console.log(feedbackTime)
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when timeLeft changes
    }, [timeLeft]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (cameraRef) { // Ensure cameraRef is set before capturing
                handleCapture();
                // console.log('effect');
            }
        }, 5000); // Trigger every 5 seconds

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [cameraRef]);

    // useEffect(() => {
    //     if (state === "Yawn" || state === "Sleep" || state === "Absent") {
    //         setFeedbackTime(prevTime => prevTime - 5);
    //     }
    // }, [state]);

    const handleCapture = async () => {
        {
            const photo = await cameraRef.takePictureAsync({ base64: true });
            // console.log(photo.uri);
    
            // Send the captured image to your Flask backend
            const formData = new FormData();
            formData.append('image', {
                uri: photo.uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });
    
            try {
                const response = await axios.post('http://192.168.1.7:8080/video', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                setState(response.data.state);

                if (response.data.state === "Yawn" ||
                    response.data.state === "Sleep" ||
                    response.data.state === "Absent")
                    {
                    setFeedbackTime(prevTime => prevTime - 5);
                }
    
            } catch (error) {
                console.log(error);
                // Alert.alert('Error', 'Failed to process the image.');
            }
        }
    };
    
    const toggleFlash = () => {
        setFlashMode(
          flashMode === Camera.Constants.FlashMode.off
            ? Camera.Constants.FlashMode.on
            : Camera.Constants.FlashMode.off
        );
      };

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
            {visability ? (
                <View style={styles.cameraborder}>
                    <Camera  // remove sound
                        style={styles.camera}
                        type={Camera.Constants.Type.front}
                        flashMode={flashMode}
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
                        flashMode={flashMode} />
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

            <Text style={styles.message}>{state}</Text>
            {state === "Yawn" || state === "Sleep" ? ( 
                <Text style={styles.message}>Drink some coffee</Text>
            ) : state === "Absent" ? (
                <Text style={styles.message}>Put your device correctly</Text>
            ): null}

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
        height: 350,
        width: 270,
        marginTop: 12,
    },
    cameraVanish: {
        height: 0,
        width: 0,
    },
    cameraborder: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 470,
        width: 300,
        backgroundColor: '#cce3f0',
        borderRadius: 20,
        marginBottom: 20,
    },
    vanish: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
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
});
