import React, {useState} from 'react';
import {Text, View} from 'react-native';
import SubscribeItem from './SubscribeItem';
import {getSubLeaders} from '../../utils/api';
import {useFocusEffect} from '@react-navigation/native';
import LoaderAnimation from '../LoaderAnimation';
import TraderItem from '../trader/TraderItem';

const SubscribeList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [leaderList, setLeaderList] = useState();

    const getLeaderList = async () => {
        try {
            const leader = await getSubLeaders();
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
    return <View>{isLoading ? <LoaderAnimation /> : leaderList.map(item => <SubscribeItem key={item.LEADER_SEQ} item={item} />)}</View>;
};

export default SubscribeList;
