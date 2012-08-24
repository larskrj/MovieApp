/// <reference path="_references.js" />

var app = app || {};

app.movieTable = (function ($) {
    "use strict";

    var _table;

    function loadMovies() {
        app.movieApi.getMovies()
            .fail(app.utils.logError)
            .done(addMoviesToTable);
    }

    function addMoviesToTable(movies) {
        var i;
        _table.find("tbody").empty();
        
        if (!movies || movies.length == 0)
            return;               
        
        for(i = 0; i < movies.length; i++) {
            _table.find("tbody").append(createTableRow(movies[i]));
        }
        
        app.messages.publishMoviesLoaded();
    }

    function createTableRow(movie) {
        return "<tr>" +                 
                 "<td>" + movie.tittel + "</td>" +
                 "<td>" + movie.regissor + "</td>" +
                 "<td>" + app.utils.convertToNorwegianDate(movie.lanseringsdato) + "</td>" +
                 "<td>" + addImages(movie) + "<input type='button' class='nyttBildeKnapp' value='+' data-film-id='" + movie._id + "'/></td>" +
               "</tr>";
    };

    function addImages(movie) {
        var images = "";

        $.each(movie.bilder, function(i, image) {
            images += "<a class='lightbox' href='" + image + "'><img class='thumbnail' src='" + image + "'/></a>";
        });

        return images;
    };    
        
    function init(table) {
        _table = table;        
        loadMovies();
    }

    return {
        init: init,
        loadMovies: loadMovies
    };
}(jQuery));