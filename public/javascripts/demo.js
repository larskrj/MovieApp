$(function () {
    "use strict";

  /************
   * Funksjoner
   ************/
  // Funksjonsdeklarasjon
  function adder(a, b) {
      return a + b;
  }
  // En funksjon som tilordnes en variabel
  var a = function(){ return "Hei!"; };

    // Funksjonskall
  adder(2, 2);
  adder.call(this, 2, 2);

  // Funksjon som parametere
  function logger(f, a, b) {
      console.log(f(a, b));
  }

  // Funksjon med metode
  function f1() {}
  f.f2 = function() {return "HEI";};
  f.prop = "HOY";
  // f.f2()


  /*******
   * Scope
   *******/
  // Lokalt scope:
  function f2() {
      var lokalFunksjon = function() {
          return "Lokal pokal";
      };
  }
  // ... samme som
  function f3() {
      function lokalFunksjon() {
          return "Gjeddekaker";
      }
  }

  // Globalt scope
  function f4() {
      globalFunksjon = function() {
          return "GLOBAL";
      };
  }

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
    var f5 = function () {
        var v = "123";

        return function () {
            console.log(v);
        };
    };

    var f6 = f5();
    f6();

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

    // Object.create

    var personProto = { navn: function () { return this.fornavn + " " + this.etternavn; } };

    var person3 = Object.create(personProto);

    person3.fornavn = "Nils";
    person3.etternavn = "Pedersen";
    person3.navn();

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


    function feil(data) {
        console.log("feil: " + data);
    }

    function kallesAlltid(data) { console.log("always: " + data); }

    function suksess(data) {
        console.log("hentet filmer");
        //console.log(data);
        PubSub.publish(msg, [data]);
    }

     function skrivUtData(data){ console.log(data); }

    def.done(suksess)
        .always(kallesAlltid)
        .fail(feil);

    //def.reject("rejected");

    // PubSub
    var msg = "filmerHentet";
    PubSub.subscribe(msg, function () { console.log("Filmene er hentet"); });
    PubSub.subscribe(msg, skrivUtData);        
    //PubSub.publish(msg);

    //def.resolve("resolved");

    // Diverse
    new Date(); // Nå
    new Date(2013, 8, 4, 12, 15, 0) // Sep 04 2013 12:15:00
    new Date(1376812394117) // Sun Aug 18 2013 09:53:14 
    new Date(0) // Jan 01 1970 01:00:00

    var liste = ["en", "to", "tre"];
    console.log(liste.join("-")); // en-to-tre

    //window.setTimeout
    //window.location = "oppgave1.html"

    //"use strict";
    //ikkeDefinert = 1;


    console.log("1" == 1); // true
    console.log("1" === 1); // false
    console.log(0 == false); // true
    console.log(0 === false); // false

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
        //debugger;
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
