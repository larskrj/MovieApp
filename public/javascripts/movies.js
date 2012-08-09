/// <reference path="_references.js" />

var app = app || {};

app.movies = (function ($) {
    var _rowTemplate,
        _table,
        _form;

    //table
    function loadMovies() {
        app.movieApi.getMovies()
            .fail(app.utils.logError)    
            .done(addMoviesToTable)
            .done(function () { app.plugins.activateTablePlugins(_table); });
    }

    function addMoviesToTable(movies) {
        _table.find("tbody").html("");

        if (!movies || movies.length == 0)
            return;

        var source = _rowTemplate.html();
        var template = Handlebars.compile(source);
        Handlebars.registerHelper("convertDate", app.utils.convertToNorwegianDate);
        _table.find("tbody").append(template(movies));
    }

    // form
    function saveMovie(event) {
        event.preventDefault();
        var saveButton = $(this);

        if (_form.validate().form()) {
            saveButton.attr("disabled", "disabled");

            app.movieApi.addNewMovie(_form.serialize())
                .fail(app.utils.logError)
                .done(addMoviesToTable)
                .done(function () { $("form").get(0).reset(); })
                .always(function () { saveButton.removeAttr("disabled"); });               
        }
    }

    function deleteMovies() {
        app.movieApi.deleteMovies()
            .done(loadMovies);
    }
        
    function init(table, form, rowTemplate, deleteMoviesButton) {
        _rowTemplate = rowTemplate;
        _table = table;
        _form = form;

        loadMovies();

        app.plugins.activateFormPlugins()
        
        deleteMoviesButton.click(deleteMovies);

        _form.find("input[type=submit]").click(saveMovie);

        app.imageDialog.init();
        $("input.tablefilter").get(0).focus();

        $.subscribe(app.messages.moviesUpdated, loadMovies);
    }

    return {
        init: init
    };
}(jQuery));