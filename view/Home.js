import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

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


  componentWillMount() {
    const { navigation } = this.props;
    console.log(navigation.getParam('user'))
    this.setState({ user: navigation.getParam('user') })

  }

  render() {
    console.log('User:', this.state.user)
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Home Screen</Text>

        <Button
          title="Scan Items"
          onPress={() => {
            this.props.navigation.navigate('Barcode', { user: this.state.name });
          }}
        />

        <Button
          title="Add Items"
          onPress={() => {
            this.props.navigation.navigate('Add', { user: this.state.name });
          }}
        />

        <Button
          title="List Items"
          onPress={() => {
            this.props.navigation.navigate('List', { user: this.state.name });
          }}
        />
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
  list: {
    fontSize: 14
  }
});
