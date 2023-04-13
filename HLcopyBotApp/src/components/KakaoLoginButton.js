import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import KakaoLoginSymbol from '../img/KakaoLoginSymbol.svg';

const KakaoLoginButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            {/* <KakaoLoginSymbol
                width={RFValue(15)}
                height={RFValue(15)}
                color={'#000000'}
            /> */}
            <Text style={styles.buttonText}>Continue with Kakao</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '80%',
        paddingVertical: RFValue(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFValue(12),
        backgroundColor: '#FEE500',
        flexDirection: 'row',
    },
    buttonText: {
        marginLeft: RFValue(4),
        fontFamily: 'NotoSansKR-Meduium',
        fontSize: RFValue(13),
        color: '#000000',
        opacity: 85,
    },
});

export default KakaoLoginButton;
