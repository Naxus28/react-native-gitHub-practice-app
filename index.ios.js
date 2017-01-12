/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';

import Main from './App/Components/Main';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

export default class ReactNativePractice extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'GitHub NoteTaker',
          component: Main
        }}
      />
    );
  }
}


AppRegistry.registerComponent('ReactNativePractice', () => ReactNativePractice);
