import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import RootStackScreen from './src/screens/RootStackNavigater';
import LoginScreen from './src/screens/LoginScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {istrade, manualTrade} from './src/utils/api';
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
                remoteMessage.data.IS_AUTOTRADE_YN === 'Y'
                    ? Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
                          {
                              text: '확인',
                              onPress: () => {
                                  console.log(remoteMessage.data);
                              },
                          },
                      ])
                    : Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
                          //   {
                          //       text: '수동 거래',
                          //       onPress: async () => {
                          //           const publicSeq = await AsyncStorage.getItem('publicSeq');
                          //           const side = remoteMessage.data.TRADE_TYPE === 'TT01' ? 'bid' : 'ask';
                          //           await manualTrade({
                          //               PUBLIC_SEQ: Number(publicSeq),
                          //               side: side,
                          //               ord_type: 'limit',
                          //               price: Number(remoteMessage.data.TRADE_PRICE),
                          //               market: remoteMessage.data.TRADE_MARKET,
                          //               volume: Number(remoteMessage.data.TRADE_VOLUME),
                          //           });
                          //           //   await istrade({ALARM_SEQ: remoteMessage.data.ALARM_SEQ});
                          //       },
                          //   },
                          {
                              text: '확인',
                              onPress: () => {
                                  console.log(remoteMessage.data);
                              },
                          },
                      ]);
            }

            console.log('메세지 도착');
            console.log(remoteMessage.notification);
            console.log(remoteMessage.data);
            console.log(remoteMessage.data.TRADE_TYPE);
        });

        return unsubscribe;
    }, []);

    return <>{isLogin ? <RootStackScreen setIsLogin={setIsLogin} setUserinfo={setUserinfo} /> : <LoginScreen setIsLogin={setIsLogin} />}</>;
};

export default App;
