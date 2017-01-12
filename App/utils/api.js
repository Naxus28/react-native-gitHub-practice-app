let api = {
	getBio(username) {
		return formatAndFetchUrl(username);
	},
	getRepos(username) {
		return formatAndFetchUrl(username, 'repos');
	}
};

let formatAndFetchUrl = (username, urlString = null) => {
	username = username.toLowerCase().trim();
	let url = `https://api.github.com/users/${username}`;

	if (urlString === 'repos') {
		url = `${url}/repos`;
	}
	return fetch(url).then( (res) => res.json());
};

export default api;
