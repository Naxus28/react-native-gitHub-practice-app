import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 65,
		flexDirection: 'column'
	},
	image: {
		height: 350
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	}
});

export default class Dashboard extends Component{
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the dashboard</Text>
			</View>
		);
	}
}
