import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import alarm from '../../../testdata/alram.json';
import Alarmitem from './Alarmitem';

const AlarmList = () => {
    const [isLoading, setIsLoading] = useState(true);
    // const [alarmList, setAlarmList] = useState();
    const alarmList = alarm;
    // const getLeaderList = async () => {
    //     try {
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setTimeout(() => {
    //             setIsLoading(false);
    //         }, 500);
    //     }
    // };

    // useFocusEffect(
    //     React.useCallback(() => {
    //         setIsLoading(true);
    //         getLeaderList();
    //     }, []),
    // );

    // return <View>{isLoading ? <LoaderAnimation /> : alarmList.map(item => <AlarmDetail key={item.ALARM_SEQ} item={item} />)}</View>;
    return (
        <ScrollView>
            {alarmList.map(item => (
                <Alarmitem key={item.ALARM_SEQ} item={item}></Alarmitem>
            ))}
        </ScrollView>
    );
};

export default AlarmList;
