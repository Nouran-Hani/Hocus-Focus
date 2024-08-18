import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';

export default function SensorData() {
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

  return (
    <View style={styles.container}>
      <Text>Accelerometer:</Text>
      <Text>x: {accelData.x.toFixed(3)}</Text>
      <Text>y: {accelData.y.toFixed(3)}</Text>
      <Text>z: {accelData.z.toFixed(3)}</Text>
      <Text></Text>
      <Text></Text>
      <Text>Gyroscope:</Text>
      <Text>x: {gyroData.x.toFixed(3)}</Text>
      <Text>y: {gyroData.y.toFixed(3)}</Text>
      <Text>z: {gyroData.z.toFixed(3)}</Text>
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
})