import { save, load } from '../plugin/cache.js'
import { parseEpisodes, parsePodcast } from '../helpers/parser.js';

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
					data.feed.entry.forEach(podcast => {									
						podcastList.push(parsePodcast(podcast));
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

export function getPodcastEpisodes(podcastId) {
	return new Promise((resolve, reject) => {
		getPodcastFeedUrl(podcastId).then(feed => {
			fetch(CORS_PROXY + feed)
			.then(response => response.text())
			.then(response => {
				const data = (new window.DOMParser()).parseFromString(response, "text/xml")				
				resolve(parseEpisodes(data));
			})
			.catch(error => reject(error));
		})	
	});
} 

export function getPodcast(id) {
	return new Promise ((resolve, reject) => {
		const podcast = load('podcast_' + id, ONE_DAY);

		if (podcast.data) {
			resolve(podcast.data);
		} else {			
			Promise.all([getAllPodcasts(), getPodcastEpisodes(id)])
				.then(values => {
					const podcastFind = values[0].find(podcast => {
						return podcast.id === id;
					});
					const podcast = {
						...podcastFind,
						episodes: values[1]
					};
					save('podcast_' + id, podcast, ONE_DAY);
					resolve(podcast);
				})
				.catch(error => reject(error) );			
		}
	});
}

export function getPodcastEpisode(podcastId, episodeId){
	return new Promise ((resolve, reject) => {
		getPodcast(podcastId)
		.then(podcast => {                    
			const episodeFind = podcast.episodes.find(episode => {
				return episode.id === parseInt(episodeId, 10);
			});
			resolve({
				...podcast,
				episode: episodeFind
			});
		})
		.catch(error => reject(error));
	});
}

