import React, {useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import Alarmitem from './Alarmitem';
import {useFocusEffect} from '@react-navigation/native';
import {postAlarm} from '../../utils/api';
import LoaderAnimation from '../LoaderAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AlarmList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [alarmList, setAlarmList] = useState();
    const [refreshing, setRefreshing] = React.useState(false);

    const getAlarmList = async () => {
        try {
            const publicSeq = await AsyncStorage.getItem('publicSeq');
            const alarms = await postAlarm({PUBLIC_SEQ: publicSeq});
            setAlarmList(alarms);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAlarmList();
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            getAlarmList();
        }, []),
    );

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {isLoading ? <LoaderAnimation /> : alarmList.map(item => <Alarmitem key={item.ALARM_SEQ} item={item} />)}
        </ScrollView>
    );
};

export default AlarmList;
