import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RoundImage from '../RoundImage';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const Alarmitem = ({item}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate('AlarmDetail', {
                    ALARM_SEQ: item.ALARM_SEQ,
                    LEADER_SEQ: item.LEADER_SEQ,
                    LEADER_NAME: item.LEADER_NAME,
                    TRADE_TYPE: item.TRADE_TYPE,
                    TRADE_SYMBOL: item.TRADE_SYMBOL,
                    TRADE_MARKET: item.TRADE_MARKET,
                    TRADE_VOLUME: item.TRADE_VOLUME,
                    TRADE_PRICE: item.TRADE_PRICE,
                    IS_READ_YN: item.IS_READ_YN,
                    IS_AUTOTRADE_YN: item.IS_AUTOTRADE_YN,
                    TRADE_YN: item.TRADE_YN,
                    REG_DT: item.REG_DT,
                })
            }>
            <View style={styles.container2}>
                <View style={{flex: 1}}>
                    <View style={styles.textbox}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.title}>{item.IS_AUTOTRADE_YN === 'Y' ? '자동거래 알림 ' : '수동거래 알림 '}</Text>
                            {item.IS_READ_YN === 'N' ? (
                                <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', borderRadius: 10, width: 15, height: 15}}>
                                    <Text style={{color: '#ffffff', fontSize: 10}}>N</Text>
                                </View>
                            ) : null}
                        </View>
                        <Text style={styles.text1}>{formatDate(item.REG_DT)}</Text>
                        <Text style={styles.text2}>리더: {item.LEADER_NAME}</Text>
                        <Text style={styles.text2}>거래 타입 : {item.TRADE_TYPE === 'TT01' ? '매수' : '매도'}</Text>
                        <Text style={styles.text2}>채결량 : {item.TRADE_VOLUME}</Text>
                        <Text style={styles.text2}>채결 금액 : {item.TRADE_PRICE}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(15),
        borderColor: '#cecece',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    container2: {
        flexDirection: 'row',
    },
    icon: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbox: {
        justifyContent: 'center',
    },
    title: {
        color: '#000000',
        fontSize: RFValue(18),
    },
    text1: {
        color: '#030303',
        fontSize: RFValue(12),
        marginBottom: 5,
    },
    text2: {
        color: '#000000',
        fontSize: RFValue(15),
    },
});

export default Alarmitem;
