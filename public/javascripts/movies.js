/// <reference path="_references.js" />

var app = app || {};

app.movies = (function ($) {
    function deleteMovies() {
        app.movieApi.deleteMovies().done(app.messages.publishMoviesUpdated);
    }
        
    function init(table, form, rowTemplate, deleteMoviesButton, imageDialog) {       
        
        app.movieTable.init(table, rowTemplate);
        
        app.movieForm.init(form);

        app.plugins.activateFormPlugins();
        app.imageDialog.init(imageDialog, table);

        deleteMoviesButton.click(deleteMovies);
                               
        $.subscribe(app.messages.moviesUpdated, app.movieTable.loadMovies);
        $.subscribe(app.messages.moviesLoaded, function () { app.plugins.activateTablePlugins(table); });                
    }

    return {
        init: init
    };
}(jQuery));