/// <reference path="../libs/jquery-1.8.0.js" />
/// <reference path="../movieApi.js" />
/// <reference path="Libs/qunit.js" />
/// <reference path="Libs/sinon.js" />
/// <reference path="Libs/sinon-qunit.js" />

(function () {
    module("movieApi");

    var server;

    QUnit.testStart(function () {
        server = sinon.fakeServer.create();
        $("body").ajaxError(function (e, xhr, settings, exception) { console.log(exception); });
    });

    QUnit.testDone(function () {
        server.restore();        
    });     

    function setupServerForGetMovies(data) {
        app.settings = { movieUrl: "/api/movies" };

        server.respondWith(
            "GET",
            app.settings.movieUrl,
            [200, { "Content-Type": "application/json" }, JSON.stringify(data)]);

    }

    function _test() { }

    test("getMovies should get movies and use callback", function () {
        // Arrange        
        var data = [{ id: 12, title: "movie1" }],
            callback = sinon.spy();

        setupServerForGetMovies(data);

        // Act
        app.movieApi.getMovies(callback);
        server.respond();

        // Assert
        ok(callback.calledOnce, "Forventer ett kall, antall: " + callback.callCount);
        ok(callback.calledWith(data), "Forventer at filmer blir returnert");
    });

    test("getMovies should return deferred with movies", function () {
        // Arrange        
        var data = [{ id: 12, title: "movie1" }],
            callback = sinon.spy();

        setupServerForGetMovies(data);
       
        // Act
        app.movieApi.getMovies().done(callback);
        server.respond();
       
        // Assert
        ok(callback.calledOnce, "Forventer ett kall, antall: " + callback.callCount);
        ok(callback.calledWith(data), "Forventer at filmer blir returnert");
    });

    test("addNewMovie should post movie to server", function () {
        // Arrange        
        var data = { id: 13, title: "Film1" },
            spy = sinon.spy();

        app.settings = { movieUrl: "/api/movies" };
        var ajaxSpy = this.spy($, "ajax");

        // Act            
        app.movieApi.addNewMovie(data);

        // Assert
        equal(ajaxSpy.getCall(0).args[0].url, app.settings.movieUrl);
        equal(ajaxSpy.getCall(0).args[0].type, "post");
        deepEqual(ajaxSpy.getCall(0).args[0].data, data);
    });

    test("addImage should post data with expected url to server", function () {
        // Arrange        
        var data = { id: "12", url: "movie.jpg" };            
        var ajaxSpy = this.spy($, "ajax");

        app.settings = { imageUrl: "/api/movies/:id/images" };

        // Act                    
        app.movieApi.addImage(data.id, data.url, function () { });
        
        // Assert
        equal(ajaxSpy.getCall(0).args[0].url, "/api/movies/12/images");
        equal(ajaxSpy.getCall(0).args[0].type, "post");
        deepEqual(ajaxSpy.getCall(0).args[0].data, data);
    });

    test("addImage should call callback when server responds", function () {
        // Arrange        
        var data = { id: 12, url: "movie.jpg" },
            callback = sinon.spy();

        app.settings = { imageUrl: "/api/movies/:id/images" };

        server.respondWith(
            "POST",
            "/api/movies/12/images",
            [200, { "Content-Type": "application/json" }, "{}"]);

        // Act
        app.movieApi.addImage(data.id, data.url).done(callback);
        server.respond();

        // Assert
        ok(callback.calledOnce, "Forventer ett kall, antall: " + callback.callCount);        
    });
}());