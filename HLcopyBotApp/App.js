import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import RootStackScreen from './src/screens/RootStackNavigater';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
            console.log('Received a new FCM message:', remoteMessage);
        });

        return unsubscribe;
    }, []);

    return <>{isLogin ? <RootStackScreen setIsLogin={setIsLogin} /> : <LoginScreen setIsLogin={setIsLogin} />}</>;
};

const styles = StyleSheet.create({});

export default App;
