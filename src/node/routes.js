const express = require('express');
const path = require('path');
const router = express();
const cors = require('cors');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded());
router.use('/static', express.static(path.join(__dirname + '/../static')));

var movies = [
    {
        id: 0,
        title: "Arnaud t'es beau comme un petit coquelicot tombé du ciel",
        real: {
            name: 'Geoges Lucas',
            nationality : 'Américain',
            birth : '21/11/1997'
        },
        note : "3",
        year : '1996',
        lang : 'Francais',
        type : 'Science Fiction',
        desc : 'Une petire description des famille voili voilou',
        poster_url : 'http://fr.web.img5.acsta.net/c_215_290/pictures/18/02/08/14/09/1688226.jpg'
    },
    {
        id: 1,
        title: "Arnaud t'es beau",
        real: {
            name: 'Geoges Lucas',
            nationality : 'Américain',
            birth : '21/11/1997'
        },
        note : "3",
        year : '1996',
        type : 'Science Fiction',
        desc : 'Une petire description des famille voili voilou',
        poster_url : 'http://fr.web.img5.acsta.net/c_215_290/pictures/18/02/08/14/09/1688226.jpg'
    },
    {
        id: 2,
        title: "Arnaud t'es beau",
        real: {
            name: 'Geoges Lucas',
            nationality : 'Américain',
            birth : '21/11/1997'
        },
        note : "3",
        year : '1996',
        type : 'Science Fiction',
        desc : 'Une petire description des famille voili voilou',
        poster_url : 'http://fr.web.img5.acsta.net/c_215_290/pictures/18/02/08/14/09/1688226.jpg'
    },
    {
        id: 3,
        title: "Arnaud t'es beau",
        real: {
            name: 'Geoges Lucas',
            nationality : 'Américain',
            birth : '21/11/1997'
        },
        note : "3",
        year : '1996',
        type : 'Science Fiction',
        desc : 'Une petire description des famille voili voilou',
        poster_url : 'http://fr.web.img5.acsta.net/c_215_290/pictures/18/02/08/14/09/1688226.jpg'
    },
    {
        id: 4,
        title: "Arnaud t'es beau",
        real: {
            name: 'Geoges Lucas',
            nationality : 'Américain',
            birth : '21/11/1997'
        },
        note : "3",
        year : '1996',
        type : 'Science Fiction',
        desc : 'Une petire description des famille voili voilou',
        poster_url : 'http://fr.web.img5.acsta.net/c_215_290/pictures/18/02/08/14/09/1688226.jpg'
    },
    {
        id: 5,
        title: "Arnaud t'es beau",
        real: {
            name: 'Geoges Lucas',
            nationality : 'Américain',
            birth : '21/11/1997'
        },
        note : "3",
        year : '1996',
        type : 'Science Fiction',
        desc : 'Une petire description des famille voili voilou',
        poster_url : 'http://fr.web.img5.acsta.net/c_215_290/pictures/18/02/08/14/09/1688226.jpg'
    },
    {
        id: 6,
        title: "Arnaud t'es beau",
        real: {
            name: 'Geoges Lucas',
            nationality : 'Américain',
            birth : '21/11/1997'
        },
        note : "3",
        year : '1996',
        type : 'Science Fiction',
        desc : 'Une petire description des famille voili voilou',
        poster_url : 'http://fr.web.img5.acsta.net/c_215_290/pictures/18/02/08/14/09/1688226.jpg'
    },
]

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
        id = Math.random().toString(36).slice(2);
    } while (movies.some(movie =>movie.id === id));
    movie.id = id;
    movies.push(movie);
    response.json(movie);
});

//Remove a movie
router.put('/api/movie/:id', (request, response) => {
    let id = request.body.params.id;
    movies.splice(id,1);
});

module.exports = router;