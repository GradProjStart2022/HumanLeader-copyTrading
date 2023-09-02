import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import LeaderList from '../components/leader/LeaderList';

const LeaderListScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Leader</Text>
            <LeaderList />
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

export default LeaderListScreen;
