/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import traderdetail from '../../../testdata/traderdetail.json';
import RoundImage from '../RoundImage';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../CustomButton';
import {useNavigation} from '@react-navigation/native';

const TraderDetailScreen = ({route}) => {
    const {uid} = route.params;
    const trader = traderdetail;
    const [isSubscribe, setIsSubscribe] = useState(false);
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <Text>{uid}</Text> */}
                <View style={styles.title}>
                    <RoundImage
                        source={trader.ct_leader.LEADER_IMAGE ? {uri: trader.ct_leader.LEADER_IMAGE} : require('../../img/symbol/ticker/BTC.png')}
                        imageStyle={{width: RFValue(60), height: RFValue(60)}}
                    />
                    <Text style={styles.name}>{trader.ct_leader.LEADER_NAME}</Text>
                </View>
                <View style={styles.infobox}>
                    <Text style={styles.infotext}>팔로워: {trader.ct_leader.LEADER_CAPACITY}</Text>
                    <Text style={styles.infotext}>구독료: {trader.ct_leader.LEADER_PRICE.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    <Text style={styles.infotext}>투자 자금: {trader.ct_leader.LEADER_AMOUNT.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    <Text style={styles.infotext}>활동 기간: </Text>
                </View>
                <View style={{height: 300, backgroundColor: '#c0c0c0', width: '100%'}}>
                    <Text>그래프</Text>
                </View>
                <View style={{marginVertical: RFValue(20)}} />
                <Text style={{fontSize: 20, marginBottom: 10}}>최근 거래 목록</Text>
                <ScrollView horizontal={true}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.tableHeader, {width: RFValue(150)}]}>
                                <Text style={styles.tableHeaderText}>거래날짜</Text>
                            </View>
                            <View style={[styles.tableHeader, {width: RFValue(70)}]}>
                                <Text style={styles.tableHeaderText}>매도/매수</Text>
                            </View>
                            <View style={[styles.tableHeader, {width: RFValue(70)}]}>
                                <Text style={styles.tableHeaderText}>거래마켓</Text>
                            </View>
                            <View style={[styles.tableHeader, {width: RFValue(100)}]}>
                                <Text style={styles.tableHeaderText}>체결수량</Text>
                            </View>
                            <View style={[styles.tableHeader, {width: RFValue(100)}]}>
                                <Text style={styles.tableHeaderText}>체결금액</Text>
                            </View>
                        </View>
                        {trader.ct_leader_history.map(trader => (
                            <View key={trader.HISTORY_NUM} style={{flexDirection: 'row'}}>
                                <View style={[styles.tableBody, {width: RFValue(150)}]}>
                                    <Text style={styles.tableBodyText}>{trader.REG_DT}</Text>
                                </View>
                                <View style={[styles.tableBody, {width: RFValue(70)}]}>
                                    <Text style={styles.tableBodyText}>{trader.TRADE_TYPE === 'TT01' ? '매수' : '매도'}</Text>
                                </View>
                                <View style={[styles.tableBody, {width: RFValue(70)}]}>
                                    <Text style={styles.tableBodyText}>{trader.TRADE_MARKET}</Text>
                                </View>
                                <View style={[styles.tableBody, {width: RFValue(100)}]}>
                                    <Text style={styles.tableBodyText}>{trader.TRADE_VOLUME}</Text>
                                </View>
                                <View style={[styles.tableBody, {width: RFValue(100)}]}>
                                    <Text style={styles.tableBodyText}>{trader.TRADE_PRICE}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={{marginVertical: RFValue(20)}} />
                <CustomButton text={'구독 하기'} onPress={() => navigation.navigate('Subscribe', {uid: uid})} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    name: {
        fontSize: 24,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 20,
    },
    infobox: {
        width: '100%',
        backgroundColor: '#FAFAFA',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        padding: 20,
        marginBottom: 40,
    },
    infotext: {
        padding: 10,
        fontSize: 18,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        paddingVertical: RFValue(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableBody: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.7,
        paddingVertical: RFValue(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableBodyText: {
        fontSize: RFValue(11),
        lineHeight: RFValue(16.5),
        color: '#000000',
    },
});

export default TraderDetailScreen;
