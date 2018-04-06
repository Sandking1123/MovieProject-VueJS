import Vue from 'vue'
import app from './app.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import movies_store from './store.js'
import router from './routes.js'

Vue.use(Vuetify);

import 'vuetify/dist/vuetify.min.css'


new Vue({
    el: '#app',
    render: h => h(app),
    store: movies_store,
    router:router
});