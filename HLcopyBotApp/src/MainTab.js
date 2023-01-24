import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import TraderListScreen from './screens/TraderListScreen';
import AlarmScreen from './screens/AlarmScreen';
import MyPageScreen from './screens/MyPageScreen';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{headerShown: false}}
            />
            <Tab.Screen
                name="Trader"
                component={TraderListScreen}
                options={{headerShown: false}}
            />
            <Tab.Screen
                name="Alarm"
                component={AlarmScreen}
                options={{headerShown: false}}
            />
            <Tab.Screen
                name="My"
                component={MyPageScreen}
                options={{headerShown: false}}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
