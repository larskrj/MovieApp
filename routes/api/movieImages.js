var movieRepository = require('../../repositories/movieRepository');

module.exports = function (app) {
    app.post('/api/movies/:id/images', addImage);
}

function addImage(req, res) {
    movieRepository.get(req.params.id, function (movie) {
        movie.images[movie.images.length] = req.body.url;
        movieRepository.update(movie, function () { return res.send(); });
    });
}
