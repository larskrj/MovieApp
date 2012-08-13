module.exports = function (app) {
    app.get('/filmer', movies);
}

function movies(req, res) {
    return res.render('movies', { title: 'Filmer' });
}