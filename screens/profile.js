import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Footer from './footer'

export default function Pofile({ navigation }){
    
    const details = () => {
        navigation.navigate('ProfileDetails')
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Pressable onPress={details}>
                    <Ionicons name="person" size={30} color="black" />
                </Pressable>
            </View>

            <Footer navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },

    profile: {
        width: '90%',
        flexDirection: 'row',
    }
})
