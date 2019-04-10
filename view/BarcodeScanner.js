import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Camera, Permissions } from 'expo';

export default class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  static navigationOptions = {
    title: 'Barcode',
    headerStyle: {
      backgroundColor: '#F59BAD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    hasCameraPermission: null,
  }

  componentWillMount() {
    const { navigation } = this.props;
    console.log(navigation.getParam('user'))
    this.setState({ user: navigation.getParam('user') })

  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    // pausePreview();
    this.props.navigation.navigate('Add', { type, data })
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}
