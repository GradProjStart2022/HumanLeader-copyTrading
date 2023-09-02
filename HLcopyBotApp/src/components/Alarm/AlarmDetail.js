import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import RoundImage from '../RoundImage';
import {useNavigation} from '@react-navigation/native';

const AlarmDetail = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>asdf</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 20,
    },
});

export default AlarmDetail;
