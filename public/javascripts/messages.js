var app = app || {};

(function () {

    app.messages = {
        moviesUpdated: "moviesUpdated",
        publishMoviesUpdated: function () { $.publish(app.messages.moviesUpdated); },

        moviesLoaded: "moviesLoaded",
        publishMoviesLoaded: function () { $.publish(app.messages.moviesLoaded); },        
    };
    
})();