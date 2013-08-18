//Skrevet async for å kunne byttes ut med lagring i database eller lignende (som mongoDb)
var fs = require("fs"),
    movies, 
    lastId = 0;

setMovies();

function setMovies(){
    var data = fs.readFileSync("repositories/movies.json");

    movies = JSON.parse(data);
    movies.forEach(function(movie){ 
        movie._id = ++lastId; 
        console.log(movie.lanseringsdato);
        movie.lanseringsdato = new Date(movie.lanseringsdato);
        console.log(movie.lanseringsdato);
    });
}

function getAll (callback) {
    if (movies) {
        callback(movies);
        return;
    }
    setMovies();

    callback(movies);    
}

function insert (movie, callback) {
        movie._id = ++lastId;
        movies.unshift(movie);
        callback(movie);    
}

function get (id, callback){
    if (!id) {
        callback();
    }
    var movie = movies.filter(function(movie){ return movie._id == id; });
    if (movie.length)  { 
        callback(movie[0]); 
    }
    else { 
        callback(); 
    }
}

function update(movie, callback) {
    if (!movie._id) { callback(); return; }

    for(var i = 0; i < movies.length; i++){
        if (movies[i]._id == movie._id){
            movies[i] = movie;
            callback(movie);
            return;
        }
    }
}

function removeAll(callback){
    movies = null;
    callback();
}

function remove(){
    // ikke implementert
}

module.exports = {
    get: get,
    getAll: getAll,
    insert: insert,
    update: update,
    removeAll: removeAll,
    remove: remove
};