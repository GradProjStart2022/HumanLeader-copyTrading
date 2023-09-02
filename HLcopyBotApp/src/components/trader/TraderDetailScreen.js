/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import traderdetail from '../../../testdata/traderdetail.json';
import RoundImage from '../RoundImage';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getSubscribed, postUnsubscribe} from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderAnimation from '../LoaderAnimation';

const TraderDetailScreen = ({route}) => {
    const trader = traderdetail;
    const [isSubscribe, setIsSubscribe] = useState();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    const Subscribed = async item => {
        try {
            const publicSeq = await AsyncStorage.getItem('publicSeq');
            const subScribe = await getSubscribed(item.LEADER_SEQ, publicSeq);
            setIsSubscribe(subScribe.SUBSCRIBED);
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
            setIsLoading(true);
            Subscribed(route.params);
        }, [isSubscribe]),
    );

    return (
        <View style={{flex: 1}}>
            {isLoading ? (
                <LoaderAnimation />
            ) : (
                <View style={{flex: 1}}>
                    <ScrollView style={styles.container}>
                        <View style={styles.title}>
                            <RoundImage source={require('../../img/symbol/ticker/BTC.png')} imageStyle={{width: RFValue(60), height: RFValue(60)}} />
                            <Text style={styles.name}>{route.params.LEADER_NAME}</Text>
                        </View>

                        <View style={styles.infobox}>
                            <Text style={styles.infotext}>팔로워: {}</Text>
                            <Text style={styles.infotext}>구독료: {route.params.LEADER_PRICE.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                            <Text style={styles.infotext}>투자 자금: {route.params.LEADER_AMOUNT.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                            {/* <Text style={styles.infotext}>활동 기간: </Text> */}
                        </View>
                        {/* <View style={{height: 300, backgroundColor: '#c0c0c0', width: '100%'}}>
                    <Text>그래프</Text>
                </View> */}
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
                    </ScrollView>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 20,
                            right: 20,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            backgroundColor: 'rgba(0,0,0,0)',
                        }}>
                        {isSubscribe === 'N' ? (
                            <CustomButton text={'구독 하기'} onPress={() => navigation.navigate('Subscribe', {LeaderSEQ: route.params.LEADER_SEQ})} />
                        ) : (
                            <View style={{flexDirection: 'row'}}>
                                <CustomButton
                                    text={'구독 조건 변경'}
                                    onPress={() => navigation.navigate('Subscribe', {LeaderSEQ: route.params.LEADER_SEQ})}
                                    width="40%"
                                />
                                <View style={{width: '10%'}} />
                                <CustomButton
                                    text={'구독 해지'}
                                    onPress={async () => {
                                        const publicSeq = await AsyncStorage.getItem('publicSeq');
                                        await postUnsubscribe({
                                            publicSeq: publicSeq,
                                            leaderSeq: route.params.LEADER_SEQ,
                                        });
                                        Alert.alert('구독 취소', '구독이 취소되었습니다.', [{text: '확인', onPress: () => setIsSubscribe('N')}]);
                                    }}
                                    color="#D4D9F3"
                                    textColor="#1F3FDB"
                                    width="40%"
                                />
                            </View>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
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
