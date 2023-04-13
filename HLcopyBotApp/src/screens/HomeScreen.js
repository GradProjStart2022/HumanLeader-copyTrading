import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SubscribeList from '../components/subscribe/SubscribeList';

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
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

export default HomeScreen;
