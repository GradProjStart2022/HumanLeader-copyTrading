import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import SubscribeList from '../../components/subscribe/SubscribeList';

const SubscribeSetting = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>구독 목록</Text>
            <SubscribeList />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 36,
        paddingBottom: 30,
    },
});

export default SubscribeSetting;
