/// <reference path="../../repositories/movieRepository.js" />

var movieRepository = require('../../repositories/movieRepository');
var seedDatabase = require('../../seedDatabase');

module.exports = function(app) {
    app.get('/api/movies/create', createDatabase);
    app.get('/api/movies', getMovies);
    app.post('/api/movies', addMovie);
    app.del('/api/movies', deleteMovies);
    app.post('/api/movies/images', addImage);
}

function createDatabase(req, res) {
    seedDatabase();
    setTimeout(function () { getMovies(req, res); }, 1000)
}

function getMovies(req, res) {
    movieRepository.getAll(function(movies) {
        res.header('location', '/api/movies');
        return res.send(movies);
    });
}

function getDateAsEpoch(dateString){
    var array = dateString.split("."),
        day,
        month,
        year;
    
    if(array.length == 3) {
        day = array[0];
        month = parseInt(array[1], 10) - 1;
        year = array[2];

        return (new Date(year, month, day)).getTime();
    }    
    return parseInt(dateString, 10);
}

function addMovie(req, res, next) {
    var movie = {
		tittel: req.body.tittel,
		regissor: req.body.regissor,       
        lanseringsdato: getDateAsEpoch(req.body.lanseringsdato),
        kommentar: req.body.kommentar,
        bilder: []
	};
    
    if (validateMovie(movie) != "") {
        var err = new Error(validateMovie(movie));
        err.type = 'validation';
        next(err);
        return;
    }

    movieRepository.insert(movie, function(movies) {
        res.header('location', '/api/movies');
        return res.send(movies);
    });
}

function validateMovie(movie) {
    if (!movie.tittel)
        return "Mangler tittel";
        
    if (!movie.lanseringsdato)
        return "Mangler dato";

    if (movie.releasedate < new Date(1850, 0, 1).getTime() || new Date(movie.releasedate).getFullYear() > new Date().getFullYear() + 2)
        return "Ugyldig dato";


    return "";
}

function deleteMovies(req, res) {
    movieRepository.removeAll(function () {
        return res.send();
    });
}

function addImage(req, res){
    movieRepository.get(req.body.id, function (movie) {        
        movie.images[movie.images.length] = req.body.url;
        movieRepository.update(movie, function () { return res.send(); });
    });
}

