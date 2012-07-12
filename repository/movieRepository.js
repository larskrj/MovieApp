var mongo = require("mongodb");
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("test", new mongo.Server(host, port, {}), {});

function insert(callback) {
	callback();
	//db.open(function(err, db) {
	//});
}

function get(callback) {
	db.open(function (err, db) {
		db.collection("movies", function (err2, collection) {
			collection.find().toArray(function (err3, results) {
				console.log(results);
				callback(results);
				db.close();
			});
		});
	});

	//return [{ title: "The Godfather III", director: "Coppola" }, { title: "Star Wars", director: "George Lucas" }];
};
exports.insert = insert;	
exports.get = get;
