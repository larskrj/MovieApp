/// <reference path="_references.js" />

var app = app || {};

app.movies = (function ($) {
    function deleteMovies(e) {        
        if (confirm($(this).data("confirm-message")))
            app.movieApi.deleteMovies().done(app.messages.publishMoviesUpdated);
        
    }
        
    function init(table, form, deleteMoviesButton, imageDialog) {       
        
        app.movieTable.init(table);
        
        app.movieForm.init(form);

        app.plugins.activateDatePickerPlugin();
        app.imageDialog.init(imageDialog, table);

        deleteMoviesButton.click(deleteMovies);
                               
        $.subscribe(app.messages.moviesUpdated, app.movieTable.loadMovies);
        $.subscribe(app.messages.moviesLoaded, function () { app.plugins.activateLightBoxPlugin(table); });                
    }

    return {
        init: init
    };
}(jQuery));