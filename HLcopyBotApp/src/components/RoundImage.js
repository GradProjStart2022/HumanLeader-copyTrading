import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const RoundImage = ({source, imageStyle}) => {
    return <Image style={[styles.image, imageStyle]} source={source} />;
};

const styles = StyleSheet.create({
    image: {
        width: RFValue(40),
        height: RFValue(40),
        margin: RFValue(15),
        marginLeft: RFValue(0),
        borderRadius: RFValue(100),
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#AAAAAA',
    },
});

export default RoundImage;
