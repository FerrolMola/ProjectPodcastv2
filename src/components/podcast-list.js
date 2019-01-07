import { getAllPodcasts } from '../api/api.js';
import { render } from '../helper/helper.js';

const PodcastList = {

    inputFilter: null,

    init() {                  
        let self = this;
        const promise = new Promise((resolve, reject) => {
            getAllPodcasts()
                .then(allPodcasts => {
                    self.podcastList = allPodcasts;
                    resolve({ podcasts: allPodcasts});
                })
                .catch(error => reject(error));
        });

        return promise;
    },

    _getPodcastsHtml(podcastList) {
        return podcastList.map(podcast => {
            return `
                    <div class="podcast-summary">
                        <div class="box">
                            <a href="/podcast/${podcast.id}">
                                <div class="box-icon">
                                    <img src=${podcast.img} alt=${podcast.name}>
                                </div>
                                <div class="info">
                                    <h4 class="text-center">${podcast.name}</h4>
                                    <p>
                                        <span class="text-center">
                                            <span>Author: </span>
                                            <span>${podcast.author}</span>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
        })
    },

    getHtml(podcastList) {
        return `
            <div class="podcasts-grid">
                <div class="filter">
                    <span class="badge">${podcastList.podcasts.length}</span>
                    <input type="text" name="filter-value" autoFocus
                        placeholder="Filter podcasts..." value="">
                </div>
                <div class="podcasts-list">
                    ${this._getPodcastsHtml(podcastList.podcasts)}
                </div>
            </div>
        `;        
    },   

    _renderPodcastList(podcastList) {
        const listElement = document.querySelector('.podcasts-list'), // TODO: Revisar esto!!!
            badgeElement = document.querySelector('.badge');
        render(this._getPodcastsHtml(podcastList.podcasts), listElement);
        badgeElement.innerHTML = podcastList.podcasts.length;
    },

    _filterPodcasts(valuesFilter) {        
        const filterList = this.podcastList.filter(podcast => {
            const regex = new RegExp(valuesFilter, 'gi');
            return podcast.name.match(regex) || podcast.author.match(regex);
        });
        this._renderPodcastList({podcasts: filterList}, valuesFilter);
    },

    initEvents() {
        this.inputFilter = document.querySelector('[name="filter-value"]');
        this.inputFilter.addEventListener("keyup", (event) => {
            this._filterPodcasts(event.target.value);
          });
    }
}

export default PodcastList;