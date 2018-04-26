import Vue from 'vue'
import app from './app.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import store from './store.js'
import router from './routes.js'
import Layout from './components/layout.vue'
import MovieItem from './components/movie-item.vue'

Vue.use(Vuetify, {
    theme: {
        toolbar: "#FECC00",
    }
});

Vue.component('layout',Layout);
Vue.component('movie-item',MovieItem);

import 'vuetify/dist/vuetify.min.css'

new Vue({
    el: '#app',
    render: h => h(app),
    store,
    router:router
});