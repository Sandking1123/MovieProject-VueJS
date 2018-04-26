const express = require('express');
const path = require('path');
const router = express();
const cors = require('cors');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded());
router.use('/static', express.static(path.join(__dirname + '/../static')));


router.get('/src/dist/build.js', (request, response) => {
    response.sendFile(path.join(__dirname + '/../dist/build.js'))
});

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/../../index.html'))
});

//Get all movies
router.get('/api/movies', (request, response) => {
    response.json()
});

//Add a movie
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