import Podcast from './podcast-summary.js';
import { getPodcastEpisode } from '../api/api.js';

const Episode = {

	init(params) {
		return getPodcastEpisode(params.podcastId, params.episodeId);
	},
	
	_getPlayerHtml(mp3) {		
		if (mp3) {
			return `
				<div class="player">
					<audio src=${mp3} controls></audio>
				</div>`;
		}

		return '';
	},

	getHtml(podcast){
		return `
			<div class="podcast-detail-page page-with-sidebar">
				${Podcast.getHtml(podcast)}                
				<div class="content-section">
					<section id="page_${podcast.episode.id}" class="episode-detail-page page-with-sidebar">                   
						<div class="episode-detail section">
							<div class="title">${podcast.episode.episodeTitle}</div>
							<div class="subtitle">${podcast.episode.episodeDescription}</div>
							<hr/>
							${this._getPlayerHtml(podcast.episode.mp3)}  
						</div>
					</section>
				</div>
			</div>`;
	}
};

export default Episode;