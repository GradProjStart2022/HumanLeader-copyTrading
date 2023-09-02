import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {getPublic, postPublic, postPublicExist, postPublicToken} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({setIsLogin, setUserinfo}) => {
    const onGoogleButton = async () => {
        // fcm 토큰 발급
        const fcmToken = await messaging().getToken();

        // google 로그인
        const {idToken} = await GoogleSignin.signIn();
        const googleCredentail = auth.GoogleAuthProvider.credential(idToken);

        // 로그인 정보 확인
        const {user} = await auth().signInWithCredential(googleCredentail);
        const {email, uid} = user;
        await AsyncStorage.setItem('uid', uid);

        // 회원 등록 여부 확인
        const EXIST_COUNT = await postPublicExist(uid);

        // 미등록시 회원가입
        if (Number(EXIST_COUNT) === 0) {
            await postPublic({
                id: uid,
            });
        }

        // fcm 토큰 등록
        await postPublicToken({
            id: uid,
            token: fcmToken,
        });

        // 로그인
        await getPublic(uid);

        // 홈으로 이동
        setIsLogin(true);
    };

    return (
        <View style={styles.block}>
            <GoogleSigninButton style={styles.loginbutton} onPress={() => onGoogleButton()} />
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
    loginbutton: {
        width: '80%',
        height: 60,
    },
});
export default LoginScreen;
