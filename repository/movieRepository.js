var mongo = require("mongodb");
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("test", new mongo.Server(host, port, {}), {});

function get(id, callback){    
        db.open(function(err, db) {
            db.collection("movies", function(err2, collection) {
                collection.find().toArray(function(err3, results) {                    
                    db.close();
                    callback(results);                    
                });
            });
        });
    }

function getAll(callback){    
        db.open(function(err, db) {
            db.collection("movies", function(err2, collection) {
                collection.find().toArray(function(err3, results) {                    
                    db.close();
                    callback(results);                    
                });
            });
        });
    }

function insert(movie, callback) {
    db.open(function(err, db) {
        db.collection("movies", function(err2, collection) {
            console.log(movie);
            collection.insert(movie, { safe: true }, function(err, documents) {
                if(err) throw err;
                console.log('Document ID is: ' + documents[0]._id);
                movie.id = documents[0]._id;
                db.close();
                getAll(callback);
            });
        });
    });
}

function update(movie, callback) {
    
}

function removeAll(callback){
    db.open(function(err, db) {
            db.collection("movies", function(err2, collection) {
                collection.remove(function() {                    
                    db.close();
                    callback();                    
                });
            });
        });
}

exports.get = get;
exports.getAll = getAll;
exports.insert = insert;
exports.update = update;
exports.removeAll = removeAll;    

