import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigationBar from './BottomNavigationBar';
import AccountSetting from './Setting/AccountSetting';
import SubscribeSetting from './Setting/SubscribeSetting';
import LeaderDetailScreen from '../components/leader/LeaderDetailScreen';
import Subscribe from '../components/subscribe/Subscribe';
import AlarmDetail from '../components/Alarm/AlarmDetail';

const RootStack = createStackNavigator();

const RootStackScreen = ({setIsLogin}) => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{cardStyle: {backgroundColor: '#ffffff'}}}>
                <RootStack.Screen name="BottomNavigationBar" options={{headerShown: false}}>
                    {props => <BottomNavigationBar {...props} setIsLogin={setIsLogin} />}
                </RootStack.Screen>
                <RootStack.Screen name="AccountSetting" options={{headerShown: false}} component={AccountSetting} />
                <RootStack.Screen name="SubscribeSetting" options={{headerShown: false}} component={SubscribeSetting} />
                <RootStack.Screen name="LeaderDetail" options={{headerShown: false}} component={LeaderDetailScreen} />
                <RootStack.Screen name="AlarmDetail" options={{headerShown: false}} component={AlarmDetail} />
                <RootStack.Screen name="Subscribe" options={{headerShown: false}} component={Subscribe} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackScreen;
