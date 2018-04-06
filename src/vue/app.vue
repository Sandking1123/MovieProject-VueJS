<template>
    <div>
        <router-view></router-view>
        <movies-list></movies-list>
    </div>
</template>

<script>
    import MoviesList from "./components/movies-list";

    export default {
        components: {MoviesList},
        computed: {
            movies: function() {
                return this.$store.state.movies;
            }
        },
        mounted: function() {
            //this.$store.dispatch("displayMovies")
        }
    }
</script>

<style>
</style>