import { StyleSheet, Text, View } from 'react-native';
import Footer from './footer'

export default function Analysis({ navigation }){
    return (
        <View style={styles.container}>
            <Text>
                Analysis
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