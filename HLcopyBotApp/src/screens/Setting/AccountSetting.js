/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';

const AccountSetting = () => {
    const [accessKey, setAccessKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const updateKey = () => {
        console.log(accessKey);
        console.log(secretKey);
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
            </View>
            <CustomButton
                text={'Key update'}
                onPress={updateKey}
                disabled={!(accessKey.length == 40 && secretKey.length == 40)}
                color={!(accessKey.length == 40 && secretKey.length == 40) ? '#D4D9F3' : '#1F3FDB'}
                textColor={!(accessKey.length == 40 && secretKey.length == 40) ? '#1F3FDB' : '#FFFFFF'}
            />
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
});

export default AccountSetting;