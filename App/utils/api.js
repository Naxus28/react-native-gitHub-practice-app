let api = {
	getBio(username) {
		let url = formatUsernameAndGetUrl(username, '', 'gitHub');
		return fetch(url).then( (res) => res.json());
	},
	getRepos(username) {
		let url = formatUsernameAndGetUrl(username, 'repos', 'gitHub');
		return fetch(url).then( (res) => res.json());
	},
	getNotes(username) {
		let url = formatUsernameAndGetUrl(username, 'repos', 'firebase');
		return fetch(url).then( (res) => res.json());
	},
	addNote(username, note) {
		let url = formatUsernameAndGetUrl(username, 'repos', 'firebase');
		let headerInfo = { method: 'post', body: JSON.stringify(note) };
		return fetch(url, headerInfo).then( (res) => res.json());
	}
};

let formatUsernameAndGetUrl = (username, urlString, platform) => {
	username = username.toLowerCase().trim();
	let gitHubUrl = urlString
				? `https://api.github.com/users/${username}/${urlString}`
				: `https://api.github.com/users/${username}`;

	let fireBaseUrl = `https://gituhub-notesaver.firebaseio.com/${username}.json`;
	let url = platform === 'gitHub' ? gitHubUrl : fireBaseUrl;

	return url;
};

export default api;
