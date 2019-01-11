export function save(key, data, ttl) {
	const today = new Date(),
		podcasts = {
			data: data,
			expiration: today.getTime() + ttl * 1000,
		};

	localStorage.setItem(key, JSON.stringify(podcasts));
}

export function load(key) {
	const podcasts = JSON.parse(localStorage.getItem(key)),
		today = new Date();

	if (podcasts && podcasts.expiration && podcasts.expiration < today.getTime()){
		localStorage.removeItem(key);
		return null;
	}

	return podcasts && podcasts.data;
}

