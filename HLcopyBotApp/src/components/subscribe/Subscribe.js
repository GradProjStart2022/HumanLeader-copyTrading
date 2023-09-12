import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Alert, Animated, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, View, ViewBase} from 'react-native';
import CustomButton from '../CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getContent, postSubscribe} from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderAnimation from '../LoaderAnimation';
import {RFValue} from 'react-native-responsive-fontsize';

const SubScribe = ({route}) => {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const [isAutoTrade, setIsAutoTrade] = useState('N');
    const [tradeType, setTradeType] = useState('CT01');
    const [fixAmount, setFixAmount] = useState(0);
    const [fixRatio, setFixRatio] = useState(0);
    const [stopRatio, setStopRatio] = useState(0);
    const [takeRatio, setTakeRatio] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [fixedRatio, setFixedRatio] = useState();
    const [fixedAmount, setFixedAmount] = useState();

    const getContents = async () => {
        try {
            const content = await getContent();
            setFixedRatio(content.find(item => item.text_id === 'AT01')?.text_contents);
            setFixedAmount(content.find(item => item.text_id === 'AT02')?.text_contents);
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
            getContents();
            Alert.alert('주의사항', '구독 후 거래 발생 시, 슬리피지 0.5%가 발생할 수 있습니다.', [{text: '확인'}]);
        }, []),
    );

    useEffect(() => {
        setFixAmount(0);
        setFixRatio(0);
        setStopRatio(0);
        setTakeRatio(0);
    }, [tradeType]);

    return (
        <View style={{flex: 1}}>
            {isLoading ? (
                <LoaderAnimation />
            ) : (
                <View style={styles.container}>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerbox} selectedValue={isAutoTrade} onValueChange={item => setIsAutoTrade(item)}>
                            <Picker.Item label="수동 거래" value={'N'} />
                            <Picker.Item label="자동 거래" value={'Y'} />
                        </Picker>
                    </View>
                    <View style={{marginTop: 10}}>
                        <View style={styles.picker}>
                            <Picker style={styles.pickerbox} selectedValue={tradeType} onValueChange={item => setTradeType(item)}>
                                <Picker.Item label="고정 금액" value={'CT01'} />
                                <Picker.Item label="고정 비율" value={'CT02'} />
                            </Picker>
                        </View>
                        <View style={{height: 20}} />
                        {tradeType === 'CT01' ? (
                            <View>
                                <Text style={styles.text1}>고정 금액</Text>
                                <Text>{fixedAmount}</Text>
                                <TextInput style={styles.textbox} value={fixAmount} onChangeText={setFixAmount} keyboardType="number-pad" />
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.text1}>고정 비율</Text>
                                <Text>{fixedRatio}</Text>
                                <TextInput style={styles.textbox} value={fixRatio} onChangeText={setFixRatio} keyboardType="number-pad" />
                            </View>
                        )}
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text1}>스탑 리밋 비율</Text>
                            <Text> (ver1.1 개발 예정)</Text>
                        </View>
                        <TextInput style={styles.textbox} editable={false} value={stopRatio} onChangeText={setStopRatio} keyboardType="number-pad" />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text1}>이익실현가 비율</Text>
                            <Text> (ver1.1 개발 예정)</Text>
                        </View>
                        <TextInput
                            style={styles.textbox}
                            editable={false}
                            value={takeRatio}
                            onChangeText={setTakeRatio}
                            keyboardType="number-pad"
                            clearTextOnFocus="true"
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
                        <CustomButton
                            text={'구독 하기'}
                            onPress={async () => {
                                const publicSeq = await AsyncStorage.getItem('publicSeq');
                                await postSubscribe({
                                    publicSeq: publicSeq,
                                    leaderSeq: route.params.LeaderSEQ,
                                    tradeType: tradeType,
                                    fixAmount: fixAmount,
                                    fixRatio: fixRatio,
                                    stopRatio: stopRatio,
                                    takeRatio: takeRatio,
                                    isAutoTrading: isAutoTrade,
                                });
                                setIsVisible(true);
                            }}
                        />
                    </View>

                    <Modal animationType="none" visible={isVisible} transparent={true}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                alignItems: 'center',
                            }}>
                            <Animated.View
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 7,
                                    padding: 20,
                                    width: '80%',
                                }}>
                                <Text style={styles.modaltext}>testLeader1님 구독이 완료되었습니다.</Text>
                                <View style={{height: 10}} />
                                <CustomButton
                                    text={'확인'}
                                    width={'30%'}
                                    onPress={() => {
                                        setIsVisible(false);
                                        navigation.goBack();
                                    }}
                                />
                            </Animated.View>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    textbox: {
        backgroundColor: '#F2F2F2',
        marginTop: 5,
        marginBottom: 30,
        height: 60,
        borderRadius: 10,
    },
    text1: {
        fontSize: RFValue(20),
        color: '#000000',
    },
    picker: {
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        height: 60,
        justifyContent: 'center',
    },
    modaltext: {
        color: '#000000',
        fontSize: RFValue(15),
        marginBottom: 10,
    },
});

export default SubScribe;
