import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../CustomButton';
import RoundImage from '../RoundImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postUnsubscribe} from '../../utils/api';

const SubscribeItem = ({item}) => {
    const navigation = useNavigation();
    const [isPress, setIsPress] = useState(false);
    const [refresh, setRefresh] = useState(false);

    return (
        <TouchableOpacity style={styles.container} onPress={() => (isPress === true ? setIsPress(false) : setIsPress(true))}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <RoundImage source={require('../../img/symbol/ticker/BTC.png')} />
                    <View>
                        <View style={styles.textbox}>
                            <Text>{item.LEADER_NAME}</Text>
                        </View>
                        <View style={styles.textbox}>
                            <Text>수익률 : </Text>
                        </View>
                    </View>
                </View>
                {isPress === true ? (
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <CustomButton text={'구독 조건 변경'} onPress={() => navigation.navigate('Subscribe', {LeaderSEQ: item.LEADER_SEQ})} width={'45%'} />
                        <View style={{width: '10%'}} />
                        <CustomButton
                            text={'자세히 보기'}
                            onPress={() =>
                                navigation.navigate('LeaderDetail', {
                                    LEADER_SEQ: item.LEADER_SEQ,
                                    LEADER_UID: item.LEADER_UID,
                                    LEADER_NAME: item.LEADER_NAME,
                                    LEADER_IMAGE: item.LEADER_IMAGE,
                                    LEADER_CAPACITY: item.LEADER_CAPACITY,
                                    LEADER_PRICE: item.LEADER_PRICE,
                                    LEADER_AMOUNT: item.LEADER_AMOUNT,
                                })
                            }
                            color="#D4D9F3"
                            textColor="#1F3FDB"
                            width={'45%'}
                        />
                    </View>
                ) : null}
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

export default SubscribeItem;
