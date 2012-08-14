/// <reference path="_references.js" />

var app = app || {};

app.movieApi = (function () {
    
    function getMovies(callback) {
        var url = app.settings.movieUrl;
        return $.getJSON(url, callback);
    }

    function getMovie(id, callback) {
        var url = app.settings.movieUrl + "/" + id;
        return $.getJSON(url, callback);
    }

	function addNewMovie(movie) {
	    return $.post(app.settings.movieUrl, movie, null, "json");
	}
    
	function deleteMovies() {
	    return $.ajax({ url: app.settings.movieUrl, type: "delete" });
	}
    
	function addImage(id, imageUrl, callback) {
	    var apiUrl = app.settings.imageUrl.replace(":id", id);
	    $.post(apiUrl, { id: id, url: imageUrl }, callback, "json");
	}

	return {
	    addNewMovie: addNewMovie,
	    getMovies: getMovies,
	    getMovie: getMovie,
		addImage: addImage,
        deleteMovies: deleteMovies
	};
}());