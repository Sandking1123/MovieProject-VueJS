<template lang="html">
    <div class="form-edit-content">
        <h1>Modification d'un film</h1>
        <hr>
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
                    label="Nom du film "
                    v-model="movie.title"
                    :rules="requiredRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Année de sortie "
                    v-model="movie.year"
                    :rules="anneeRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Langue "
                    v-model="movie.lang"
                    :rules="requiredRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Nom du réalisteur "
                    v-model="movie.real.name"
                    :rules="requiredRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Nationalité du réalisteur "
                    v-model="movie.real.nationality"
                    :rules="requiredRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Date de naissance du réalisteur "
                    v-model="movie.real.birth"
                    :rules="naissanceRules"
                    required
            ></v-text-field>
            <v-select
                    label="Genre du film "
                    v-model="movie.type"
                    :items="items"
                    :rules="[v => !!v || 'Vous devez sélectionner un genre']"
                    required
            ></v-select>
            <v-text-field
                    name="synopsis"
                    label="Synopsis"
                    v-model="movie.desc"
                    textarea
            ></v-text-field>
            Note du film
            <star-rating
                    :value="movie.note"
            ></star-rating>
            <v-btn
                    @click="submit"
                    :disabled="!valid"
            >
                Confirmer
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                valid: true,
                items: [
                    'Action',
                    'Animation',
                    'Aventure',
                    'Biographique',
                    'Fantastique',
                    'Comédie',
                ],
                naissanceRules: [
                    v => !!v || 'Le format de date doit être jj/mm/aaaa',
                    v => /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(v) || 'Le format de date doit être jj/mm/aaaa'
                ],
                anneeRules: [
                    v => !!v || "L'annee doit etre sur 4 chiffres !",
                    v => /[0-9]{4}/.test(v) || "L'annee doit etre sur 4 chiffres !"
                ],
                requiredRules: [
                    v => !!v || "Ce champ est requis.",
                ],
                affiche : "/../../static/poster/no_poster.jpg"
            }
        },

        computed: {
            movie: function() {
                return this.$store.getters.getMovieById(this.id)
            }
        },

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    if (this.movie.desc.length === 0) {
                        this.movie.desc = "Aucun synopsis renseigné."
                    }
                    const movie = {
                        id: this.movie.id,
                        title: this.movie.title,
                        year: this.movie.year,
                        lang: this.movie.lang,
                        type: this.movie.type,
                        desc: this.movie.desc,
                        note: this.movie.note,
                        poster_url: this.movie.affiche,
                    };

                    movie.real = {
                        name: this.movie.real.name,
                        nationality: this.movie.real.nationality,
                        birth: this.movie.real.birth,
                    };

                    this.$store.dispatch('editMovie', movie).then(
                        () =>
                            this.$router.replace({path: '/'})
                    );
                }
            }
        }
    }
</script>

<style lang="css">
    .form-edit-content hr {
        margin-bottom: 20px;
    }
</style>
