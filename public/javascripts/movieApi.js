/// <reference path="_references.js" />

var app = app || {};

app.movieApi = (function () {

    function addImage(id, url){
        return $.post(app.settings.imageUrl, { movieId: id, imageUrl: url } , "json");
    }

	function addNewMovie(movie) {
	    return $.post(app.settings.movieUrl, movie, "json");
	}

	function getMovies(callback) {
		var url = app.settings.movieUrl;
		return $.getJSON(url, callback);
	}

	function deleteMovies() {
	    return $.ajax({ url: app.settings.movieUrl, type: "delete" });
	}

	function init() {

	}

	return {
		init: init,
		addNewMovie: addNewMovie,
		getMovies: getMovies, 
		addImage: addImage,
        deleteMovies: deleteMovies
	};
} ());