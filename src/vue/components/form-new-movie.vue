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
            <div class="inline">
                Note du film :
                <star-rating
                        :value="newFilm.note"
                        v-model="newFilm.note"
                ></star-rating>
            </div>
            <div class="inline">
                Poster du film :
                <input name="file" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                <v-btn color="primary" class="black--text" @click="chooseFiles()"><v-icon>attach_file</v-icon></v-btn>
                <p><i id="fileName"></i></p>
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
        data: () => ({
            valid: true,
            file: "",
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
                note : 1,
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

                    let formData = new FormData();
                    formData.append('file', this.file);

                    this.$store.dispatch('addMovie', movie).then(
                        (movieWithId) => {
                            console.log(movieWithId);
                            formData.append('movieId', movieWithId.id);
                            this.$store.dispatch('uploadPoster', formData).then(
                                () =>
                                    this.$router.replace({path: '/'})
                            )
                        }
                    );
                }
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
                let fileName = (this.file)?this.file.name:"";
                document.getElementById("fileName").innerText = fileName;
            },
            chooseFiles() {
                document.getElementById("file").click();
            },
            search(e){
                axios.get("http://www.omdbapi.com/?apikey=thewdb&s=" + e.target.value)
                    .then(res => {
                        this.movies = res.data.Response ? res.data.Search : []
                        console.log("movies : ", this.movies)
                    })
                    .catch(err => {
                        console.log("error :", err)
                    })
            },
        }
    }
</script>

<style lang="css">
    .form-add-content hr {
        margin-bottom: 20px;
    }

    .inline {
        display: inline;
    }

    .form-add-content input[type="file"] {
        display: none;
    }
</style>
