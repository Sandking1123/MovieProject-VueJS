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
            <div class="inline">
                Note du film :
                <star-rating
                        :value="movie.note"
                        v-model="movie.note"
                ></star-rating>
            </div>
            <div class="inline">
                Poster du film :
                <v-btn color="primary" class="black--text"><v-icon>attach_file</v-icon></v-btn>
                <input name="file" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </div>
            <br>
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
                file: "",
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
                        poster_url: "/../../static/poster/no_poster.jpg",
                    };

                    movie.real = {
                        name: this.movie.real.name,
                        nationality: this.movie.real.nationality,
                        birth: this.movie.real.birth,
                    };

                    let formData = new FormData();
                    formData.append('file', this.file);
                    formData.append('movieId', movie.id);

                    this.$store.dispatch('editMovie', movie).then(
                        () =>
                            this.$store.dispatch('uploadPoster', formData).then(
                                () =>
                                    this.$router.replace({path: '/'})
                            )
                    );
                }
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }
        }
    }
</script>

<style lang="css">
    .form-edit-content hr {
        margin-bottom: 20px;
    }

    .inline {
        display: inline;
    }

    input[type="file"] {
    }
</style>
