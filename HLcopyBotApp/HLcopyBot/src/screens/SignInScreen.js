import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '../components/CustomButton';

const SignInScreen = ({navigation}) => {
    return (
        <View style={styles.block}>
            <TextInput style={styles.input} placeholder="이메일" />
            <TextInput style={styles.input} placeholder="비밀번호" />
            <CustomButton
                title={'로그인'}
                onPress={() => navigation.navigate('MainTab')}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 4,
        height: 48,
        width: 300,
        backgroundColor: 'white',
        marginBottom: 16,
    },
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 36,
    },
});
export default SignInScreen;
