import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {LT_history, LT_info} from '../utils/api';

const TraderListScreen = () => {
    const [text, setText] = useState({});

    return (
        <View style={styles.block}>
            <View style={styles.textbox}>
                <Text style={styles.text2}>
                    {JSON.stringify(text).replace(/,/g, '\n')}
                </Text>
            </View>
            <View style={styles.button}>
                <Pressable
                    onPress={async () => {
                        const data = await LT_info();
                        setText(data);
                    }}
                    style={styles.item}>
                    <Text style={styles.text}>트레이더 정보 조회</Text>
                </Pressable>
            </View>
            <View style={styles.button}>
                <Pressable
                    onPress={async () => {
                        const data = await LT_history();
                        setText(data);
                    }}
                    style={styles.item}>
                    <Text style={styles.text}>트레이더 거래 기록 조회</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 0,
    },
    button: {
        width: '100%',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
        backgroundColor: '#e7d6ff',
        borderRadius: 20,
        marginBottom: 20,
    },
    textbox: {
        flex: 1,
        width: '100%',
        backgroundColor: '#404040',
        borderRadius: 20,
        marginBottom: 20,
        padding: 20,
    },
    text: {
        fontSize: 30,
        color: '#404040',
    },
    text2: {
        fontSize: 15,
        color: '#ffffff',
    },
});

export default TraderListScreen;
