import React from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import MenuButton from '../components/MenuButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteToken} from '../utils/api';

const SettingScreen = ({setIsLogin}) => {
    const navigation = useNavigation();
    const logout = async () => {
        try {
            const publicSeq = await AsyncStorage.getItem('publicSeq');
            await deleteToken(publicSeq);
            await GoogleSignin.signOut();
            // this.setState({user: null});
            setIsLogin(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Setting</Text>
            <MenuButton text={'계좌 설정'} onPress={() => navigation.navigate('AccountSetting')} />
            <MenuButton text={'구독 관리'} onPress={() => navigation.navigate('SubscribeSetting')} />
            <MenuButton text={'알람 설정'} onPress={() => Linking.openSettings()} />
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
