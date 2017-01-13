import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableHighlight,
	StyleSheet
} from 'react-native';

import Profile from './Profile';

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
		this.props.navigator.push({
			title: 'Repos',
			component: Repos,
			passProps: { userInfo: this.props.userInfo }
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
			</View>
		);
	}
}
