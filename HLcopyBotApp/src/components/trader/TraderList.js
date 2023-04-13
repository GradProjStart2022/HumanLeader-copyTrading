import React, {useState} from 'react';
import {Text, View} from 'react-native';
import TraderItem from './TraderItem';
import {getTraders} from '../../utils/api';
import {getLeaders} from '../../utils/api';
import {useFocusEffect} from '@react-navigation/native';

const TraderList = () => {
    const [traderList, setTraderList] = useState(getTraders());
    const [leaderList, setLeaderList] = useState();

    const getLeaderList = async () => {
        try {
            const leader = await getLeaders();
            setLeaderList(leader);
        } catch (error) {
            console.error(error);
        }
    };

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getLeaderList();
    //     }, []),
    // );

    return (
        <View>
            {traderList.map(item => (
                <TraderItem key={item.LEADER_SEQ} item={item} />
            ))}
        </View>
    );
};
export default TraderList;
