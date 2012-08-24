var app = app || {};

(function () {
    "use strict";
    
    app.messages = {
        moviesUpdated: "moviesUpdated",
        publishMoviesUpdated: function () { $.publish(app.messages.moviesUpdated); },

        moviesLoaded: "moviesLoaded",
        publishMoviesLoaded: function () { $.publish(app.messages.moviesLoaded); },        
    };
    
})();