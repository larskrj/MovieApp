/// <reference path="../libs/jquery-1.6.3.js" />
/// <reference path="Libs/qunit.js" />
/// <reference path="Libs/sinon.js" />
/// <reference path="../movieApi.js" />
/// <reference path="Libs/sinon-qunit.js" />

(function () {
    var abc = false;
    QUnit.begin(function () {
        abc = true;
    });

    module("movieApi");

    test("getMovies should return deferred with movies", function () {
        // Arrange
        var server = this.sandbox.useFakeServer();
        app.settings = { movieUrl: "/api/movies" };

        server.respondWith("GET", app.settings.movieUrl,
                       [200, { "Content-Type": "application/json" },
                        '[{ id: 12, title: "movie1" }]']);

        var callback = this.spy();

        // Act
        app.movieApi.getMovies(callback);//.done(callback);
        server.respond();
       
        // Assert
        ok(callback.calledOnce, "Ble ikke kalt en gang, antall: " + callback.callCount);
        ok(callback.calledWith([{ id: 12, title: "movie1" }]), "Ble ikke kalt med forventet resultat");
    });
}());