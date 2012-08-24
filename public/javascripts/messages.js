/// <reference path="libs/pubsub.js" />
var app = app || {};

(function () {
    "use strict";
    
    app.messages = {
        moviesUpdated: "moviesUpdated",
        publishMoviesUpdated: function () { PubSub.publish(app.messages.moviesUpdated); },

        moviesLoaded: "moviesLoaded",
        publishMoviesLoaded: function () { PubSub.publish(app.messages.moviesLoaded); },        
    };
    
})();