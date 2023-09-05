/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, Animated, Image, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postPublicKey} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';

const AccountSetting = () => {
    const navigation = useNavigation();

    const [isVisible, setIsVisible] = useState(false);
    const [accessKey, setAccessKey] = useState('3Wvox9z9D7P7himIbDbyHCxkPPDHlT9pZa98fK1z');
    const [secretKey, setSecretKey] = useState('MvIm9MDMavMhZO0rmDLz5xfQX8CDP1Pa2E4X2ZPN');
    const updateKey = async () => {
        const id = await AsyncStorage.getItem('uid');
        const result = await postPublicKey({
            id: id,
            accessKey: accessKey,
            secretKey: secretKey,
        });
        if (result === 1) {
            setIsVisible(true);
        } else {
            Alert.alert('key 등록 에러', 'key가 올바르게 입력됬는지 확인해주세요', [
                {
                    text: '확인',
                },
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    marginVertical: RFValue(30),
                }}>
                <Image style={styles.image} source={require('../../img/symbol/exchange/upbit.png')} />
                <Text style={styles.name}>UPBIT</Text>
            </View>
            <View style={{width: '100%', marginBottom: RFValue(50)}}>
                <TextInput style={styles.input} value={accessKey} onChangeText={setAccessKey} placeholder="Access Key" placeholderTextColor="#CCCCCC" />
                <TextInput style={styles.input} value={secretKey} onChangeText={setSecretKey} placeholder="Secret Key" placeholderTextColor="#CCCCCC" />
                <View style={{height: 10}} />
                <Text style={styles.text}>자산조회, 주문조회, 주문하기 선택</Text>
                <Text style={styles.text}>IP주소: 123.123.123.123</Text>
            </View>
            <CustomButton
                text={'Key update'}
                onPress={updateKey}
                disabled={!(accessKey.length === 40 && secretKey.length === 40)}
                color={!(accessKey.length === 40 && secretKey.length === 40) ? '#D4D9F3' : '#1F3FDB'}
                textColor={!(accessKey.length === 40 && secretKey.length === 40) ? '#1F3FDB' : '#FFFFFF'}
            />

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
                        <Text>Upbit Key 등록이 완료되었습니다.</Text>
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
        alignItems: 'center',
        paddingHorizontal: RFValue(30),
        paddingTop: RFValue(30),
        backgroundColor: '#ffffff',
    },
    image: {
        width: RFValue(50),
        height: RFValue(50),
        resizeMode: 'contain',
    },
    name: {
        color: '#000000',
        fontSize: RFValue(18),
        marginLeft: RFValue(30),
    },
    input: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        paddingVertical: RFValue(15),
        paddingHorizontal: RFValue(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFValue(12),
        alignSelf: 'center',
        fontSize: RFValue(13),
        marginVertical: RFValue(5),
        color: '#777777',
    },
    text: {
        fontSize: 15,
        color: '#000000',
    },
});

export default AccountSetting;
