import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import TraderList from '../components/trader/TraderList';

const TraderListScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Leader</Text>
            <TraderList />
        </ScrollView>
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

export default TraderListScreen;
