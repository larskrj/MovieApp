module.exports = function(app) {
    app.get('/', index);
}

function index(req, res) {
    console.log("test av console.log");
    return res.render('index', { title: 'Filmer' });
}