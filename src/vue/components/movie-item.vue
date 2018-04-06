<template>
	<li @click="display_details=!display_details"><b>
		{{movie.title}}</b> ({{movie.date}}) - {{movie.real}}<br/>
		<span v-if="display_details">{{movie.desc}}<br>
        <button type="button" @click="edit"><i class="fa fa-edit">Editer</i></button>
         <button type="button" @click="remove"><i class="fa fa-trash">Supprimer</i></button></span>
	</li>
</template>

<script>
	export default {
		name: "movie-item",
		props: [ "movie" ],
		data: function(){
			return {
                display_details: false
			}
		},
		methods: {
			edit() {
				this.$emit('edit', this.movie)
			},
			remove() {
				this.$emit('remove', this.movie)
			}
		},
		mounted: function() {
			console.log("Mounted ", this.movie)
		}
	}

</script>

<style scoped>

</style>