<template lang="html">
    <div class="form-add-content">
        <h1>Ajouter un film</h1>
        <hr>
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
                    label="Nom du film "
                    v-model="newFilm.nameFilm"
                    :rules="requiredRules"
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
                    :rules="requiredRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Nom du réalisteur "
                    v-model="newFilm.newReal.nomReal"
                    :rules="requiredRules"
                    required
            ></v-text-field>
            <v-text-field
                    label="Nationalité du réalisteur "
                    v-model="newFilm.newReal.nationaliteReal"
                    :rules="requiredRules"
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
            <v-text-field
                    name="synopsis"
                    label="Synopsis"
                    v-model="newFilm.synopsisFilm"
                    textarea
            ></v-text-field>
            Note du film
            <star-rating
                    v-model="newFilm.note"
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
        data: () => ({
            valid: true,
            newFilm : {
                nameFilm: '',
                anneeFilm: '',
                langueFilm: '',
                genreFilm: null,
                newReal : {
                    nomReal: '',
                    nationaliteReal: '',
                    naissanceReal: '',
                },
                synopsisFilm: '',
                note : 0,
                affiche : "/../../static/poster/no_poster.jpg"
            },
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
    }),

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    if (this.newFilm.synopsisFilm.length === 0) {
                        this.newFilm.synopsisFilm = "Aucun synopsis renseigné."
                    }
                    const movie = {
                        title: this.newFilm.nameFilm,
                        year: this.newFilm.anneeFilm,
                        lang: this.newFilm.langueFilm,
                        type: this.newFilm.genreFilm,
                        desc: this.newFilm.synopsisFilm,
                        note: this.newFilm.note,
                        poster_url: this.newFilm.affiche,
                    };

                    movie.real = {
                        name: this.newFilm.newReal.nomReal,
                        nationality: this.newFilm.newReal.nationaliteReal,
                        birth: this.newFilm.newReal.naissanceReal,
                    };

                    this.$store.dispatch('addMovie', movie).then(
                        () =>
                            this.$router.replace({path: '/'})
                    );
                }
            }
        }
    }
</script>

<style lang="css">
    .form-add-content hr {
        margin-bottom: 20px;
    }
</style>
