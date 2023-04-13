import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import KakaoLoginButton from '../components/KakaoLoginButton';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({setIsLogin}) => {
    const signinKakao = async () => {
        try {
            await setIsLogin(true);
            const fcmToken = await messaging().getToken();

            console.log(fcmToken);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.block}>
            <KakaoLoginButton style={styles.button} onPress={() => signinKakao()} />
        </View>
    );
};
const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100%',
    },
});
export default LoginScreen;
