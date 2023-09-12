import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import LeaderList from '../components/leader/LeaderList';
import {RFValue} from 'react-native-responsive-fontsize';

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
        fontSize: RFValue(36),
        marginTop: -20,
        fontFamily: 'NotoSansKR-Bold',
        color: '#000000',
    },
});

export default LeaderListScreen;
