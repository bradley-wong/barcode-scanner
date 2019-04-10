import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import BarcodeScanner from './view/BarcodeScanner';
import Home from './view/Home';
import AddItem from './view/AddItem';
import ListItemComp from './view/ListItemComp';
import Login from './view/Login'
import SearchItem from './view/SearchItem'
YellowBox.ignoreWarnings(['Setting a timer'])

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    Add: {
      screen: AddItem
    },
    List: {
      screen: ListItemComp
    },
    Barcode: {
      screen: BarcodeScanner
    },
    Search: {
      screen: SearchItem
    }
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}