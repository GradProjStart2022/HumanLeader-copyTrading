import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigationBar from './BottomNavigationBar';
import AccountSetting from './Setting/AccountSetting';
import AlarmSetting from './Setting/AlarmSetting';
import SubscribeSetting from './Setting/SubscribeSetting';
import TraderDetailScreen from '../components/trader/TraderDetailScreen';
import Subscribe from '../components/subscribe/Subscribe';

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
                <RootStack.Screen name="AlarmSetting" options={{headerShown: false}} component={AlarmSetting} />
                <RootStack.Screen name="TraderDetail" options={{headerShown: false}} component={TraderDetailScreen} />
                <RootStack.Screen name="Subscribe" options={{headerShown: false}} component={Subscribe} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackScreen;
