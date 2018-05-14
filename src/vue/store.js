import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        movies:  []
    },
    mutations: {
        displayMovies: (state, movies) => {
            state.movies = movies
        },
        addMovie: (state, movie) => {
            state.movies.push(movie)
        },
        removeMovie: (state, id) =>{
            if(id !== -1) //verification de l'existance du film
                state.movies.splice(id,1);
        },
        editMovie: (state, movie) =>{
            if(state.movies.findIndex(m => m.id === movie.id) !== -1) //verification de l'existance du film
                state.movies.splice(state.movies.findIndex(m => m.id === movie.id),1, movie);
        },
        uploadPoster: (state, file) =>{

        },
    },
    actions: {
        displayMovies (context) {
            Axios.get('/api/movies')
                .then(response => {
                    context.commit('displayMovies', response.data)
                })
        },
        addMovie (context, movie) {
            Axios.post('/api/movie', movie)
                .then(response => {
                    context.commit('addMovie', movie)
                })
        },
        removeMovie (context, id) {
            Axios.put('/api/movie/:id', {
                params: {
                    id: id
                }
            })
                .then(response => {
                    context.commit('removeMovie', id)
                })
        },
        editMovie (context, movie) {
            Axios.put('/api/movie/edit/:movie', movie)
                .then(response => {
                    context.commit('editMovie', movie)
                })
        },
        uploadPoster (context, file) {
            Axios.post('/api/upload', file)
                .then(response => {
                    context.commit('uploadPoster', file)
                })
        }
    },
    getters: {
        getMovieById: (state) => (id) => {
            return state.movies.find(movie => movie.id === id)
        }
    }

});

export default store;