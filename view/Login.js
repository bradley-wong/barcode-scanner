import React, { Component } from 'react';
import { Alert, View, StyleSheet, Text, Button, TextInput, TouchableHighlight } from 'react-native';

import { db } from '../db';
import { registerAcc } from '../service/MyServiceInterface';


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePChange = this.handlePChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }


  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  handleChange(e) {
    console.log(this.state.name)
    this.setState({
      name: e.nativeEvent.text
    })
  }

  handlePChange(e) {
    console.log(this.state.password)
    this.setState({
      password: e.nativeEvent.text
    })
  }

  handleRegister() {
    registerAcc(this.state.name, this.state.password)
      .then(r => Alert.alert(r))
      .catch(e => Alert.alert(e))
  }

  handleLogin() {
    let accounts = db.ref('/accounts');
    accounts.on('value', (snapshot) => {
      let userdata = snapshot.val()[this.state.name]
      if (userdata) {
        if (userdata.password === this.state.password) {
          this.props.navigation.navigate('Home', { user: this.state.name });
        } else {
          Alert.alert('Invalid Login')
        }
      } else {
        Alert.alert('Invalid Login')
      }
    })
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Register/Log In</Text>
        <TextInput
          style={styles.itemInput}
          onChange={this.handleChange}
          placeholder="Username" />
        <TextInput
          style={styles.itemInput}
          onChange={this.handlePChange}
          placeholder="Password" />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleLogin} >
          <Text style={styles.title}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleRegister} >
          <Text style={styles.title}>Register</Text>
        </TouchableHighlight>
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
    color: "#111",
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
