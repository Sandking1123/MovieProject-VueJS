import Vue from 'vue'
import app from './app.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import movies_store from './store.js'
import router from './routes.js'
import Layout from './components/layout.vue'

Vue.use(Vuetify, {
    theme: {
        primary: "#FECC00",
        secondary: "#e57373",
        accent: "#9c27b0",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50"
    }
});

Vue.component('layout',Layout);

import 'vuetify/dist/vuetify.min.css'


new Vue({
    el: '#app',
    render: h => h(app),
    store: movies_store,
    router:router
});