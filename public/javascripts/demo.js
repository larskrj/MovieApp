$(function () {
    "use strict";
    // Funksjoner
    function summer(a, b) {
    	var sum = a + b; 
    	return sum;
    }
    
   
    
    //console.log(
    (function(a, b){
    	return a + b;
    })(2, 5)
    //);
    
    // ...Nestet funksjon
    function hei(navn) {
    	function skrivUt() {
    		console.log("HEI " + navn);
    	}
    	skrivUt();
    }
    
    // hei("Per");
    
    // .. Kan tilordnes variable
    var summer2 = function(a, b){
    	return a + b;
    };
    
    
    // ...Kan sendes som parametere
  	function logger(noe) {
    	console.log("LOGG: " + noe);
    };
	
    function summer3(a, b, loggFn) {
    	var sum = a + b;
	    loggFn(sum);
	};
	// console.log( summer3(2, 4, logger));
	
	// ...Kan ha properties og funksjoner
    summer4.sum = 0;
    summer4.skrivSum = function(tall) {
       	   console.log("Sum: " + tall);
  	};

   	function summer4(a, b) {
   	 summer4.sum = a + b; 
   	 summer4.skrivSum(summer4.sum);
   	}
   	
   	// summer4(4, 5);
   	// console.log(summer4.skrivSum);


   	// Scope
   	function testScope() {
        // Denne blir nå tilgjengeliggjort i globalt scope
        globalVariabel = "global";

        // Denne er bare tilgjengelig i funksjonen
        var lokalVariabel = "lokal";

        // Lager variabelen i i funksjonens scope, ikke løkkens scope
        for (var i = 0; i < 2; i++) {
          console.log(i);
        }

        // Variabelen i er allerede deklarert - kan gi uønskede effekter
        for (var i = 0; i < 2; i++) {
           console.log(i);
        }
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