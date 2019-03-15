import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { Camera } from "expo"
import BarcodeScannerExample from './components/BarcodeScanner';

export default class App extends React.Component {
  render() {
    return (
      <BarcodeScannerExample />
      // <View style={styles.container}>
      //   <Camera
      //     ratio="16:9"
      //     style={{ flex: 1, justifyContent: "center" }}
      //     >
      //     <View style={{ flex: 1, justifyContent: "center" }}><Text>hello</Text></View>
      //   </Camera>
      // </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});