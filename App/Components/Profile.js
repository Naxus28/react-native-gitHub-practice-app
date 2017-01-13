import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

import Badge from './Badge';
import Separator from './Helpers/Separator';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	rowContainer: {
		flex:1,
		padding: 10
	},
	rowTitle: {
		color: '#48BBEC',
		fontSize: 16
	},
	rowContent: {
		fontSize: 19
	}
});

export default class Profile extends Component{
	formatTitle(topic) {
		var title = topic.includes('_') ? topic.replace('_', ' ') : topic;
		return title[0].toUpperCase() + title.slice(1);
	}

	render() {
		const topics = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
		let userInfo = this.props.userInfo;
		let list = topics.map( (topic, index) => {
			if (!userInfo[topic]) {
				return <View key={index} />;
			} else {
				return (
					<View key={index}>
						<View style={styles.rowContainer}>
							<Text style={styles.rowTitle}> {this.formatTitle(topic)}</Text>
							<Text style={styles.rowContent}> {userInfo[topic]} </Text>
						</View>
						<Separator />
					</View>
				);
			}
		});

		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={userInfo} />
				{ list }
			</ScrollView>
		);
	}
}
