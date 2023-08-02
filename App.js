import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginComp from './comp/LoginComp';
import AssetsComp from './comp/AssetsComp'
import AssetComp from './comp/AssetComp';
import ADAssetsComp from './adminComp/ADAssetsComp';
import NavBarComp from './adminComp/NavBarComp';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import {LogBox} from "react-native";
export default function App() {


  // LogBox.ignoreLogs([
  // "ViewPropTypes will be removed",
  // "ColorPropType will be removed",
  // ])
  return (
    <Provider store={store}>

      <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginComp} />
          <Stack.Screen name="Assets" component={AssetsComp} />
          <Stack.Screen name="Asset" component={AssetComp} />
          <Stack.Screen name="navbar" component={NavBarComp} />


          {/* <Stack.Screen name="ADAsset" component={ADAssetsComp} /> */}

        </Stack.Navigator>

      <StatusBar style="dark" />


      </NavigationContainer >


    </Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aaa: {
    width: 400,
    height: 400,
    marginTop: -250,
  }
});
