import Podcast from './podcast.js';
import { getPodcastEpisode } from '../api/api.js';

const Episode = {

    init(params) {
        const promise = new Promise((resolve, reject) => {
            getPodcastEpisode(params.podcastId, params.episodeId)
                .then(podcast => {
                    resolve(podcast);
                })
                .catch(error => reject(error));
            });
    
        return promise;
    },

    getHtml(podcast){
        return `
            <div class="podcast-detail-page page-with-sidebar">
                ${Podcast.getHtml(podcast)}
                <section id="page_${podcast.episodes.idEpisode}" class="episode-detail-page page-with-sidebar">                   
                    <div class="content-section">
                        <div class="episode-detail section">
                            <div class="title">${podcast.episodes.titleEpisode}</div>
                            <div class="subtitle">${podcast.episodes.descripcionEpisode}</div>
                            <hr/>
                            <div class="player">
                                <audio src=${podcast.episodes.mp3} controls></audio>
                            </div>
                        </div>
                    </div>
                </section>
            <div>`;
    }
}

export default Episode;