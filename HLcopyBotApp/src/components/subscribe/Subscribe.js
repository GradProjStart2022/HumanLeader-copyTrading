import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Animated, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import CustomButton from '../CustomButton';
import {useNavigation} from '@react-navigation/native';
import {postSubscribe} from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubScribe = ({route}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAutoTrade, setIsAutoTrade] = useState('N');
    const [tradeType, setTradeType] = useState('CT01');
    const [fixAmount, setFixAmount] = useState(0);
    const [fixRatio, setFixRatio] = useState(0);
    const [stopRatio, setStopRatio] = useState(0);
    const [takeRatio, setTakeRatio] = useState(0);

    const navigation = useNavigation();

    useEffect(() => {
        setFixAmount(0);
        setFixRatio(0);
        setStopRatio(0);
        setTakeRatio(0);
    }, [tradeType]);
    return (
        <View style={styles.container}>
            <Text>{route.params.LeaderSEQ}</Text>
            <Picker selectedValue={isAutoTrade} onValueChange={item => setIsAutoTrade(item)}>
                <Picker.Item label="수동 거래" value={'N'} />
                <Picker.Item label="자동 거래" value={'Y'} />
            </Picker>
            <View>
                <Picker selectedValue={tradeType} onValueChange={item => setTradeType(item)}>
                    <Picker.Item label="고정 금액" value={'CT01'} />
                    <Picker.Item label="고정 비율" value={'CT02'} />
                </Picker>
                {tradeType === 'CT01' ? (
                    <View>
                        <Text>고정 금액</Text>
                        <TextInput style={styles.textbox} value={fixAmount} onChangeText={setFixAmount} keyboardType="number-pad" />
                    </View>
                ) : (
                    <View>
                        <Text>고정 비율</Text>
                        <TextInput style={styles.textbox} value={fixRatio} onChangeText={setFixRatio} keyboardType="number-pad" />
                    </View>
                )}

                <Text>스탑 리밋 비율</Text>
                <TextInput style={styles.textbox} value={stopRatio} onChangeText={setStopRatio} keyboardType="number-pad" />
                <Text>이익실현가 비율</Text>
                <TextInput style={styles.textbox} value={takeRatio} onChangeText={setTakeRatio} keyboardType="number-pad" clearTextOnFocus="true" />
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
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
                        <Text>testLeader1님 구독이 완료되었습니다.</Text>
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
    },
});

export default SubScribe;
