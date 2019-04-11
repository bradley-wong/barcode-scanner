import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { db } from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';


export default class ListItemComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      items: []
    }
  }

  static navigationOptions = {
    title: 'Favorites',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  componentWillMount() {
    const { navigation } = this.props;
    console.log(navigation.getParam('user'))
    this.setState({ user: navigation.getParam('user') })
  }

  componentDidMount() {
    console.log(this.state.user)
    db.ref(`accounts/${encode(this.state.user)}/barcodes`).on('value', (snapshot) => {
      this.setState({ items: (snapshot.val() == undefined) ? [] : Object.values(snapshot.val()) })
    })
  }

  render() {
    return (
      <View style={styles.main}>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <View style={styles.row}>
            <Text style={styles.title}>{decode(item.name.toString())}</Text>
            <Text style={styles.item}>Price: {decode(item.price.toString())}</Text>
            <Text style={styles.stat}>Barcode: {decode(item.barcode.toString())}</Text>
            <Text style={styles.stat}>UPC: {decode(item.upc.toString())}</Text>
            <Text style={styles.stat}>Last Modified: {new Date(item.date).toDateString()}</Text>
            <Button
              title="View item prices"
              onPress={() => this.props.navigation.push("Search", { user: this.state.user, barcode: item.barcode.toString() })} />
          </View>}
          keyExtractor={(item, index) => index.toString()} />
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
