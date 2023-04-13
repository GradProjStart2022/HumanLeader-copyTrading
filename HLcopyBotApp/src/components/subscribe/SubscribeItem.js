import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../CustomButton';
import RoundImage from '../RoundImage';

const SubscribeItem = () => {
    const navigation = useNavigation();
    const [isPress, setIsPress] = useState(false);

    return (
        <TouchableOpacity style={styles.container} onPress={() => (isPress === true ? setIsPress(false) : setIsPress(true))}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <RoundImage source={require('../../img/symbol/ticker/BTC.png')} />
                    <View>
                        <View style={styles.textbox}>
                            <Text>Test1</Text>
                        </View>
                        <View style={styles.textbox}>
                            <Text>수익률 : </Text>
                        </View>
                    </View>
                </View>
                {isPress === true ? (
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <CustomButton text={'거래 방식 설정'} width={'45%'} onPress={() => navigation.navigate('Subscribe')} />
                        <View style={{width: '10%'}} />
                        <CustomButton text={'구독 취소'} width={'45%'} />
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
