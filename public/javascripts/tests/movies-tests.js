/// <reference path="../libs/jquery-1.8.0.js" />
/// <reference path="../libs/pubsub.js" />

/// <reference path="../movieTable.js" />
/// <reference path="../messages.js" />
/// <reference path="../utils.js" />
/// <reference path="../plugins.js" />
/// <reference path="../movieApi.js" />
/// <reference path="../movies.js" />

/// <reference path="Libs/qunit.js" />
/// <reference path="Libs/sinon.js" />
/// <reference path="Libs/sinon-qunit.js" />

(function () {
    QUnit.begin(function () {
    
                
    });
    module("movies");
    
    QUnit.testDone(function () {
        PubSub.unsubscribeAll();
    });

    function _test() { }

    function setUpStubs(sandbox) {
        sandbox.stub(app.movieTable, "init");
        sandbox.stub(app.movieForm, "init");
        sandbox.stub(app.imageDialog, "init");
        sandbox.stub(app.plugins, "activateDatePickerPlugin");
    }

    test("init should set up subscription for moviesUpdated", function () {
        // Arrange
        setUpStubs(this.sandbox);

        var loadMovieStub = this.sandbox.stub(app.movieTable, "loadMovies");
        
        // Act
        app.movies.init($("table"), $("form"), $("#delete"), $("#dialog"));
        app.messages.publishMoviesUpdated();
        
        // Assert
        ok(loadMovieStub.calledOnce, "Forventer ett kall, antall: " + loadMovieStub.callCount);
    });
}());