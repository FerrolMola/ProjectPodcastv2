import Router from './config/router.js';
import configRoutes from './config/config-routes.js';

function loading() {
    document.querySelector('.spinner').style.display = 'block';
}

function loaded() {
    document.querySelector('.spinner').style.display = 'none';
}

Router.init({
    configRoutes,
    mainElement: document.querySelector('.main-content'),
    loading,
    loaded
});
