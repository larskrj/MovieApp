/// <reference path="../../repositories/movieRepository.js" />

var movieRepository = require('../../repositories/movieRepository');
var seedDatabase = require('../../seedDatabase');

module.exports = function(app) {    
    app.get('/api/movies', getMovies);
    app.get('/api/movies/:id', getMovie);
    app.post('/api/movies', addMovie);
    app.del('/api/movies', deleteMovies);
    app.del('/api/movies/:id', deleteMovie);
    app.post('/api/movies/images', addImage);
}

function getMovies(req, res) {
    movieRepository.getAll(function(movies) {
        res.header('location', '/api/movies');
        return res.send(movies);
    });
}

function getMovie(req, res) {
    movieRepository.get(req.params.id, function (movie) {
        return res.send(movie);
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

    movieRepository.insert(movie, function(insertedMovie) {
        res.header('location', '/api/movies/' + insertedMovie._id);
        return res.send(insertedMovie);
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

function deleteMovie(req, res) {
    movieRepository.remove(req.params.id, function () {
        return res.send();
    });
}

function deleteMovies(req, res) {
    movieRepository.removeAll(function () {
        seedDatabase.seed(0, function () {
            return res.send();
        });
    });
}

function addImage(req, res){
    movieRepository.get(req.body.id, function (movie) {        
        movie.images[movie.images.length] = req.body.url;
        movieRepository.update(movie, function () { return res.send(); });
    });
}

