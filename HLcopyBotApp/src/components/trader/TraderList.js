import React, {useState} from 'react';
import {View} from 'react-native';
import TraderItem from './TraderItem';
import {getLeader, getLeaders} from '../../utils/api';
import {useFocusEffect} from '@react-navigation/native';
import LoaderAnimation from '../LoaderAnimation';

const TraderList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [leaderList, setLeaderList] = useState();

    const getLeaderList = async () => {
        try {
            const leader = await getLeaders();
            setLeaderList(leader);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            getLeaderList();
        }, []),
    );

    return <View>{isLoading ? <LoaderAnimation /> : leaderList.map(item => <TraderItem key={item.LEADER_SEQ} item={item} />)}</View>;
};
export default TraderList;
