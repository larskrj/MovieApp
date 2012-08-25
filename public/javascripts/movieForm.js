/// <reference path="_references.js" />

var app = app || {};

app.movieForm = (function ($) {
    "use strict";

    var _form;
    
    function saveMovie(event) {
        event.preventDefault();
        var saveButton = _form.find("input[type=submit]");        

        if (_form.validate().form()) {
            saveButton.attr("disabled", "disabled");

            app.movieApi.addNewMovie(_form.serialize())
                .fail(app.utils.logError)                
                .done(function () { _form.get(0).reset(); })
                .done(app.messages.publishMoviesUpdated)
                .then(function () { saveButton.removeAttr("disabled"); });
        }
    }

    function init(form) {
        _form = form;

        _form.find("input[type=submit]").click(saveMovie);
    }

    return { init: init };
})(jQuery);