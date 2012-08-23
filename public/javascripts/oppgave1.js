(function() {
    console.log("test");

    var film = {
        tittel: "En fin film",
        lanseringsdato: new Date(2011, 2, 12),
        regissor: { fornavn: "John", etternavn: "Doe" },
        bilder: ["http://blabla.com/bilde.jpg"],
        
        skrivUt: function () {
            console.log("tittel: " + this.tittel);
        }
    };
    var Person = function(fornavn, etternavn) {
        this.fornavn = fornavn;
        this.etternavn = etternavn;
    };
    var Film = function(tittel, lanseringsdato, regissor, bilder) {
        this.tittel = tittel;
        this.lanseringsdato = lanseringsdato;
        this.regissor = regissor;
        this.bilder = bilder;
    };

    var regissor1 = new Person("Hans", "Nilsen");
    var film2 = new Film("ny film", new Date(2012, 0, 1), regissor1, []);
    Film.prototype.skrivUt = film.skrivUt;
    film.skrivUt();
    film.skrivUt.apply(film2);

    setTimeout(function () { film2.skrivUt(); }, 2000);
    setTimeout(film2.skrivUt, 2000);
})();