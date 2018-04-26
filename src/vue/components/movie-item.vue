<template>
	<v-card color="grey" class="white--text">
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
					</div>
				</v-flex>
			</v-layout>
		</v-container>
		<v-card-actions>
			<v-flex xs12>
				<router-link :to="{ name: 'movie', params: { id: movie.id }}" tag="span"><v-btn flat>Détails</v-btn></router-link>
				<router-link :to="{ name: 'edit', params: { id: movie.id }}" tag="span"><v-btn flat>Modifier</v-btn></router-link>
				<v-btn flat color="red">Supprimer</v-btn>
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
        },
        computed : {
            cutLongtext() {
                return (this.movie.title.length >= 17)?this.movie.title.slice(0,16) + "...":this.movie.title;
            }
        }
    }

</script>

<style scoped>
	.card {
		margin:10px;
		width: 450px;
	}

	.card__actions .flex {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>