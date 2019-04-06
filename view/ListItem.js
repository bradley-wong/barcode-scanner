import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { db } from '../db';

let itemsRef = db.ref('/items');

export default class ListItem extends Component {

    static navigationOptions = {
        title: 'ListItem',
        headerStyle: {
            backgroundColor: '#F59BAD',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        items: []
    }

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            if (data != null || data != undefined) {
                let items = Object.values(data);
                this.setState({ items: [...new Set(items.map(item => item.name))].map(name => { return { name }; }) });
            }
        });
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>List Item</Text>
                <FlatList
                    data={this.state.items}
                    renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
                    keyExtractor={(item, index) => index.toString()}
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
    item: {
        fontSize: 24,
        textAlign: 'center'       
    }
});