import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MenuButton from '../components/MenuButton';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = ({setIsLogin}) => {
    const navigation = useNavigation();

    const logout = async () => {
        try {
            console.log('logout');
            await setIsLogin(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Setting</Text>
            <MenuButton text={'계좌 설정'} onPress={() => navigation.navigate('AccountSetting')} />
            <MenuButton text={'구독 관리'} onPress={() => navigation.navigate('SubscribeSetting')} />
            <MenuButton text={'알람 설정'} onPress={() => navigation.navigate('AlarmSetting')} />
            <MenuButton text={'로그 아웃'} onPress={() => logout()} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 30,
    },
    title: {
        fontSize: 36,
        paddingBottom: 30,
    },
});

export default SettingScreen;
