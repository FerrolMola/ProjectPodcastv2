import Podcast from './podcast.js';
import { getPodcastEpisode } from '../api/api.js';

const Episode = {

    init(params) {
        return getPodcastEpisode(params.podcastId, params.episodeId);
    },

    getHtml(podcast){
        return `
            <div class="podcast-detail-page page-with-sidebar">
                ${Podcast.getHtml(podcast)}
                <section id="page_${podcast.episode.id}" class="episode-detail-page page-with-sidebar">                   
                    <div class="content-section">
                        <div class="episode-detail section">
                            <div class="title">${podcast.episode.episodeTitle}</div>
                            <div class="subtitle">${podcast.episode.episodeDescription}</div>
                            <hr/>
                            <div class="player">
                                <audio src=${podcast.episode.mp3} controls></audio>
                            </div>
                        </div>
                    </div>
                </section>
            <div>`;
    }
}

export default Episode;