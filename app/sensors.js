import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Vibration, StatusBar } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import Feather from '@expo/vector-icons/Feather';

export default function SensorData({ navigation }) {
  StatusBar.setBarStyle('light-content');

  const initialTime = 3600

  const [showLeaveMessage, setShowLeaveMessage] = useState(false);
  const [feedbackTime, setFeedbackTime] = useState(initialTime);
  const [notificationVisible, setNotificationVisible] = useState(false);

  // State for accelerometer data
  const [accelData, setAccelData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  // State for gyroscope data
  const [gyroData, setGyroData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft === 0) {
            StatusBar.setBarStyle('dark-content');
            navigation.replace('feedback', 
                {feed: feedbackTime,
                initial: initialTime
            });
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when timeLeft changes
    }, [timeLeft]);


  useEffect(() => {
    // Subscribe to accelerometer updates
    const accelSubscription = Accelerometer.addListener(accelerometerData => {
      setAccelData(accelerometerData);
    });

    // Subscribe to gyroscope updates
    const gyroSubscription = Gyroscope.addListener(gyroscopeData => {
      setGyroData(gyroscopeData);
    });

    // Set update interval for both sensors (in milliseconds)
    Accelerometer.setUpdateInterval(1000); // 1 second
    Gyroscope.setUpdateInterval(1000); // 1 second

    // Cleanup subscriptions on component unmount
    return () => {
      accelSubscription.remove();
      gyroSubscription.remove();
    };
  }, []);

  useEffect(() => {
    // Check the condition to show "Leave your phone"
    if (Math.abs(gyroData.x) > 0.5 || Math.abs(gyroData.y) > 0.5 || Math.abs(gyroData.z) > 0.5) {
      setShowLeaveMessage(true);
      setFeedbackTime(feedbackTime => feedbackTime - 1);

      // Set a timeout to hide the message after 5 seconds
      const timer = setTimeout(() => {
        setShowLeaveMessage(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      // Clean up the timeout if the component unmounts or if the condition changes
      return () => clearTimeout(timer);
    } else {
      setShowLeaveMessage(false);
    }
  }, [gyroData]); // Depend on gyroData to re-evaluate the condition

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

  // Vibration 
  const handlePress = () => {
    // Trigger vibration
    Vibration.vibrate(500); // Vibrate for 500 milliseconds
  };

  useEffect(() => {
    if (showLeaveMessage) {
      handlePress(); // Call handlePress when the condition is met
    }
  }, [showLeaveMessage]);

  return (
    <View style={styles.container}>
      
      {notificationVisible ?
        (<Text style={styles.not}>
          <Feather name="alert-triangle" size={15} color="red" /><Text>  </Text>
          Notifications are paused</Text>):(<></>)}

      <View style={styles.row}>
        <Text style={styles.timer}>{hours}</Text>
        <Text style={styles.timer}>{minutes}</Text>
        <Text style={styles.timer}>{seconds}</Text>
      </View>
      {showLeaveMessage ? 
      (<Text style={styles.text}> Leave your phone </Text>)
      : (<Text style={styles.text}>Good Luck</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', // Horizontal center
      justifyContent: 'center',
      backgroundColor: '#25204f',
    },

    text: {
      fontSize: 30,
      color: '#cce3f0',
      fontWeight: 'bold',
      marginTop: '5%',
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
      marginTop: '30%',
      marginBottom: '10%',
  },
  not: {
    fontSize: 15,
    color: 'red',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'red',
    textAlign: 'center',
    padding: 7,
    marginBottom: 5,
    width: 250,
}

})


// <Text>Accelerometer:</Text>
// <Text>x: {accelData.x.toFixed(3)}</Text>
// <Text>y: {accelData.y.toFixed(3)}</Text>
// <Text>z: {accelData.z.toFixed(3)}</Text>
// <Text></Text>
// <Text></Text>
// <Text>Gyroscope:</Text>
// <Text>x: {gyroData.x.toFixed(3)}</Text>
// <Text>y: {gyroData.y.toFixed(3)}</Text>
// <Text>z: {gyroData.z.toFixed(3)}</Text>