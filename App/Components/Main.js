import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';

import api from '../utils/api';
import Dashboard from './Dashboard';


const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#48BBEC'
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#fff'

	},
	searchInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 8,
		color: 'white'

	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	}
});

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isLoading: false,
			error: false
		};
	}

	handleChange(event) {
		this.setState({
			username: event.nativeEvent.text
		});
	}

	handleSubmit(event) {
		this.setState({
			isLoading: true
		});

		api.getBio(this.state.username)
			.then( (response) => {
				if (response.message === 'Not found') {
					this.setState({
						isLoading: false,
						error: 'User not found'
					});
				} else {
					console.log(this.props);
					this.props.navigator.push({
						title: response.name || 'Select an option',
						component: Dashboard,
						passProps: { userInfo: response }
					});

					this.setState({
						isLoading: false,
						error: false,
						username: ''
					});
				}
			});
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}>Search for a GitHib user</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.username}
					onChange={this.handleChange.bind(this)} />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="white">
						<Text style={styles.buttonText}>SEARCH</Text>
				</TouchableHighlight>
			</View>
		);
	}
}
