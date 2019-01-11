import Router from './plugins/router.js';
import configRoutes from './config/config-routes.js';

function hideSpinner() {
	document.querySelector('.spinner').style.display = 'none';
}

function showSpinner() {
	document.querySelector('.spinner').style.display = 'block';
}

Router.init({
	configRoutes,
	mainElement: document.querySelector('.main-content'),
	loading: showSpinner,
	loaded: hideSpinner,
	error: hideSpinner
});
