/// <reference path="libs/jquery-1.8.0.js" />
/// <reference path="utils.js" />

(function () {
    "use strict";
    
    function skrivUt(tekst) {
        $("#content").append(tekst).append("<br />");
    }

    // Oppgave 1a
    skrivUt("Hallo World!");
    
    // Oppgave 1b
    var skrivUt2 = skrivUt;
    skrivUt2("Hallo fra skrivUt2!");
    
    // Oppgave 1c
    var film1 = {
        tittel: "Star Wars",
        lanseringsdato: new Date(1977, 4, 1),
        regissor: { fornavn: "George", etternavn: "Lucas" },
        bilder: ["images/StarWars1.jpg",
                 "images/StarWars2.jpg"],
        skrivUtFilm: function () {
            var i,
                filmInfoHtml = [
                "<h3>" + this.tittel + "</h3>",
                "<div>Lanseringsdato: " + app.utils.convertToNorwegianDate(this.lanseringsdato) + "</div>",
                "<div>Regissør: " + this.regissor.fornavn + " " + this.regissor.etternavn + "</div><div>"].join("");
            
            for (i = 0; i < this.bilder.length; i++) {
                filmInfoHtml += "<img src='" + this.bilder[i] + "' class='thumbnail' />";
            }
            filmInfoHtml += "</div>";
            
            skrivUt(filmInfoHtml);
        }
    };
    film1.skrivUtFilm();

    // Oppgave 1d
    var Film = function(tittel, lanseringsdato, regissor, bilder) {
        this.tittel = tittel;
        this.lanseringsdato = lanseringsdato;
        this.regissor = regissor;
        this.bilder = bilder;
    };

    
    var film2 = new Film("The Godfather", new Date(1972, 2, 24), { fornavn: "Francis Ford", etternavn: "Coppola" }, ["images/TheGodfather1.jpg"]);

    // Oppgave 1e
    film1.skrivUtFilm.apply(film2);

    // Oppgave 1f
    Film.prototype.skrivUtFilm = film1.skrivUtFilm;
    film2.skrivUtFilm();
    
    // Oppgave 1g
    setTimeout(function () { film1.skrivUtFilm(); }, 2000);
    
    // Oppgave 1h
    skrivUt("Dagens dato på norsk format: " + app.utils.convertToNorwegianDate(new Date()));
})();