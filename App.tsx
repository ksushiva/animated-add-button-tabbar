/* eslint-disable react/jsx-props-no-spreading */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import TabBar from './src/components/tab-bar';

const opacityTransition: object = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      delay: 10000,
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
  cardStyleInterpolator: ({ current } : {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};


type TabBarStackParamList = {
  Home: undefined,
  Settings: undefined,
}

type RootStackParamList = {
  TabBar: TabBarStackParamList,
  Modal: undefined,
}


const HomeScreen = () => (
  <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  </>
);
const SettingsScreen = () => (
  <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  </>
);

const ModalScreen = () => (
  <View style={{
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'navy',
  }}
  >
    <Text style={{ color: 'white' }}>Modal</Text>
  </View>
);

const TabBarStack = createBottomTabNavigator<TabBarStackParamList>();
const TabBarStackScreen = () => (
  <TabBarStack.Navigator tabBar={(props) => <TabBar {...props} />}>
    <TabBarStack.Screen name="Home" component={HomeScreen} />
    <TabBarStack.Screen name="Settings" component={SettingsScreen} />
  </TabBarStack.Navigator>
);

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <RootStack.Navigator headerMode="none" mode="modal" screenOptions={{ ...opacityTransition }}>
      <RootStack.Screen name="TabBar" component={TabBarStackScreen} />
      <RootStack.Screen name="Modal" component={ModalScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default App;
