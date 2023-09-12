/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, Animated, Image, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getContent, postPublicKey} from '../../utils/api';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoaderAnimation from '../../components/LoaderAnimation';

const AccountSetting = () => {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const [accessKey, setAccessKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [IP, setIP] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getContents = async () => {
        try {
            const content = await getContent();
            setIP(content.find(item => item.text_id === 'AT03')?.text_contents);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

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

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            getContents();
        }, []),
    );

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
                {isLoading ? (
                    <LoaderAnimation />
                ) : (
                    <View>
                        <Text style={styles.text}>자산조회, 주문조회, 주문하기 선택</Text>
                        <Text style={styles.text}>IP주소 : {IP}</Text>
                    </View>
                )}
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
        fontFamily: 'NotoSansKR-Bold',
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
        fontSize: RFValue(15),
        color: '#000000',
    },
});

export default AccountSetting;
