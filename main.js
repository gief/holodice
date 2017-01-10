import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator
} from 'react-native';

import DiceScene from './DiceScene';
import AboutScene from './AboutScene';

class App extends React.Component {
  render() {
//  https://medium.com/the-react-native-log/implement-snapchat-like-swipe-navigation-declaratively-in-react-native-309e71229c89#.9gym4uhma

/*
  return (
      <View style={styles.container}>
      <Text style={styles.header}>Hi, how are you? Tell me!</Text>
<TextInput
          style={{height: 40, width:300}}
          placeholder="Text box"
          onChangeText={(text) => this.setState({text})}
        /></View>
    );
*/
  return (
    <DiceScene/>
/*
    <Navigator
      initialRoute={{title: 'Dice', index: 0}}
      renderScene={(route, navigator) => {
        <DiceScene
          title={route.title}
        />
      }}
    /> // close tag - Navigator
*/
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
header: {
    color: '#FFF',
}
});

Exponent.registerRootComponent(App);
