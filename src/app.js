import Router from './config/router.js';

function loading(){
    document.querySelector('.spinner').style.display = 'block'; // TODO: Revisar repito selector.
}

function loaded(){
    document.querySelector('.spinner').style.display = 'none';
}

Router.init({
    mainElement: document.querySelector('.main-content'),
    loading,
    loaded
});
