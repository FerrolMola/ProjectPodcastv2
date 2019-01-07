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
				.catch(error => reject(error));
		}
	});
}

export function getPodcastFeedUrl(podcastId) {
	return new Promise((resolve, reject) => {

		// TODO: Revisar si response es vacio que pasa!!!
		fetch(CORS_PROXY + TOPPODCASTS_EPISODE_URL + podcastId)
			.then(response => {
				return response.json();
			})
			.then(response => {
				resolve(response.results[0].feedUrl);
			})
			.catch(reject);
	});
}

function _parseEpisodes(podcastDocument) {
	
	let numEpisode = 0,
		episodes = [];
	Array.from(podcastDocument.querySelectorAll('rss channel item'))
		.map(episode => {
			const titleEpisode = episode.querySelector('title').textContent,
				idEpisode = 'episode_' + numEpisode++,
				fechaPub = new Date(episode.querySelector('pubDate').textContent).toLocaleDateString(),
				dur = episode.querySelector('duration') ? episode.querySelector('duration').textContent: '-',
				mp3 = episode.querySelector('enclosure').getAttribute('url'),
				descripcionEpisode = episode.querySelector('description') ? episode.querySelector('description').textContent: '-';

			episodes.push(
				{
					titleEpisode,
					idEpisode,
					fechaPub,
					dur,
					mp3,
					descripcionEpisode
				}
			)
	})

	return episodes;
}

function _parsePodcast(podcast) {

	return {
		id: podcast.podcastId,
		titulo: podcast.name,
		author: podcast.author,
		description: podcast.description,
		img: podcast.img,		
	};
}

export function getPodcastEpisodes(podcastId) {
	return new Promise((resolve, reject) => {

		getPodcastFeedUrl(podcastId).then(feed => {
			fetch(CORS_PROXY + feed)
			.then(response => response.text())
			.then(response => {
				const data = (new window.DOMParser()).parseFromString(response, "text/xml")				
				resolve(_parseEpisodes(data));
			})
			.catch(error => reject(error));
		})	
	});
} 

export function getPodcast(id){

	return new Promise ((resolve, reject) => {

		const podcast = load('podcast_' + id, ONE_DAY);
		if (podcast.data) {
			resolve(podcast.data);
		}else{			
			Promise.all([getAllPodcasts(), getPodcastEpisodes(id)])
				.then(values => {
					const podcastFind = values[0].find(podcast => {
						return podcast.id === id;
					});
					const podcast = {
						..._parsePodcast(podcastFind),
						episodes: values[1]
					};
					save('podcast_' + id, podcast, ONE_DAY);
					resolve(podcast);
				})
				.catch(error => reject(error) );
			
		}
	});
}

