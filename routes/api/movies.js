
var movieRepository = require('../../repository/movieRepository');

module.exports = function(app) {
    app.get('/api/movies', getMovies);
}

function getMovies(req, res) {
    movieRepository.get(function(movies) {
        res.header('location', '/api/movies');
        return res.send(movies);
    });
}