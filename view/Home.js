import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#F59BAD',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Home Screen</Text>

                <Button
                    title="Scan Items"
                    onPress={() => {
                        this.props.navigation.navigate('Barcode');
                    }}
                />

                <Button
                    title="Add Items"
                    onPress={() => {
                        this.props.navigation.navigate('Add');
                    }}
                />

                <Button
                    title="List Items"
                    onPress={() => {
                        this.props.navigation.navigate('List');
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FAD0D5'
    },
    title: {
        fontSize: 25,
        textAlign: 'center'
    },
    list: {
        fontSize: 14
    }
});