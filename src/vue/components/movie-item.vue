<template>
	<v-card color="cards" class="black--text">
		<v-container fluid grid-list-lg>
			<v-layout>
				<v-flex xs5>
					<v-card-media
							v-bind:src="movie.poster_url"
							height="200px"
							contain
					></v-card-media>
				</v-flex>
				<v-flex xs7>
					<div>
						<div class="headline">{{ cutLongtext }}</div>
						<div>Année de sortie : {{ movie.year }} </div>
						<div>Genre : {{ movie.type }} </div>
						<div>Langue : {{ movie.lang }} </div>
						<div>De {{ movie.real.name }} ({{movie.real.nationality}})</div>
						<star-rating :value="movie.note"></star-rating>
					</div>
				</v-flex>
			</v-layout>
		</v-container>
		<v-card-actions>
			<v-flex xs12>
				<router-link :to="{ name: 'movie', params: { id: movie.id }}" tag="span"><v-btn flat>Détails</v-btn></router-link>
				<router-link :to="{ name: 'edit', params: { id: movie.id }}" tag="span"><v-btn flat>Modifier</v-btn></router-link>
				<v-btn flat color="red" v-on:click="deletemovie(movie)">Supprimer</v-btn>
				<v-btn icon @click.native="show = !show"><v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon></v-btn>
			</v-flex>
		</v-card-actions>
		<v-slide-y-transition>
			<v-card-text v-show="show">
				{{movie.desc}}
			</v-card-text>
		</v-slide-y-transition>
	</v-card>
</template>

<script>
    export default {
        props: [ "movie" ],
        data: function(){
            return {
                show: false
            }
        },
        methods: {
            deletemovie: function(){
                this.$store.dispatch('deleteMovie', this.$store.state.movies.indexOf(this.movie));
                this.$router.replace({ path: '/' });
            }
        },
        computed : {
            cutLongtext() {
                return (this.movie.title.length >= 17)?this.movie.title.slice(0,16) + "...":this.movie.title;
            },
            cutLongtDesc() {
                return (this.movie.desc.length >= 100)?this.movie.title.slice(0,99) + "...":this.movie.desc;
            }
        }
    }

</script>

<style scoped>
	.card {
		margin:10px;
		width: 440px;
	}

	.card__actions .flex {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>