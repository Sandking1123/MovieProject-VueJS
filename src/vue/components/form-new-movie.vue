<template lang="html">
    <div class="form-add-content">
        <h1>Ajouter un film</h1>
        <hr>
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
                    label="Nom du film "
                    v-model="newFilm.nameFilm"
                    required
            ></v-text-field>
            <v-text-field
                    label="Année de sortie "
                    v-model="newFilm.anneeFilm"
                    :rules="anneeRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Langue "
                    v-model="newFilm.langueFilm"
                    required
            ></v-text-field>
            <v-text-field
                    label="Nom du réalisteur "
                    v-model="newFilm.newReal.nomReal"
                    required
            ></v-text-field>
            <v-text-field
                    label="Nationalité du réalisteur "
                    v-model="newFilm.newReal.nationaliteReal"
                    required
            ></v-text-field>
            <v-text-field
                    label="Date de naissance du réalisteur "
                    v-model="newFilm.newReal.naissanceReal"
                    :rules="naissanceRules"
                    required
            ></v-text-field>
            <v-select
                    label="Genre du film "
                    v-model="newFilm.genreFilm"
                    :items="items"
                    :rules="[v => !!v || 'Vous devez sélectionner un genre']"
                    required
            ></v-select>

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
        data: () => ({
            valid: true,
            newFilm : {
                "nameFilm": '',
                "anneeFilm": '',
                "langueFilm": '',
                "genreFilm": null,
                "newReal" : {
                    "nomReal": '',
                    "nationaliteReal": '',
                    "naissanceReal": '',
                },
            },
            items: [
                'Action',
                'Animation',
                'Aventure',
                'Biographique',
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
        }),

        methods: {
            submit() {
                const movie = {
                    title: this.newFilm.nameFilm,
                    year: this.newFilm.anneeFilm,
                    language: this.newFilm.langueFilm,
                    type: this.newFilm.genreFilm
                };

                movie.real = {
                    name: this.newFilm.newReal.nomReal,
                    nationality: this.newFilm.newReal.nationaliteReal,
                    birth: this.newFilm.newReal.naissanceReal,
                };

                console.log(movie);

                this.$store.dispatch('addMovie',movie).then(
                    () =>
                        this.$router.replace({ path: '/' })
                );
            }
        }
    }
</script>

<style lang="css">
    .form-add-content hr {
        margin-bottom: 65px;
    }
</style>
