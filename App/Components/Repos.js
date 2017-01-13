import React, { Component } from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import Badge from './Badge';
import Separator from './Helpers/Separator';
import Web from './Helpers/WebView';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	rowContainer: {
		flex:1,
		flexDirection: 'column',
		padding: 10
	},
	name: {
		color: '#48BBEC',
		fontSize: 18,
		paddingBottom: 5
	},
	stars: {
		color: '#48BBEC',
		fontSize: 14,
		paddingBottom: 5
	},
	description: {
		fontSize: 14,
		paddingBottom: 5
	}
});

export default class Repos extends Component {
	truncateDescription(description) {
		return description.length > 100 ? `${description.slice(0, 99)}...` : description;
	}

	goToWebView(url, name) {
		this.props.navigator.push({
			title: name,
			component: Web,
			passProps: { url }
		});
	}

  render() {
		let repos = _.orderBy(this.props.repos, ['created_at'], ['desc']);
		let list = repos.map( (repo, index) => {
			let desc = repo.description ? this.truncateDescription(repo.description) : 'Repository doesn\'t have a description';
			return (
				<View key={index}>
					<View style={styles.rowContainer}>
						<TouchableHighlight
							onPress={this.goToWebView.bind(this, repo.html_url, repo.name)}
							underlayColor="transparent">
								<Text style={styles.name}> {repo.name} </Text>
						</TouchableHighlight>
						{ repo.stargazers_count > 0 &&
							<Text style={styles.stars}> Stars: {repo.stargazers_count} </Text>
						}
						<Text style={styles.description}> { desc } </Text>
					</View>
					<Separator />
				</View>
			);
		});

		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
					{ list }
			</ScrollView>
		);
  }
}

Repos.propTypes = {
  repos: React.PropTypes.array.isRequired,
  userInfo: React.PropTypes.object.isRequired
};


