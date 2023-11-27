import './style.scss';

import * as bootstrap from 'bootstrap';
import { createApp } from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue';
import ToDo from './pages/ToDo.vue';
import Home from './pages/Home.vue';
import Clicker from './pages/Clicker.vue';
import GoogleMaps from './pages/GoogleMaps.vue';

const routes = [
    {path: '/', component: Home},
    {path: '/todo', component: ToDo},
    {path: '/Clicker', component: Clicker},
    {path: '/gmaps', component: GoogleMaps},
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');