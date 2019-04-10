import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import { Camera } from "expo"
import BarcodeScanner from './view/BarcodeScanner';
import Home from './view/Home';
import AddItem from './view/AddItem';
import ListItem from './view/ListItem';
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
      screen: ListItem
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
