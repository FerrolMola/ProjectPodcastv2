import { render } from '../helper/helper.js';
import PodcastList from '../components/podcast-list.js';
import Episode from '../components/episode.js';
import Podcast from '../components/podcast.js';

const Router = {

    init() {
        document.addEventListener('click', event => {
            let element = event.target;

            while (element && element.tagName !== 'A') {
                element = element.parentNode;
            }

            if (element) {
                event.preventDefault();
                this.changeUrl(element.pathname);
            }
        });

        window.addEventListener('popstate', () => {
            this.changeUrl(window.location.pathname, true);
        });

        this.changeUrl(window.location.pathname);
    },
    changeUrl(url) {

        const patternPodcast = new RegExp(/^\/podcast\/(\d*)\/?$/),
            paramPodcast = url.match(patternPodcast),            
            patternEpisode = new RegExp(/^\/podcast\/(\d*)\/episode\/(.*)\/?$/),
            paramEpisode = url.match(patternEpisode),
            element = document.querySelector('.main-content'); // TODO: Revisar esto!!!
        let params, component;

        if (paramPodcast) {            
            component = Podcast;
            params = {
                podcastId: paramPodcast[1]
            };
        } else if (paramEpisode) {
            component = Episode;
            params = {
                podcastId: paramPodcast[1],
                epidoseId: paramEpisode[2]
            }
        } else {
            component = PodcastList;
        }
        component.init(params).then((context) => {
            render(component.getHtml(context), element);
            if (component.initEvents){
                component.initEvents();
            }
        });

        window.history.pushState(null, '', url);
    }

}
export default Router;