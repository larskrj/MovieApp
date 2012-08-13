/// <reference path="../libs/jquery-1.8.0.js" />
/// <reference path="../libs/handlebars.js" />

/// <reference path="../utils.js" />
/// <reference path="../movieTable.js" />
/// <reference path="../movieApi.js" />

/// <reference path="Libs/qunit.js" />
/// <reference path="Libs/sinon.js" />
/// <reference path="Libs/sinon-qunit.js" />

(function () {
    var abc = false;
    QUnit.begin(function () {
        abc = true;
        
        $("#qunit-fixture").append($("<div><table></table></div>"));
    });
    module("movieTable");

    QUnit.testStart(function () {        
        Handlebars.compile = sinon.stub();
        Handlebars.compile.returns(sinon.stub());
    });

    function _test() { }

    test("init should load movies from movieApi", function () {
        // Arrange
        var callback = this.spy();
        var dfd = new jQuery.Deferred();
        this.sandbox.stub(app.movieApi, "getMovies").returns(dfd);
        var testMovie = { id: 1, title: "movie1" };

        // Act
        app.movieTable.init($("table"), $("#template"));

        dfd.resolveWith(null, [testMovie]);
        // Assert
        ok(app.movieApi.getMovies.calledOnce, "Hentet ikke filmer fra api");
    });
}());