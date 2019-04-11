import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { db } from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';
import DialogInput from 'react-native-dialog-input';


export default class SearchItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      barcode: undefined,
      items: [],
      isDialogVisible: false
    }
  }


  static navigationOptions = {
    title: 'Price Check',
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
    console.log(navigation.getParam('user'), navigation.getParam('barcode'))
    this.setState({ user: navigation.getParam('user'), barcode: navigation.getParam('barcode') })
  }

  componentDidMount() {
    db.ref(`accounts/`).on('value', (snapshot) => {
      let items = []
      for (account of Object.values(snapshot.val())) {
        if (account.barcodes) {
          for (code of Object.values(account.barcodes)) {
            if (code.barcode == this.state.barcode) {
              items.push(code)
            }
         }
        }
      }


      this.setState({ items: items })


    })
  }

  render() {
    console.log(this.state.items)
    return (
      <View style={styles.main} >
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <View style={styles.row}>
            <Text style={styles.title}>Price: {decode(item.price.toString())}</Text>
            <Text style={styles.item}>Item Name: {decode(item.name.toString())}</Text>
            <Text style={styles.stat}>Last Modified: {new Date(item.date).toDateString()}</Text>
            <Button
              title="Update Price"
              onPress={() => {
                this.props.navigation.navigate('Update', { 
                  user: this.state.user,
                  barcode: item.barcode.toString(),
                  name: item.name, 
                  price: item.price,
                  upc_type: item.upc });
              }}
            />
          </View>}
          keyExtractor={(item, index) => index.toString()} /></View>
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
  row: {
    flex: 1,
    padding: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 4,
  },
  title: {
    fontSize: 25,
    textAlign: 'center'
  },
  item: {
    fontSize: 15,
    textAlign: 'center'
  },
  stat: {
    fontSize: 10,
    textAlign: 'center'
  }
});
