var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

var cpt=2;
var movies = [
    {
        "id":0,
        "title": "Star Wars I - La menace fantome",
        "years" : "1999",
        "language" : "Américan",
        "Director":{
            "name":"Georges Lucas",
            "nationality":"Américan",
            "birth": "17 août 1960"
        },
        "description":"Tout juste diplômé de l'université, Christopher McCandless, 22 ans, est promis à un brillant avenir. Pourtant, tournant le dos à l'existence confortable et sans surprise qui l'attend, le jeune homme décide de prendre la route en laissant tout derrière lui. Des champs de blé du Dakota aux flots tumultueux du Colorado, en passant par les communautés hippies de Californie, Christopher va rencontrer des personnages hauts en couleur. Chacun, à sa manière, va façonner sa vision de la vie et des autres. Au bout de son voyage, Christopher atteindra son but ultime en s'aventurant seul dans les étendues sauvages de l'Alaska pour vivre en totale communion avec la nature.",
        "picture":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTAwNDEyODU1MjheQTJeQWpwZ15BbWU2MDc3NDQwNw@@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        "id":1,
        "title": "American Sniper",
        "years" : "2015",
        "language" : "Américan",
        "Director":{
            "name":"Clint Eastwood",
            "nationality":"Américan",
            "birth": "31 mai 1930"
        },
        "description": "Tireur d'élite des Navy SEAL, Chris Kyle est envoyé en Irak dans un seul but : protéger ses camarades. Sa précision chirurgicale sauve d'innombrables vies humaines sur le champ de bataille et, tandis que les récits de ses exploits se multiplient, il décroche le surnom de 'La Légende'. Cependant, sa réputation se propage au-delà des lignes ennemies, si bien que sa tête est mise à prix et qu'il devient une cible privilégiée des insurgés. Malgré le danger, et l'angoisse dans laquelle vit sa famille, Chris participe à quatre batailles décisives parmi les plus terribles de la guerre en Irak, s'imposant ainsi comme l'incarnation vivante de la devise des SEAL : 'Pas de quartier !'' Mais en rentrant au pays, Chris prend conscience qu'il ne parvient pas à retrouver une vie normale.",
        "picture":"http://fr.web.img4.acsta.net/pictures/14/10/14/09/50/570218.jpg"
    }];

router.use('/static', express.static(path.join(__dirname + '/../static')));

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

//Add a movie
router.post('/api/movie', (request, response) => {
    var movie = request.body;
    movie.id = cpt;
    cpt++;
    movies.push(movie);
    response.json(movie);
});

//Remove a movie
router.put('/api/movie/:id', (request, response) => {
    var id = request.body.params.id;
    movies.splice(id,1);
});

module.exports = router;