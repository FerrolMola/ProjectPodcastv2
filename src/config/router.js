import { render } from '../helper/helper.js';
import PodcastList from '../components/podcast-list.js';
import Episode from '../components/episode.js';
import PodcastDetail from '../components/podcast-detail.js';

const Router = {

    init(args) {
        document.addEventListener('click', event => {
            let element = event.target;

            while (element && element.tagName !== 'A') {
                element = element.parentNode;
            }

            if (element) {
                event.preventDefault();
                window.history.pushState(null, '', element.pathname);
                this.changeUrl(element.pathname, args);                
            }
        });

        window.addEventListener('popstate', () => {
            this.changeUrl(window.location.pathname, args);
        });

        this.changeUrl(window.location.pathname, args);
    },

    changeUrl(url, args) {
        const patternPodcast = new RegExp(/^\/podcast\/(\d*)\/?$/),
            paramPodcast = url.match(patternPodcast),      // TODO: Revisar esto!!!      
            patternEpisode = new RegExp(/^\/podcast\/(\d*)\/episode\/(.*)\/?$/),
            paramEpisode = url.match(patternEpisode); // TODO: Revisar esto!!!
            
        let params, component;

        if (paramPodcast) {            
            component = PodcastDetail;
            params = {
                podcastId: paramPodcast[1]
            };
        } else if (paramEpisode) {
            component = Episode;
            params = {
                podcastId: paramEpisode[1],
                epidoseId: paramEpisode[2]
            }
        } else {
            component = PodcastList;
        }
        args.loading();
        component.init(params).then((context) => {
            render(component.getHtml(context), args.mainElement);
            args.loaded();
            if (component.initEvents){
                component.initEvents();
            }
        });        
    }

}
export default Router;