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

function addMovie(req, res) {
    var movie = {
		title: req.body.title,
		director: req.body.director,       
        releasedate: getDateAsEpoch(req.body.releasedate),
        comment: req.body.comment,
        images: []
	};
    
    movieRepository.insert(movie, function(movies) {
        res.header('location', '/api/movies');
        return res.send(movies);
    });
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
