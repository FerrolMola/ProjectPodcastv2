import { getPodcast } from '../api/api.js';

const Podcast = {

    init(params) {
        const promise = new Promise((resolve, reject) => {
            getPodcast(params.podcastId)
                .then(podcast => {
                    resolve(podcast);
                })
                .catch(error => reject(error));
        });

        return promise;
    },

    _getHtmlEpisodes(podcast){
        const episodesListHtml = [];
        podcast.episodes.forEach(episode => {
            const episodeHtml = `
                <tr class="podcast-episode-summary id="${episode.idEpisode}">
                    <td>
                        <a href="${`/podcast/${podcast.id}/episode/${episode.idEpisode}`}">${episode.titleEpisode}</a>
                    </td>
                    <td>${episode.fechaPub}</td>
                    <td class="duration">${episode.dur}</td>                                       
                </tr>`;
            episodesListHtml.push(episodeHtml);
         });

         return episodesListHtml;
    },

    getHtml(podcast){
        return `
            <div class="podcast-detail-page page-with-sidebar">
                <section class="sidebar-section">
                    <div class="section sidebar">
                        <div class="podcast-cover text-center">
                            <a href="${`/podcast/${podcast.id}`}">
                                <img src="${podcast.img}" alt="${podcast.name}">
                            </a>
                        </div>
                        <hr/>
                        <div class="podcast-title">
                            <a href="${`/podcast/${podcast.id}`}">
                                <div class="title">${podcast.titulo}</div>
                                <div class="author"><span>by&nbsp;</span>${podcast.author}</div>
                            </a>
                        </div>
                        <hr/>
                        <div class="podcast-description">
                            <div>Description:</div>
                            <p>${podcast.description}</p>
                        </div>
                    </div>
                </section>
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
}

export default Podcast;