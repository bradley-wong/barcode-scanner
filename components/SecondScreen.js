import React from 'react';
import { Keyboard } from 'react-native';
import { TextInput, TouchableHighlight, Modal, Image, Button, View, Text, StyleSheet } from 'react-native';

export default class SecondScreen extends React.Component {

    static navigationOptions = {
        title: 'Second Screen',
        headerStyle: {
            backgroundColor: '#778BBE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            upc_type: '',
            barcode: ''
        }
        this.buttonEvent = this.buttonEvent.bind(this);
    }

    buttonEvent(upc, barcode) {
        alert(`Bar code with type ${upc} and data ${barcode} has been scanned!`);
    }

    render() {
        const { navigation } = this.props;
        const someId = navigation.getParam('type', 'NO-ID');
        const someTitle = navigation.getParam('data', 'No code');
        return (
            <View style={styles.container}>
                <Text>Details Screen</Text>
                <Text>Type: {JSON.stringify(someId)}</Text>
                <Text>UPC: {JSON.stringify(someTitle)}</Text>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text>UPC-Type:</Text>
                        <TextInput placeholder='UPC-Type'
                            onChangeText={(text) => this.setState({upc_type: text})}
                            value={someId}/>
                    </View>
                    <View style={styles.input}>
                        <Text>Barcode:</Text>
                        <TextInput placeholder='Barcode'
                            onChangeText={(text) => this.setState({barcode: text})}
                            value={someTitle}/>
                    </View>
                    <Button onPress={() => this.buttonEvent(someId,someTitle)} title="Add to DB"
                        color="lavender" accessibilityLabel="Learn more about this purple button" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9EDEF9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: 'blue'
    },
    input: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff'
    }
});