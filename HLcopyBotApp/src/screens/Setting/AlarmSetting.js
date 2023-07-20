import React, {useState} from 'react';
import {Button, Linking, View} from 'react-native';

const AlarmSetting = () => {
    return (
        <View style={{flex: 1}}>
            <Button title="test" onPress={() => Linking.openSettings()} />
        </View>
    );
};

export default AlarmSetting;
