import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AlarmList from '../components/Alarm/AlarmList';
import {RFValue} from 'react-native-responsive-fontsize';

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
        fontSize: RFValue(36),
        marginTop: -20,
        fontFamily: 'NotoSansKR-Bold',
        color: '#000000',
    },
});

export default AlarmScreen;
