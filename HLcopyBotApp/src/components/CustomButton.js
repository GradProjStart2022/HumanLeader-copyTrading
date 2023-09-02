/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomButton = ({text, color, textColor, width, onPress, disabled}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width: width ? width : '100%',
                    backgroundColor: color ? color : '#1F3FDB',
                    paddingVertical: width ? RFValue(11) : RFValue(15),
                },
            ]}
            onPress={onPress}
            disabled={disabled ? disabled : false}>
            <Text style={[styles.buttonText, {color: textColor ? textColor : '#FFFFFF'}]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: RFValue(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RFValue(12),
        marginVertical: RFValue(5),
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: RFValue(13),
    },
});

export default CustomButton;
