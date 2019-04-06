import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, TouchableHighlight, View, Text, Button } from 'react-native';
import { addItem } from '../service/MyServiceInterface';
import { db } from '../db';

let itemsRef = db.ref('/items');

export default class AddItem extends Component {
    static navigationOptions = {
        title: 'AddItem',
        headerStyle: {
            backgroundColor: '#F59BAD',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            if (data != null || data != undefined) {
                let items = Object.values(data);
                this.setState(items);
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: false,
            upc_type: '',
            barcode: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.nativeEvent.text
        });
    }

    handleSubmit(upc_type, barcode, name) {
        addItem([upc_type, barcode, name]);
        Alert.alert('Item saved successfully');
    }

    render() {
        const { navigation } = this.props;
        const someId = navigation.getParam('type', 'NO-ID');
        const someTitle = navigation.getParam('data', 'No code');
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Add Item</Text>
                {/* <TextInput style={styles.itemInput} onChange={this.handleChange}/> */}
                    {/* <TouchableHighlight
                        style = {styles.button}
                        underlayColor = 'white'
                        onPress = {this.handleSubmit}
                        >
                        <Text style={styles.title}>Add</Text>
                        </TouchableHighlight> */}
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
                        <View style={styles.input}>
                            <Text>Barcode:</Text>
                            <TextInput placeholder='Product-Name'
                                onChangeText={(text) => this.setState({name: text})}
                            />
                        </View>
                        <Button onPress={() => this.handleSubmit(someId, someTitle, this.state.name)} title="Add to DB"
                            color="lavender" accessibilityLabel="Learn more about this purple button" />
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
    itemInput: {
        height: 50,
        padding: 4,
        marginTop: 10,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 8,
        marginBottom: 5,
        marginTop: 5,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});