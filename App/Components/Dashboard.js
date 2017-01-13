import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableHighlight,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import Profile from './Profile';
import Repos from './Repos';
import api from '../utils/api';

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
	constructor() {
		super();
		this.state = {
			isLoading: false,
			error: false
		};
	}

	makeBackground(btn){
		let bgProps = {
			flex: 1,
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center'
		};

		if (btn === 'profile') {
			bgProps.backgroundColor = '#48BBEC';
		} else if (btn === 'repos') {
			bgProps.backgroundColor = '#E77AAe';
		} else {
			bgProps.backgroundColor = '#758BF4';
		}

		return bgProps;
	}

	goToProfile() {
		this.props.navigator.push({
			title: 'Profile',
			component: Profile,
			passProps: { userInfo: this.props.userInfo }
		});
	}

	goToRepos() {
		this.setState({
			isLoading: true
		});

		api.getRepos(this.props.userInfo.login)
			.then( (response) => {
				if (response.message && response.message.toLowerCase() === 'not found') {
					this.setState({
						isLoading: false,
						error: 'User not found'
					});
				} else {
					this.props.navigator.push({
						title: 'Repos',
						component: Repos,
						passProps: {
							userInfo: this.props.userInfo,
							repos: response
						}
					});

					this.setState({
						isLoading: false,
						error: false
					});
				}
			});
	}

	goToNotes() {
		this.props.navigator.push({
			title: 'Notes',
			component: Notes,
			passProps: { userInfo: this.props.userInfo }
		});
	}

	render() {
		let { avatar_url } = this.props.userInfo;
		return (
			<View style={styles.container}>
				<Image source={{uri: avatar_url}} style={styles.image} />
				<TouchableHighlight
					style={this.makeBackground('profile')}
					onPress={this.goToProfile.bind(this)}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}> View Profile </Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground('repos')}
					onPress={this.goToRepos.bind(this)}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}> View Repos </Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground('notes')}
					onPress={this.goToNotes.bind(this)}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}> View Notes </Text>
				</TouchableHighlight>
				<ActivityIndicator
					animating={this.state.isLoading}
					color="#111"
					size="large"
				/>
				{ this.state.error &&
					<Text>{this.state.error}</Text>
				}
			</View>
		);
	}
}
