let api = {
	getBio(username) {
		return formatUsernameAndFetchUrl(username);
	},
	getRepos(username) {
		return formatUsernameAndFetchUrl(username, 'repos');
	}
};

let formatUsernameAndFetchUrl = (username, urlString = null) => {
	username = username.toLowerCase().trim();
	let url = `https://api.github.com/users/${username}`;

	if (urlString === 'repos') {
		url = `${url}/repos`;
	}
	return fetch(url).then( (res) => res.json());
};

export default api;
