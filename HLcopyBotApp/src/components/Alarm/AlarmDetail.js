import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {alarmRead, istrade, manualTrade} from '../../utils/api';
import CustomButton from '../CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RFValue} from 'react-native-responsive-fontsize';

const formatDate = dateObj => {
    const date = new Date(dateObj);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

const AlarmDetail = ({route}) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const isRead = async item => {
        try {
            await alarmRead({ALARM_SEQ: item.params.ALARM_SEQ});
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            isRead(route);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.IS_AUTOTRADE_YN === 'Y' ? '자동거래 알람' : '수동거래 알람'}</Text>
            <View style={{padding: 20, borderColor: '#eeeeee', borderWidth: 3, borderRadius: 15}}>
                <Text style={styles.text}>리더 : {route.params.LEADER_NAME}</Text>
                <Text style={styles.text}>거래 시간 : {formatDate(route.params.REG_DT)}</Text>
                <Text style={styles.text}>거래 타입 : {route.params.TRADE_TYPE === 'TT01' ? '매수' : '매도'}</Text>
                <Text style={styles.text}>거래 코인 : {route.params.TRADE_MARKET}</Text>
                <Text style={styles.text}>채결량 : {route.params.TRADE_VOLUME}</Text>
                <Text style={styles.text}>채결 금액 : {route.params.TRADE_PRICE}</Text>
            </View>
            <View style={styles.button}>
                {route.params.TRADE_YN === 'Y' ? (
                    <></>
                ) : (
                    <CustomButton
                        text={'수동거래'}
                        onPress={async () => {
                            Alert.alert('수동 거래', '리더의 주문을 카피하시겠습니까?', [
                                {
                                    text: '확인',
                                    onPress: async () => {
                                        const publicSeq = await AsyncStorage.getItem('publicSeq');
                                        const side = route.params.TRADE_TYPE === 'TT01' ? 'bid' : 'ask';
                                        await manualTrade({
                                            PUBLIC_SEQ: Number(publicSeq),
                                            side: side,
                                            ord_type: 'limit',
                                            price: Number(route.params.TRADE_PRICE),
                                            market: route.params.TRADE_MARKET,
                                            volume: Number(route.params.TRADE_VOLUME),
                                        });
                                        await istrade({ALARM_SEQ: route.params.ALARM_SEQ});
                                        navigation.goBack();
                                    },
                                },
                                {
                                    text: '취소',
                                    onPress: () => {
                                        console.log('취소');
                                    },
                                },
                            ]);
                        }}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: RFValue(36),
        fontFamily: 'NotoSansKR-Bold',
        color: '#000000',
        marginBottom: 20,
    },
    text: {
        fontSize: RFValue(20),
        paddingBottom: 10,
        color: '#000000',
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
});

export default AlarmDetail;
