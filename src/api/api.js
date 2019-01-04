import { save, load } from '../plugin/cache.js'

const TOPPODCASTS_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
	TOPPODCASTS_EPISODE_URL = 'https://itunes.apple.com/lookup?id=',
	CORS_PROXY = 'https://cors-anywhere.herokuapp.com/',
	ONE_DAY = 24 * 60 * 60;

export function getAllPodcasts() {
	return new Promise((resolve, reject) => {		
		const allPodcasts = load('podcasts', ONE_DAY);

		if (allPodcasts.data) {
			resolve(allPodcasts.data);
		} else {
			fetch(TOPPODCASTS_URL)
				.then(response => {
					return response.json();
				})
				.then((data) => {
					let podcastList = [];
					data.feed.entry.forEach(function (podcasts) {
						const podcast = {
							id: podcasts.id.attributes['im:id'],
							name: podcasts['im:name'].label,
							author: podcasts['im:artist'].label,
							description: podcasts['summary'] ? podcasts['summary'].label : 'Description not available',
							img: podcasts['im:image'].filter((imageData) => imageData.attributes.height === '170')[0].label
						}
						podcastList.push(podcast);
					});
					save('podcasts', podcastList, ONE_DAY);
					resolve(podcastList);
				})				
				.catch(reject);
		}
	});
}
