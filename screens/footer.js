import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Footer({ navigation }){

    const details = () => {
        navigation.navigate('ProfileDetails')
    }

    const home = () => {
        navigation.navigate('Profile')
    }

    const analysis = () => {
        navigation.navigate('Analysis')
    }

    return (
        <View style={styles.footer}>
            <View>
                <Pressable onPress={home}>
                    <MaterialIcons name="home" size={35} style={styles.icon} />
                </Pressable>
            </View>

            <View>
                <Pressable onPress={analysis}>
                    <MaterialCommunityIcons name="google-analytics" size={30} style={styles.icon} />
                </Pressable>
            </View>

            <View>
                <Pressable onPress={details}>
                    <Ionicons name="person" size={30} style={styles.icon} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#cce3f0',
        padding: 15,
        alignItems: 'center',
    },

    icon: {
        paddingRight: '35%',
        color: "darkblue", 
    }
});

