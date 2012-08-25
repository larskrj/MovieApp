$(function () {
    "use strict";

    // Objekter
    var person = {
        fornavn: "Gunnar",
        etternavn: "Nilsen",
        navn: function () { return this.fornavn + " " + this.etternavn; },
        logPerson: function () {
            console.log(this.navn());
        }
    };

    person.logPerson();
    person.alder = 24;
    person.alertNavnOgAlder = function () { alert(this.navn() + " - " + this.alder); };

    // Closure
    var f1 = function () {
        var v = "123";

        return function () {
            console.log(v);
        };
    };

    var f2 = f1();
    f2();

    // Callback
    setTimeout(function () { person.logPerson(); }, 2000);

    // Konstruktorfunksjon /protype

    var Person = function (fornavn, etternavn) {
        this.fornavn = fornavn;
        this.etternavn = etternavn;
    };

    Person.prototype.navn = person.navn;
    Person.prototype.logPerson = person.logPerson;

    var person2 = new Person("Harald", "Rex");
    person2.logPerson();

    // NameSpace
    var app = app || {};

    // Modul

    app.modul1 = (function ($, window, undefined) {
        function privatFunksjon() {
            return "privat";
        }

        function publicFunksjon() {
            return "public";
        }

        return {
            publicFunksjon: publicFunksjon
        };

    })(jQuery, window);

    app.modul1.publicFunksjon();
    console.log(app.modul1.publicFunksjon);
    console.log(app.modul1.privatFunksjon);

    // Deferred

    var def = $.getJSON("/api/movies");
    //var def = new $.Deferred(); // 

    def.done(suksess)
        .always(kallesAlltid)
        .fail(feil);

    function feil(data) {
        console.log("fail: " + data);
    }

    function kallesAlltid(data) { console.log("always: " + data); }

    function suksess(data) {
        console.log("done: " + data);
        PubSub.publish(msg);
    }


    //def.reject("rejected");

    // PubSub
    var msg = "filmerHentet";
    PubSub.subscribe(msg, function () { console.log("Filmene er hentet"); });
    //PubSub.publish(msg);

    //def.resolve("resolved");


    //----------------------------
    // jQuery
    var p = $("<p class='dynamisk'>Innhold som er lagt til fra JavaScript</p>");
    $("#content").html(p).append("<p>Nytt innhold</p>");

    var content = $("#content");
    content.find("p:first").css("color", "blue");
    $("div#content p").eq(1).addClass("error");

    var video = $("<video>");
    video.attr("src", "http://video-js.zencoder.com/oceans-clip.mp4");
    //content.append(video);
    //video.get(0).play();

    content.data("viktig-info", "123");
    console.log(content.data("viktig-info"));

    content.hide().fadeIn(5000);

    // Events
    $("#btn1").click(function () { alert("klikk"); });
    // on
    // one
    var mouseOver = function (e) {
        console.log("mouse over");
        console.log($(this).text());
        debugger;
    };

    content.find("p").one("mouseover", mouseOver);
    content.one("mouseover", "p", mouseOver);

    content.append("<p>Enda mer innhold</p>");

    $("button").trigger("click");

    // Ajax
    //$.getJSON("/api/movies", function (data) { console.log(data); });

    //$.ajax({
    //    url: "/api/movies",
    //    type: "PUT", // PUT feiler
    //    success: function (data) {
    //        console.log("success");
    //        console.log(data);},
    //    error: function (data) {
    //        console.log("feil");
    //        console.log(data);
    //    }
    //});
    // deferred =>

    var getMovies = $.ajax({
        url: "/api/movies",
        type: "PUT" // PUT feiler
    });

    getMovies.done(function (data) {
        console.log("success");
        console.log(data);
    })
        .error(function (data) {
            console.log("feil");
            console.log(data);
        });
});