import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RoundImage from '../RoundImage';
import {RFValue} from 'react-native-responsive-fontsize';

const Alarmitem = ({item}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate('AlarmDetail', {
                    ALARM_SEQ: item.ALARM_SEQ,
                    LEADER_SEQ: item.LEADER_SEQ,
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
            <View>
                <View style={styles.textbox}>
                    <Text>리더 : {item.LEADER_SEQ}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>거래 타입 : {item.TRADE_TYPE === 'TT01' ? '매수' : '매도'}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>거래소 : {item.TRADE_MARKET}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>채결량 : {item.TRADE_VOLUME}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>채결 금액 : {item.TRADE_PRICE}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>거래 여부 : {item.TRADE_YN}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>거래 시간 : {item.REG_DT}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderRadius: RFValue(12),
        paddingHorizontal: RFValue(20),
        paddingVertical: RFValue(15),
        marginBottom: RFValue(10),
        zIndex: -1,
    },
    textbox: {
        justifyContent: 'center',
    },
});

export default Alarmitem;
