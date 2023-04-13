import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './screens/HomeScreen';
import TraderListScreen from './screens/TraderListScreen';
import AlarmScreen from './screens/AlarmScreen';
import SettingScreen from './screens/SettingScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{showLable: false, activeTintColor: '#e7d6ff'}}>
            <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Trader"
                component={TraderListScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="person-pin" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Alarm"
                component={AlarmScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="notifications" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="settings" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
