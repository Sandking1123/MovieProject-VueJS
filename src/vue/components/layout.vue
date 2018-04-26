<template>
  <v-app>
    <v-layout wrap style="height: 200px;">
      <v-navigation-drawer
              fixed
              clipped
              v-model="drawer"
              app
      >
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.href">
            <v-list-tile-content>
              <v-list-tile-title><v-icon>{{ item.icon }}</v-icon></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="toolbar" app fixed clipped-left>
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5"><img src="../../static/img/logo.png" style="width: 175px" /></span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content v-bind:class="screenSize">
        <v-container fluid fill-height>
          <v-layout justify-center>
            <v-flex class="main-flex">
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-layout>
  </v-app>
</template>

<script>
    export default {
        data () {
            return {
                drawer: null,
                items: [
                    { title: 'Les films', icon: 'movie', href: '/' },
                    { title: 'Ajouter un film', icon: 'add', href: '/add' }
                ]
            }
        },
        computed: {
            movies: function() {
                return this.$store.state.movies;
            },
            screenSize() {
                return this.$vuetify.breakpoint.mdAndDown ? 'movie-content-md' : 'movie-content';
            }
        }
    }
</script>

<style lang="css">
  .toolbar {
    color: #333333 !important;
  }

  .navigation-drawer {
    padding-bottom: 0 !important;
    width: 210px !important;
  }


  .navigation-drawer__border {
    display: inline;
  }

  .list{
    height: 100%;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;

  }

  .navigation-drawer>.list .list__tile {
    height: 100%;
    width: 100%;
  }

  .movie-content {
    padding: 64px 0px 0px 210px !important;
  }

  .movie-content-md {
    padding: 64px 0px 0px 135px !important;
  }

  .list>div  {
    height: 100% !important;
    width: 100% !important;
    text-align: center;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }

  .list--dense .list__tile .icon {
    font-size: 64px;
  }

  .list__tile__title {
    text-align: center;
    font-weight: 400;
    height: auto;
  }
  .list__tile__sub-title {
    text-align: center;
    font-weight: 400;
  }

  .main-flex {
    padding-left: 100px;
  }
</style>


