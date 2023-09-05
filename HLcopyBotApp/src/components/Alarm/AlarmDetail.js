import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {alarmRead} from '../../utils/api';

const AlarmDetail = ({route}) => {
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
            <View style={styles.textbox}>
                <Text>리더 : {route.params.LEADER_SEQ}</Text>
            </View>
            <View style={styles.textbox}>
                <Text>거래 타입 : {route.params.TRADE_TYPE === 'TT01' ? '매수' : '매도'}</Text>
            </View>
            <View style={styles.textbox}>
                <Text>거래소 : {route.params.TRADE_MARKET}</Text>
            </View>
            <View style={styles.textbox}>
                <Text>채결량 : {route.params.TRADE_VOLUME}</Text>
            </View>
            <View style={styles.textbox}>
                <Text>채결 금액 : {route.params.TRADE_PRICE}</Text>
            </View>
            <View style={styles.textbox}>
                <Text>거래 여부 : {route.params.TRADE_YN}</Text>
            </View>
            <View style={styles.textbox}>
                <Text>거래 시간 : {route.params.REG_DT}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 20,
    },
});

export default AlarmDetail;
