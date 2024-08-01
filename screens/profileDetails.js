import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import Footer from './footer'

export default function ProfileDetails({ navigation }){
    return (
        <View style={styles.container}>
            <Text>
                Details
            </Text>

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
})