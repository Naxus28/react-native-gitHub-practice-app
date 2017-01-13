import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	separator: {
		marginLeft: 15,
		height: 1,
		backgroundColor: '#E4E4E4'
	}
});

export default class Separator extends Component {
  render() {
    return (
      <View style={styles.separator} />
    );
  }
}
