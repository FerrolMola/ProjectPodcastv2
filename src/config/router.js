import { render } from '../helpers/render.js';

const Router = {

	init(options) {
		document.addEventListener('click', event => {
			let element = event.target;

			while (element && element.tagName !== 'A') {
				element = element.parentNode;
			}

			if (element) {
				event.preventDefault();
				window.history.pushState(null, '', element.pathname);
				this.changeUrl(element.pathname, options);  
			}
		});

		window.addEventListener('popstate', () => {
			this.changeUrl(window.location.pathname, options);           
		});

		this.changeUrl(window.location.pathname, options);
	},


	changeUrl(url, options) {            
		const config = options.configRoutes.find((route) => route.path.test(url)),
			component = config.component;

		options.loading();
		component.init(config.getParams(url.match(config.path)))
			.then(context => {
				render(component.getHtml(context), options.mainElement);
				window.scrollTo(0, 0);
				options.loaded();
				if (component.initEvents){
					component.initEvents();
				}
			})
			.catch(error => {
				/*eslint no-console: ["error", {allow: ["error"]}]*/
				console.error('Se ha producido un error: ', error);
				options.error();
			});
	}

};

export default Router;