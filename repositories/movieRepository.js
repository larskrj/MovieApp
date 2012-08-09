var mongo = require("mongodb");
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("test", new mongo.Server(host, port, {}), {});
var collectionName = "movies";

function get(id, callback){    
    if (!id) {
        callback();
    }
    db.open(function (err, db) {
        db.collection(collectionName, function (err2, collection) {
            var _id = new db.bson_serializer.ObjectID(id);
            collection.find({"_id" : _id }).toArray(function(err3, results) {                    
                db.close();
                callback(results[0]);                    
            });
        });
    });
}

function getAll(callback){    
        db.open(function(err, db) {
            db.collection(collectionName, function(err2, collection) {
                collection.find().toArray(function(err3, results) {                    
                    db.close();
                    callback(results);                    
                });
            });
        });
    }

function insert(movie, callback) {
    db.open(function(err, db) {
        db.collection(collectionName, function(err2, collection) {
            console.log(movie);
            collection.insert(movie, { safe: true }, function(err, documents) {
                if(err) throw err;
                console.log('Document ID is: ' + documents[0]._id);
                movie._id = documents[0]._id;
                db.close();
                callback([movie]);
            });
        });
    });
}

function update(movie, callback) {
    console.log(movie);

    db.open(function (err, db) {
        db.collection(collectionName, function (err2, collection) {
            var _id = movie._id;//new db.bson_serializer.ObjectID(movie._id);
            collection.update(
                { _id: _id },
                { $set: { images: movie.images } },
                { safe: true },
                function (err3) {                    
                    db.close();
                    callback(movie);
                });
        });
    });
}

function removeAll(callback){
    db.open(function(err, db) {
            db.collection(collectionName, function(err2, collection) {
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
