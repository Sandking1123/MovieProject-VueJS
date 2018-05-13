import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        movies: []
    },
    mutations: {
        displayMovies: (state, movies) => {
            state.movies = movies
        },
        addMovie: (state, movie) => {
            state.movies.push(movie)
        },
        removeMovie: (state, id) =>{
            state.movies.splice(id,1);
        },
        editMovie: (state, movie) =>{
           // state.movies.splice(movie.id,1, movie);
        }
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
           /* Axios.put('/api/movie/:id', {
                params: {
                    id: movie.id
                }
            })
                .then(response => {
                    context.commit('editMovie', movie)
                })*/
        }
    },
    getters: {
        getMovieById: (state) => (id) => {
            return state.movies.find(movie => movie.id === id)
        }
    }

});

export default store;