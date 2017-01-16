import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ScrollView,
  Alert,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';

import Badge from './Badge';
import Separator from './Helpers/Separator';
import api from '../utils/api';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	buttonText: {
		fontSize: 18,
		color: '#111'
	},
	button: {
		flex: 3,
		height: 60,
		backgroundColor: '#48BBEC',
		alignItems: 'center',
		justifyContent: 'center'
	},
	rowContainer: {
		padding: 10
	},
	searchInput: {
		height: 60,
		fontSize: 18,
		padding:10,
		color: '#111',
		flex:10
	},
	footerContainer: {
		backgroundColor: '#E3E3E3',
		alignItems: 'center',
		flexDirection: 'row'
	}
});

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
     dataSource: this.ds.cloneWithRows(this.props.notes),
     error: '',
     note: ''
   };
  }

  handleChange(event) {
		this.setState({
			note: event.nativeEvent.text
		});
  }

  handeSubmit() {
		let note = this.state.note;
		this.setState({
			note: ''
		});
		if (note) {
			api.addNote(this.props.userInfo.login, note)
			.then( () => {
				api.getNotes(this.props.userInfo.login)
				.then( (data) => {
					this.setState({
						dataSource: this.ds.cloneWithRows(data)
					});
				});
			}, (err) => {
				console.log('Request failed: ', err);
				this.setState({ err });
			});
		} else {
			Alert.alert(
				'Empty Notes',
				'Note cannot be empty',
			);
		}
  }

  renderRow(rowData) {
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text> {rowData} </Text>
				</View>
				<Separator />
			</View>
		);
  }

  footer() {
		return (
			<View style={styles.footerContainer}>
				<TextInput
					style={styles.searchInput}
					value={this.state.note}
					placeholder="New note"
					onChange={this.handleChange.bind(this)}
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handeSubmit.bind(this)}
					underlayColor="#88D4F5"
				>
						<Text style={styles.buttonText}>Submit</Text>
				</TouchableHighlight>
			</View>
		);
  }

  render() {
    return (
			<View style={styles.container}>
				<ListView
					enableEmptySections={true}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={() => <Badge userInfo={this.props.userInfo} />}
				/>
				<Separator />
					{this.footer()}
				<Separator />
			</View>
    );
  }
}

Notes.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	notes: React.PropTypes.object.isRequired
};
