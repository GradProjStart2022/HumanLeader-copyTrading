import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AlarmList from '../components/Alarm/AlarmList';

const AlarmScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alarm</Text>
            <AlarmList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 36,
        paddingBottom: 30,
    },
});

export default AlarmScreen;
