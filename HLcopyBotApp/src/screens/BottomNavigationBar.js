import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainScreen from './HomeScreen';
import TraderListScreen from './TraderListScreen';
import AlarmScreen from './AlarmScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

const BottomNavigationBar = ({setIsLogin}) => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{showLable: false, activeTintColor: '#e7d6ff'}}>
            <Tab.Screen
                name="Home"
                component={MainScreen}
                options={{
                    tabBarIcon: ({color, size}) => <Icon name="home" size={size} color={color} />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Trader"
                component={TraderListScreen}
                options={{
                    tabBarIcon: ({color, size}) => <Icon name="person-pin" size={size} color={color} />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Alarm"
                component={AlarmScreen}
                options={{
                    tabBarIcon: ({color, size}) => <Icon name="notifications" size={size} color={color} />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Setting"
                options={{
                    tabBarIcon: ({color, size}) => <Icon name="settings" size={size} color={color} />,
                    headerShown: false,
                }}>
                {props => <SettingScreen {...props} setIsLogin={setIsLogin} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default BottomNavigationBar;
