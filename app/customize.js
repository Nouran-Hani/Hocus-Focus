import { StyleSheet, Text, View, TouchableOpacity, StatusBar, SafeAreaView, FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

export default function Customize({ navigation }) {
    StatusBar.setBarStyle('dark-content');

    const [time, setTime] = useState('00:00:00');
    const [selectedHourIndex, setSelectedHourIndex] = useState(0);
    const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(0);

    const hourListRef = useRef(null);
    const minuteListRef = useRef(null);

    useEffect(() => {
        // Scroll to the selected hour and minute when the component mounts or time changes
        hourListRef.current?.scrollToIndex({ 
            index: selectedHourIndex, 
            animated: true,
            viewPosition: 0.5 // Center the selected item
        });
        minuteListRef.current?.scrollToIndex({ 
            index: selectedMinuteIndex, 
            animated: true,
            viewPosition: 0.5 // Center the selected item
        });
    }, [selectedHourIndex, selectedMinuteIndex]);

    const press = (timeValue) => {
        setTime(timeValue);
        StatusBar.setBarStyle('light-content');
        navigation.navigate('start', { timer: timeValue });
    }

    const onHourScrollEnd = (event) => {
        const indexH = Math.round(event.nativeEvent.contentOffset.y / 50);
        const hour = hours[indexH] || '00';
        const currentMinutes = time.split(':')[1]; // Get current minutes from the state
        setTime(`${hour}:${currentMinutes}:00`); // Update state with new time
        setSelectedHourIndex(indexH); // Update selected hour index
    };

    const onMinuteScrollEnd = (event) => {
        const indexM = Math.round(event.nativeEvent.contentOffset.y / 50);
        const minute = minutes[indexM] || '00';
        const currentHour = time.split(':')[0]; // Get current hour from the state
        setTime(`${currentHour}:${minute}:00`); // Update state with new time
        setSelectedMinuteIndex(indexM); // Update selected minute index
    };

    const renderItem = ({ item, index, type }) => (
        <View style={styles.item}>
            <Text style={[
                styles.itemText,
                (type === 'hour' && index === selectedHourIndex) ? styles.selectedItemText : null,
                (type === 'minute' && index === selectedMinuteIndex) ? styles.selectedItemText : null
            ]}>
                {item}
            </Text>
        </View>
    );

    let hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    hours.push(" ");
    hours.splice(0, 0, "  ");
    let minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    minutes.push(" ");
    minutes.splice(0, 0, "  ");

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <Text style={styles.select}>
                    Select a timer
                </Text>

                <View style={styles.pickerContainer}>
                    <FlatList
                        ref={hourListRef}
                        data={hours}
                        keyExtractor={(item) => item.toString()}
                        renderItem={(itemData) => renderItem({ ...itemData, type: 'hour' })}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={50}
                        decelerationRate="fast"
                        onMomentumScrollEnd={onHourScrollEnd}
                        style={styles.list}
                    />
                    <Text style={styles.colon}>:</Text>
                    <FlatList
                        ref={minuteListRef}
                        data={minutes}
                        keyExtractor={(item) => item.toString()}
                        renderItem={(itemData) => renderItem({ ...itemData, type: 'minute' })}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={50}
                        decelerationRate="fast"
                        onMomentumScrollEnd={onMinuteScrollEnd}
                        style={styles.list}
                    />
                    <Text style={styles.colon}>:</Text>
                    <Text style={styles.itemText0}>  00</Text>
                </View>
                {/* <Text style={styles.itemText}>
                    {time}
                </Text> */}

                <TouchableOpacity 
                    style={styles.touch}
                    onPress={() => press(time)}
                >
                    <Text style={styles.buttonText}>
                        Start
                    </Text>
                </TouchableOpacity>
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
        marginTop: '35%',
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
        height: 150,
    },
    item: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 30,
        color: '#25204f',
        fontWeight: 'bold',
    },
    itemText0: {
        fontSize: 40,
        color: '#25204f',
        fontWeight: 'bold',
    },
    selectedItemText: {
        fontSize: 40, // Larger font size for selected item
    },
    colon: {
        marginHorizontal: 10,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#25204f',
        textAlign: 'center',
    },
});
