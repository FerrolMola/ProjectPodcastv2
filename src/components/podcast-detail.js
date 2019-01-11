import Podcast from './podcast-summary.js';
import { getPodcast } from '../api/api.js';

const PodcastDetail = {

	init(params) {
		return getPodcast(params.podcastId);
	},

	_getHtmlEpisodes(podcast){
		const episodesListHtml = [];

		podcast.episodes.forEach(episode => {
			const episodeHtml = `
                <tr class="podcast-episode-summary id="${episode.id}">
                    <td>
                        <a href="${`/podcast/${podcast.id}/episode/${episode.id}`}">${episode.episodeTitle}</a>
                    </td>
                    <td class="date">${episode.pubDate}</td>
                    <td class="duration">${episode.duration}</td>                                       
                </tr>`;
			episodesListHtml.push(episodeHtml);
		});

		return episodesListHtml;
	},

	getHtml(podcast){
		return `
            <div class="podcast-detail-page page-with-sidebar">
                ${Podcast.getHtml(podcast)}
                <section class="content-section">
                    <div class="section podcast-episodes-count">
                        <span>
                            Episodes: ${podcast.episodes.length}
                        </span>
                    </div>
                    <div class="section podcast-episodes">
                        <table class="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this._getHtmlEpisodes(podcast).join('')}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        `;        
	}
};

export default PodcastDetail;