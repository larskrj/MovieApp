/// <reference path="../libs/jquery-1.6.3.js" />
/// <reference path="Libs/qunit.js" />
/// <reference path="Libs/sinon.js" />
/// <reference path="../utils.js" />
/// <reference path="../plugins.js" />
/// <reference path="../movieApi.js" />
/// <reference path="Libs/sinon-qunit.js" />

(function () {
    var abc = false;
    QUnit.begin(function () {
        abc = true;

        $("#qunit-fixture").append($("<div><input class='tablefilter' /></div>"));
    });

    module("movies");

    test("init should load movies from movieApi", function () {
        // Arrange
        var callback = this.spy();
        var myDeferred = { done: callback, fail: function () { } };
        this.sandbox.stub(app.movieApi, "getMovies").returns(myDeferred);
        var testMovie = { id: 1, title: "movie1" };
                
        // Act
        app.movies.init($("#table"), $("#form"), "template", $("#deleteButton"));
        
        // Assert
        ok(app.movieApi.getMovies.calledOnce, "Hentet ikke filmer fra api");
    });
}());