import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import RootStackScreen from './src/screens/RootStackNavigater';
import LoginScreen from './src/screens/LoginScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [userinfo, setUserinfo] = useState();

    const googleSigniConfigure = () => {
        GoogleSignin.configure({
            webClientId: '297237989646-a1r8vte04i81hblti08f4m5q5hhrr8dg.apps.googleusercontent.com',
        });
    };

    useEffect(() => {
        googleSigniConfigure();
    });

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // eslint-disable-next-line no-lone-blocks
            {
                remoteMessage.data.tradeType === 'CT01'
                    ? Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
                          {text: '자동 거래'},
                          {
                              text: '자세히 보기',
                              onPress: () => {
                                  console.log('자세히보기');
                              },
                          },
                      ])
                    : Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
                          {text: '수동 거래'},
                          {
                              text: '자세히 보기',
                              onPress: () => {
                                  console.log('자세히보기');
                              },
                          },
                      ]);
            }

            console.log('메세지 도착');
            console.log(remoteMessage.notification);
            console.log(remoteMessage.data);
        });

        return unsubscribe;
    }, []);

    return <>{isLogin ? <RootStackScreen setIsLogin={setIsLogin} setUserinfo={setUserinfo} /> : <LoginScreen setIsLogin={setIsLogin} />}</>;
};

const styles = StyleSheet.create({});

export default App;
