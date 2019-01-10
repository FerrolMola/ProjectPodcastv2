
import PodcastList from '../components/podcast-list.js';
import Episode from '../components/episode.js';
import PodcastDetail from '../components/podcast-detail.js';

const routes = [
	{ 
		path:  new RegExp(/^\/$/), 
		getParams: () => {},
		component: PodcastList
	},
	{ 
		path: new RegExp(/^\/podcast\/(\d*)\/?$/),
		getParams: params => ({
			podcastId: params[1]
		}),
		component: PodcastDetail 
	},
	{ 
		path: new RegExp(/^\/podcast\/(\d*)\/episode\/(.*)\/?$/), 
		getParams: params => ({
			podcastId: params[1],
			episodeId: params[2]
		}),
		component: Episode 
	}
];

export default routes;

