import React, {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import SubscribeList from '../components/subscribe/SubscribeList';
import auth from '@react-native-firebase/auth';
import RoundImage from '../components/RoundImage';
import {getRate} from '../utils/api';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderAnimation from '../components/LoaderAnimation';
import {RFValue} from 'react-native-responsive-fontsize';

const HomeScreen = () => {
    const user = auth().currentUser;
    const [isLoadings, setIsLoadings] = useState(true);
    const [userRate, setUserRate] = useState();
    const [refreshing, setRefreshing] = React.useState(false);

    const getUserRate = async () => {
        try {
            const publicSeq = await AsyncStorage.getItem('publicSeq');
            setUserRate(await getRate(publicSeq));
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoadings(false);
            }, 500);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUserRate();
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setIsLoadings(true);
            getUserRate();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    );

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={[styles.box, {flexDirection: 'row'}]}>
                <RoundImage
                    imageStyle={{width: 70, height: 70}}
                    source={{uri: 'https://lh3.googleusercontent.com/a/AGNmyxbFWqDHfzst8LJ7OpUcMHqgI140WILlu_6SNIoB=s96-c'}}
                />
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.title}>{user.displayName}</Text>
                    <View style={{height: 20}} />
                    <Text>수익률 : {userRate}%</Text>
                </View>
            </View>
            <View></View>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>구독 중인 리더</Text>
                <SubscribeList />
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: RFValue(20),
    },
    box: {
        width: '100%',
        backgroundColor: '#eeeeee',
        marginBottom: 20,
        padding: 20,
    },
    text: {
        marginBottom: 10,
        fontSize: RFValue(15),
    },
});

export default HomeScreen;
