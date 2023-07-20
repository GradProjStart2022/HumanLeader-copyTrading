import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import RoundImage from '../RoundImage';

const TraderItem = ({item}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate('TraderDetail', {
                    LEADER_SEQ: item.LEADER_SEQ,
                    LEADER_UID: item.LEADER_UID,
                    LEADER_NAME: item.LEADER_NAME,
                    LEADER_IMAGE: item.LEADER_IMAGE,
                    LEADER_CAPACITY: item.LEADER_CAPACITY,
                    LEADER_PRICE: item.LEADER_PRICE,
                    LEADER_AMOUNT: item.LEADER_AMOUNT,
                })
            }>
            {/* <RoundImage source={item.LEADER_IMAGE ? {uri: item.LEADER_IMAGE} : require('../../img/symbol/ticker/BTC.png')} /> */}
            <RoundImage source={require('../../img/symbol/ticker/BTC.png')} />
            <View>
                <View style={styles.textbox}>
                    <Text>{item.LEADER_NAME}</Text>
                </View>
                <View style={styles.textbox}>
                    <Text>구독자 수 : {item.LEADER_PRICE}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        borderRadius: RFValue(12),
        alignItems: 'center',
        paddingHorizontal: RFValue(20),
        paddingVertical: RFValue(15),
        marginBottom: RFValue(10),
        zIndex: -1,
    },
    textbox: {
        flex: 1,
        justifyContent: 'center',
    },
});
export default TraderItem;
