import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
// import {Icon} from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Entypo';

const MenuButton = ({text, onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
            <Icon style={styles.icon} name={'chevron-thin-right'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        paddingHorizontal: RFValue(25),
        paddingVertical: RFValue(5),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderWidth: 2,
        borderColor: '#F0F0F0',
        marginBottom: 10,
    },
    icon: {
        fontSize: RFValue(15),
    },
    buttonText: {
        fontSize: RFValue(15),
        color: '#000000',
    },
});
export default MenuButton;
