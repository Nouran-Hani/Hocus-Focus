import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function Customize({ navigation }){

//     StatusBar.setBarStyle('dark-content');

//     const [time, setTime] = useState('');

//     const press = (timeValue) => {
//         setTime(timeValue)
//         StatusBar.setBarStyle('light-content');
//         navigation.navigate('start', { timer: timeValue });
//     }

        const [selectedHour, setSelectedHour] = useState(0);
        const [selectedMinute, setSelectedMinute] = useState(0);
        const [selectedSecond, setSelectedSecond] = useState(0);

        const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
        );

        const scrollToIndex = (index, ref) => {
        ref.current?.scrollToIndex({ animated: true, index });
        };

        const hours = Array.from({ length: 7 }, (_, i) => String(i).padStart(2, '0'));
        const minutesAndSeconds = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')); // Generate numbers from 0 to 59


    return (
        <SafeAreaView style={styles.safeContainer}>
            <SafeAreaView style={{backgroundColor: '#25204f'}}/>
            <View style={styles.container}>
                <Text style={styles.select}>
                    Select a timer
                </Text>

            <View style={styles.pickerContainer}>
            <FlatList
                ref={flatList => { this.hourList = flatList; }}
                data={hours}
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                snapToInterval={40}
                decelerationRate="fast"
                onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.y / 40);
                setSelectedHour(index);
                }}
                style={styles.list}
            />
            <Text style={styles.colon}>:</Text>
            <FlatList
                ref={flatList => { this.minuteList = flatList; }}
                data={minutesAndSeconds}
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                snapToInterval={40}
                decelerationRate="fast"
                onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.y / 40);
                setSelectedMinute(index);
                }}
                style={styles.list}
            />
            <Text style={styles.colon}>:</Text>
            <FlatList
                ref={flatList => { this.secondList = flatList; }}
                data={minutesAndSeconds}
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                snapToInterval={40}
                decelerationRate="fast"
                onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.y / 30);
                setSelectedSecond(index);
                }}
                style={styles.list}
            />
            </View>
            <Text style={styles.selectedTime}>
            Selected Time: {`${selectedHour}h : ${selectedMinute}m : ${selectedSecond}s`}
            </Text>

                <TouchableOpacity 
                style={styles.touch}
                onPress={() => press()}>
                    <Text style={styles.buttonText}>
                    Start
                    </Text>
                </TouchableOpacity>

                {/* <Footer navigation={navigation} /> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#cce3f0'
    },

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cce3f0',

    },

    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    touch: {
        backgroundColor: '#25204f',
        padding: 15,
        borderRadius: 20,
        margin: 15,
        width: 120,
        marginTop: '5%',
    },

    select: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#25204f',
        marginTop: '35%',
        marginBottom: '35%',
    },

    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },

    list: {
        height: 120,
    },
        
    item: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemText: {
        fontSize: 30,
        color: '#25204f',
        fontWeight: 'bold',
    },

    colon: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#25204f',
        textAlign: 'center',
    },
})


// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#f8f8f8',
// },
// label: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   marginBottom: 20,
// },


// colon: {
//   fontSize: 20,
//   marginHorizontal: 10,
// },
// selectedTime: {
//   marginTop: 20,
//   fontSize: 16,
// },
// });