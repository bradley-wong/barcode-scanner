import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
    
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

    constructor(props) {
        super();
        this.state = {
            input: null,
            output: '',
            data: "nothing"
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Barcode')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAD0D5',
        alignItems: 'center',
        justifyContent: 'center',
    },
});