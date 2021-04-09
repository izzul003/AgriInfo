import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import store from './src/store'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Screens/Home'
import Detail from './src/Screens/Detail'
import Login from './src/Screens/Login'
import Splash from './src/Screens/Splash'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            options={{headerShown: false}}
            name="Splash"
            component={Splash}
          />
          <Stack.Screen 
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen 
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen 
            options={{headerShown: false}}
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
