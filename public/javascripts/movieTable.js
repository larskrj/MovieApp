/// <reference path="_references.js" />

var app = app || {};

app.movieTable = (function ($) {
    var _rowTemplate,
        _table;

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
            _table.find("tbody").append(lagTabellRad(movies[i]));
        }
        
        app.messages.publishMoviesLoaded();
    }

    function lagTabellRad(film) {
        return "<tr>" +                 
                 "<td>" + film.tittel + "</td>" +
                 "<td>" + film.regissor + "</td>" +
                 "<td>" + app.utils.convertToNorwegianDate(film.lanseringsdato) + "</td>" +
                 "<td>" + leggTilBilder(film) + "<input type='button' class='nyttBildeKnapp' value='+' data-film-id='" + film._id + "'/></td>" +
               "</tr>";
    };

    function leggTilBilder(film) {
        var bilder = "";

        $.each(film.bilder, function(i, bilde) {
            bilder += "<a class='lightbox' href='" + bilde + "'><img class='thumbnail' src='" + bilde + "'/></a>";
        });

        return bilder;
    };    
        
    function init(table, rowTemplate) {
        _table = table;
        _rowTemplate = rowTemplate;
        loadMovies();
    }

    return {
        init: init,
        loadMovies: loadMovies
    };
}(jQuery));