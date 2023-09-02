import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RoundImage from '../RoundImage';
import {RFValue} from 'react-native-responsive-fontsize';

const Alarmitem = ({item}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('AlarmDetail', {})}>
            {/* <RoundImage source={item.LEADER_IMAGE ? {uri: item.LEADER_IMAGE} : require('../../img/symbol/ticker/BTC.png')} /> */}
            <RoundImage source={require('../../img/symbol/ticker/BTC.png')} />
            <View>
                <View style={styles.textbox}>
                    <Text>{item.ALARM_SEQ}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.LEADER_SEQ}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.TRADE_TYPE}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.TRADE_SYMBOL}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.TRADE_MARKET}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.TRADE_VOLUME}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.TRADE_PRICE}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.IS_READ_YN}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.IS_AUTOTRADE_YN}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.TRADE_YN}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>{item.REG_DT}</Text>
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
