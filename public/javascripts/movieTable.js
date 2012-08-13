/// <reference path="_references.js" />

var app = app || {};

app.movieTable = (function ($) {
    var _rowTemplate,
        _table;

    function loadMovies() {
        app.movieApi.getMovies()
            .fail(app.utils.logError)
            .done(addMoviesToTable)
            .done(app.messages.publishMoviesLoaded);
    }

    function addMoviesToTable(movies) {
        _table.find("tbody").empty();
        
        if (!movies || movies.length == 0)
            return;

        var source = _rowTemplate.html();
        var template = Handlebars.compile(source);
        Handlebars.registerHelper("convertDate", app.utils.convertToNorwegianDate);
        _table.find("tbody").append(template(movies));
    }

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