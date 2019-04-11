import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, TouchableHighlight, View, Text, Button } from 'react-native';
import { addItem } from '../service/MyServiceInterface';
import { db } from '../db';
import {
    encode,
    decode,
    encodeComponents,
    decodeComponents,
  } from 'firebase-encode';

let itemsRef = db.ref('/items');

export default class UpdateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      name: '',
      error: false,
      upc_type: '',
      barcode: '',
      price: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: 'UpdateItem',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount() {
    const { navigation } = this.props;
    console.log(navigation.getParam('user'))
    this.setState({ 
        user: navigation.getParam('user'), 
        barcode: navigation.getParam('barcode', '').toString(), 
        upc_type: navigation.getParam('upc_type', '').toString(),
        name: navigation.getParam('name', '').toString(),
        price: navigation.getParam('price', '')
     })
  }

  componentDidMount() {
    itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      if (data != null || data != undefined) {
        let items = Object.values(data);
        this.setState(items);
      }
    });
  }



  handleChange(e) {
    this.setState({
      name: e.nativeEvent.text
    });
  }

  handleSubmit(barcode, name, price, upc_type) {
    console.log(this.state.user, barcode, name, price, upc_type)
    addItem(this.state.user, barcode, name, price, upc_type);
    Alert.alert('Item saved successfully');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Update Item</Text>
        <View style={styles.input}>
          <Text>UPC-Type:</Text>
          <TextInput placeholder='UPC-Type'
            onChangeText={(text) => this.setState({ upc_type: text })}
            value={this.state.upc_type} />
        </View>
        <View style={styles.input}>
          <Text>Barcode:</Text>
          <TextInput placeholder='Barcode'
            onChangeText={(text) => {
              this.setState({ barcode: text })
              console.log(text)
            }}
            value={this.state.barcode} />
        </View>
        <View style={styles.input}>
          <Text>Item Name:</Text>
          <TextInput placeholder='Product-Name'
            onChangeText={(text) => this.setState({ name: text })}
            value={this.state.name}
          />
        </View>
        <View style={styles.input}>
          <Text>Item Price:</Text>
          <TextInput placeholder='Product-Price'
            onChangeText={(text) => this.setState({ price: text })}
            value={decode(this.state.price.toString())}
          />
        </View>
        <Button onPress={() => this.handleSubmit(this.state.barcode, this.state.name, this.state.price, this.state.upc_type)} title="Update"
          color="lavender" accessibilityLabel="Learn more about this purple button" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
