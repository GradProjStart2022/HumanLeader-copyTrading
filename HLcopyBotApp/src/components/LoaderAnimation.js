import React from 'react';
import LottieView from 'lottie-react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, View} from 'react-native';

const LoaderAnimation = () => {
    return (
        <View style={styles.container}>
            <LottieView style={styles.lottie} source={require('./loader.json')} autoPlay loop />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    lottie: {
        justifyContent: 'center',
        marginVertical: RFValue(100),
        alignSelf: 'center',
        width: RFValue(50),
        height: RFValue(50),
    },
});

export default LoaderAnimation;
