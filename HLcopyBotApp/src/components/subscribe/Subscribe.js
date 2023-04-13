import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import CustomButton from '../CustomButton';

const SubScribe = ({route}) => {
    const [isAutoTrade, setIsAutoTrade] = useState('N');
    const [tradeType, setTradeType] = useState('TC01');
    const [fixAmount, setFixAmount] = useState(0);
    const [fixRatio, setFixRatio] = useState(0);
    const [stopRatio, setStopRatio] = useState(0);
    const [takeRatio, setTakeRatio] = useState(0);

    return (
        <View style={styles.container}>
            <Picker selectedValue={isAutoTrade} onValueChange={item => setIsAutoTrade(item)}>
                <Picker.Item label="수동 거래" value={'N'} />
                <Picker.Item label="자동 거래" value={'Y'} />
            </Picker>
            {isAutoTrade === 'N' ? null : (
                <View>
                    <Picker selectedValue={tradeType} onValueChange={item => setTradeType(item)}>
                        <Picker.Item label="고정 금액" value={'TC01'} />
                        <Picker.Item label="고정 비율" value={'TC02'} />
                    </Picker>
                    {tradeType === 'TC01' ? (
                        <View>
                            <Text>고정 금액</Text>
                            <TextInput style={styles.textbox} onChangeText={setFixAmount} keyboardType="number-pad" />
                        </View>
                    ) : (
                        <View>
                            <Text>고정 비율</Text>
                            <TextInput style={styles.textbox} onChangeText={setFixRatio} keyboardType="number-pad" />
                        </View>
                    )}

                    <Text>스탑 리밋 비율</Text>
                    <TextInput style={styles.textbox} onChangeText={setStopRatio} keyboardType="number-pad" />
                    <Text>이익실현가 비율</Text>
                    <TextInput style={styles.textbox} onChangeText={setTakeRatio} keyboardType="number-pad" />
                </View>
            )}
            <CustomButton
                text={'구독 하기'}
                onPress={() => {
                    console.log(tradeType);
                    console.log(fixAmount);
                    console.log(fixRatio);
                    console.log(stopRatio);
                    console.log(takeRatio);
                }}
            />
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
