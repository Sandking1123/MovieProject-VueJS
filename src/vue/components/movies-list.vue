<template>
    <v-flex>
        <h1>Liste des films</h1>
        <hr>
        <br/>
        <div class="movies-list">
            <movie-item v-for="movie in movies" v-bind:movie="movie"></movie-item>
        </div>
    </v-flex>
</template>

<script>
    export default {
        data () {
            return { }
        },
        computed: {
            movies: function() {
                return this.$store.state.movies;
            }
        },
        mounted: function() {
            this.$store.dispatch("displayMovies")
        }
    }
</script>

<style lang="css">
    .movies-list {
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>


