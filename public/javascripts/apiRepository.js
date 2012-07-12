var app = app || {};

app.apiRepository = (function ($) {

    function addImage(id, url){
        
    }

	function addNewMovie(movie) {
	    return $.post(app.settings.movieUrl, movie, "json");
	}

	function getMovies() {
		var url = app.settings.movieUrl;
		return jQuery.getJSON(url);
	}

	function init() {

	}

	return {
		init: init,
		addNewMovie: addNewMovie,
		getMovies: getMovies, 
        addImage: addImage
	};
} (jQuery));