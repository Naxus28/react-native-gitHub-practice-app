import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';


const styles = StyleSheet.create({
	container: {
		paddingBottom: 10,
		backgroundColor: '#48BBEC'
	},
	name: {
		marginBottom: 5,
		marginTop: 10,
		fontSize: 21,
		alignSelf: 'center',
		color: 'white'

	},
	handle: {
		alignSelf: 'center',
		fontSize: 16,
		color: 'white'

	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 65,
		marginTop: 10,
		alignSelf: 'center'
	}
});

export default class Badge extends Component {
	render() {
		let { avatar_url, name, login } = this.props.userInfo;

		return (
			<View style={styles.container}>
				<Image source={{uri: avatar_url}} style={styles.image} />
				<Text style={styles.name}> { name } </Text>
				<Text style={styles.handle}> { login } </Text>
			</View>
		);
	}
}

Badge.propTypes = {
	userInfo: React.PropTypes.object.isRequired
};

