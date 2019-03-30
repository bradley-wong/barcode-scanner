import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import { Camera } from "expo"
import BarcodeScannerExample from './components/BarcodeScanner';
import HomeScreen from './components/HomeScreen';
import SecondScreen from './components/SecondScreen';

const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Details: {
            screen: SecondScreen
        }
    },
    {
        initialRouteName: 'Home',
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