import React, { Component } from 'react';
import { StyleSheet, View, Text, Navigator } from 'react-native';

export default class AboutScene extends Component {
  static get defaultProps() {
    return {
      title: 'About'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>HoloDice by Gifford Cheung, 2016.</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#FFF',
  }
});
