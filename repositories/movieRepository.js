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
            var _id = getBsonId(id);
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
                collection.find().sort({ _id: 1 }).toArray(function (err3, results) {
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
                callback(movie);
            });
        });
    });
}

function update(movie, callback) {
    console.log(movie);

    db.open(function (err, db) {
        db.collection(collectionName, function (err2, collection) {
            var _id = movie._id;
            collection.update(
                { _id: _id },
                { $set: { bilder: movie.bilder } },
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

function remove(id, callback) {
    var _id = getBsonId(id);
    db.open(function (err, db) {
        db.collection(collectionName, function (err2, collection) {
            collection.remove({_id: _id }, function () {
                db.close();
                callback();
            });
        });
    });
}

function getBsonId(id){
    return new db.bson_serializer.ObjectID(id);
}

module.exports = {
    get: get,
    getAll: getAll,
    insert: insert,
    update: update,
    removeAll: removeAll,
    remove: remove
};

