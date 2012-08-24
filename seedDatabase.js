var movieRepository = require("./repositories/movieRepository");

var defaultMovies = [
    { 
      "tittel": "The Shawshank Redemption",
      "regissor": "Frank Darabont",
      "lanseringsdato": 789346800000,      
      "bilder": ["/images/TheShawshankRedemption1.jpg", "/images/TheShawshankRedemption2.jpg"]
    },
    { 
      "tittel": "The Godfather",
      "regissor": "Francis Ford Coppola",
      "lanseringsdato": 70239600000,      
      "bilder": ["/images/TheGodfather1.jpg"]
    },
    {  
      "tittel": "Den gode, den onde og den grusomme",
      "regissor": "Sergio Leone",
      "lanseringsdato": 16322400000,     
      "bilder": []
    },
    { 
      "tittel": "Star Wars",
      "regissor": "George Lucas",
      "lanseringsdato": 231285600000,    
      "bilder": ["/images/StarWars1.jpg", "/images/StarWars2.jpg"]
    },
    { 
      "tittel": "Rise of the Planet of the Apes Poster \t",
      "regissor": "Rupert Wyatt",
      "lanseringsdato": 1313359200000,      
      "bilder": []
    }
];
function seed(i, callback){
    i = i || 0;

    if (i < defaultMovies.length)
        movieRepository.insert(defaultMovies[i], function () { seed(i + 1, callback); });
    else
        if (callback)
            callback();
}

exports.seed = seed;

exports.seedIfEmpty = function() {
    movieRepository.getAll(function(result) {        
        if(result.length == 0) {
            seed();
            console.log("seed database");
        }
    });
}