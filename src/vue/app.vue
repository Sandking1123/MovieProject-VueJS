<template>
    <div>
        <layout></layout>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
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