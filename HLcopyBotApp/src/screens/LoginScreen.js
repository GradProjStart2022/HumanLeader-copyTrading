import React, {useRef} from 'react';
import {Button, ImageBackground, ImageBackgroundBase, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {getPublic, postPublic, postPublicExist, postPublicToken} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import {RFValue} from 'react-native-responsive-fontsize';

const LoginScreen = ({setIsLogin, setUserinfo}) => {
    const swiper = useRef(null);
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
        console.log(fcmToken);
        // 로그인
        await getPublic(uid);

        // 홈으로 이동
        setIsLogin(true);
    };

    return (
        <Swiper ref={swiper} style={styles.banner} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle} showsPagination={true} loop={false}>
            <ImageBackground style={{height: '100%'}} imageStyle={{opacity: 0.4}} source={require('../img/graph.jpg')} resizeMode="cover">
                <View style={styles.block}>
                    <Text style={styles.title}>H L C T</Text>
                    <Text style={styles.title2}>
                        Human{'  '}Leader{'  '}Copytrading
                    </Text>
                    <Text style={styles.text1}>{'24시간 리더들을 모니터링 하세요!'}</Text>
                    <Text style={styles.text2}>{'팔로우한 리더들의\n거래 알람을 받으세요!'}</Text>
                    <View style={{flex: 1}}></View>
                    <GoogleSigninButton style={styles.loginbutton} onPress={() => onGoogleButton()} />
                </View>
            </ImageBackground>
        </Swiper>
    );
};
const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        paddingTop: RFValue(120),
        // justifyContent: 'center',
    },
    loginbutton: {
        width: '80%',
        height: 60,
        marginBottom: RFValue(60),
    },
    banner: {
        backgroundColor: '#90caf9',
    },
    dotStyle: {
        borderColor: '#777',
        borderWidth: 0.3,
        backgroundColor: '#fff',
    },
    activeDotStyle: {
        borderColor: '#111',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    title: {
        color: '#ffffff',
        fontSize: RFValue(38),
        textAlign: 'center',
        margintop: RFValue(500),
        fontFamily: 'MBC_1961_M',
    },
    title2: {
        color: '#eeeeee',
        fontSize: RFValue(15),
        textAlign: 'center',
        marginBottom: RFValue(60),
        fontFamily: 'DancingScript-VariableFont_wght',
    },
    text1: {
        color: '#ffffff',
        fontSize: RFValue(20),
        textAlign: 'center',
        marginVertical: RFValue(20),
        marginTop: RFValue(100),
        fontFamily: 'NotoSansKR-Bold',
    },
    text2: {
        color: '#ffffff',
        fontSize: RFValue(15),
        textAlign: 'center',
        fontFamily: 'NotoSansKR-Medium',
    },
    button: {
        width: '80%',
        paddingVertical: RFValue(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFValue(12),
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        marginBottom: RFValue(60),
    },
    buttonText: {
        marginLeft: RFValue(4),
        fontSize: RFValue(13),
        color: '#000000',
        opacity: 85,
    },
});
export default LoginScreen;
