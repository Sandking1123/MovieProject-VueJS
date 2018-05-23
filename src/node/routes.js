const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express();
const cors = require('cors');
const upload = multer({ dest: './src/static/poster/' });
const fs = require("fs");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded());
router.use('/static', express.static(path.join(__dirname + '/../static')));

//Movies examples
const movies = [
    {
        id: 0,
        title: "Avengers : Infinity War",
        real: {
            name: 'Joe Russo',
            nationality : 'Américain',
            birth : '08/07/1971'
        },
        note : "5",
        year : '2018',
        lang : 'Anglais',
        type : 'Aventure',
        desc : 'Despote craint dans tout l\'univers, père adoptif de Gamora et Nébula, Thanos a commencé à recueillir les six Pierres d\'Infinité : la Pierre du Pouvoir, la Pierre de l\'Espace, la Pierre de la Réalité, la Pierre de l\'Âme, la Pierre du Temps et la Pierre de l\'Esprit. Son objectif est de réunir ces six artefacts sur le Gant de l\'Infini, forgé jadis par le nain Eitri sur Nidavellir, afin d\'utiliser leur immense puissance pour détruire la moitié de la population de l\'Univers et rétablir ainsi un certain équilibre. Dans sa quête le menant sur diverses planètes, la Terre, Knowhere et Vormir, Thanos est aidé par ses enfants adoptifs : Cull Obsidian, Ebony Maw, Proxima Midnight et Corvus Glaive3. Face à cette nouvelle menace qui concerne l\'Univers entier, le groupe de super-héros des Avengers, divisé depuis 2 ans, doit se reformer, et s\'associer au Docteur Strange, aux Gardiens de la Galaxie et au peuple du Wakanda.',
        poster_url : '/../../static/poster/avengers.jpg'
    },
    {
        id: 1,
        title: "SOLO: A Star Wars Story",
        real: {
            name: 'Ron Howard',
            nationality : 'Américain',
            birth : '01/03/1954'
        },
        note : "4",
        year : '2018',
        lang : 'Anglais',
        type : 'Science Fiction',
        desc : 'Embarquez à bord du Faucon Millenium et partez à l’aventure en compagnie du plus célèbre vaurien de la galaxie. Au cours de périlleuses aventures dans les bas-fonds d’un monde criminel, Han Solo va faire la connaissance de son imposant futur copilote Chewbacca et croiser la route du charmant escroc Lando Calrissian… Ce voyage initiatique révèlera la personnalité d’un des héros les plus marquants de la saga Star Wars.',
        poster_url : '/../../static/poster/solo.jpg'
    },
    {
        id: 2,
        title: "Les Gardiens de la Galaxie 2",
        real: {
            name: 'James Gunn',
            nationality : 'Américain',
            birth : '05/08/1970'
        },
        note : "5",
        year : '2017',
        lang : 'Anglais',
        type : 'Science Fiction',
        desc : 'Musicalement accompagné de la "Awesome Mixtape n°2" (la musique qu\'écoute Star-Lord dans le film), Les Gardiens de la galaxie 2 poursuit les aventures de l\'équipe alors qu\'elle traverse les confins du cosmos. Les gardiens doivent combattre pour rester unis alors qu\'ils découvrent les mystères de la filiation de Peter Quill. Les vieux ennemis vont devenir de nouveaux alliés et des personnages bien connus des fans de comics vont venir aider nos héros et continuer à étendre l\'univers Marvel.',
        poster_url : '/../../static/poster/gardians.jpg'
    },
    {
        id: 3,
        title: "Deadpool 2",
        real: {
            name: 'David Leitch',
            nationality : 'Américain',
            birth : '21/11/1975'
        },
        note : "4",
        year : '2018',
        lang : 'Anglais',
        type : 'Action',
        desc : 'L’insolent mercenaire de Marvel remet le masque !\n' +
        'Plus grand, plus-mieux, et occasionnellement les fesses à l’air, il devra affronter un Super-Soldat dressé pour tuer, repenser l’amitié, la famille, et ce que signifie l’héroïsme – tout en bottant cinquante nuances de culs, car comme chacun sait, pour faire le Bien, il faut parfois se salir les doigts.',
        poster_url : '/../../static/poster/deadpool.jpg'
    },
    {
        id: 4,
        title: "Death Note",
        real: {
            name: 'Adam Wingard',
            nationality : 'Américain',
            birth : '03/12/1982'
        },
        note : "1",
        year : '2017',
        lang : 'Anglais',
        type : 'Fantastique',
        desc : 'Inspiré du célèbre manga japonais écrit par Tsugumi Ohba et illustré par Takeshi Obata, Death Note suit un lycéen qui trouve un carnet doté d\'un pouvoir surnaturel : quiconque le possède condamne à mort ceux dont il y inscrit le nom en pensant à leur visage. Enivré par un sentiment de toute-puissance quasi divine, le jeune homme commence à tuer ceux qu’il estime indignes de vivre.',
        poster_url : '/../../static/poster/deathnote.png'
    },
    {
        id: 5,
        title: "Venom",
        real: {
            name: 'Ruben Fleischer',
            nationality : 'Américain',
            birth : '31/10/1974'
        },
        note : "5",
        year : '2018',
        lang : 'Anglais',
        type : 'Science Fiction',
        desc : 'L\'histoire de Venom (Eddie Brock), l\'ennemi de Spider-Man, qui cherche inlassablement à se venger de l\'homme-araignée qui l\'a fait renvoyer du Daily Bugle.',
        poster_url : '/../../static/poster/venom.jpg'
    },
];
const type = upload.single('file');

router.get('/src/dist/build.js', (request, response) => {
    response.sendFile(path.join(__dirname + '/../dist/build.js'))
});

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/../../index.html'))
});

//Get all movies
router.get('/api/movies', (request, response) => {
    response.json(movies)
});

//Add
router.post('/api/movie', (request, response) => {
    let movie = request.body;
    let id = null;
    do {
        id = Math.random().toString(36).slice(2); //Génération d'un id aléatoire
    } while (movies.some(movie => movie.id === id));
    movie.id = id;
    movies.push(movie);
    response.status(200);
    response.json(movie);
});

//Remove a movie
router.put('/api/movie/:id', (request, response) => {
    let id = request.body.params.id;
    if(id !== -1) {
        movies.splice(id, 1);
        response.json(movies);
    } else {
        response.status(404);
        response.json({error: "DELETE : Movie not found."})
    }
});

//Edit
router.put('/api/movie/edit/:movie', (request, response) => {
    let movie = request.body;
    if(movies.findIndex(m => movie.id === m.id) !== -1) {
        movies.splice(movies.findIndex(m => movie.id === m.id), 1, movie);
        response.json(movies);
    } else {
        response.status(404);
        response.json({error: "EDIT : Movie not found."})
    }
});

//Upload poster
router.post('/api/upload', type, function (req, res, next) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        const extension = req.file.originalname.split(".").reverse()[0];
        const filename = req.file.originalname.split(".")[0] + "_" + req.body.movieId + "." + extension; //unicite de l'image grace à l'ID
        const newPath = req.file.destination + filename; //Nouveau nom

        let index = movies.findIndex(m => m.id == req.body.movieId);
        if(index !== -1) {
            movies[index].poster_url = "/../../static/poster/" + filename;
            fs.rename(req.file.path, newPath,
                err => {
                    if (err) {
                        throw (err);
                    }
                }
            );
            res.status(200);
            return res.send({
                success: true
            });
        }
        else {
            res.status(404);
            res.json({error: "UPLOAD POSTER : Movie not found."})
        }
    }
});

module.exports = router;