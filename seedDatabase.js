var movieRepository = require("./repositories/movieRepository");

var defaultMovies = [
    { 
      "tittel": "The Shawshank Redemption",
      "regissor": "Frank Darabont",
      "lanseringsdato": 789346800000,      
      "bilder": ["http://ia.media-imdb.com/images/M/MV5BMTM0NjUxMDk5MF5BMl5BanBnXkFtZTcwNDMxNDY3Mw@@._V1._SX640_SY427_.jpg", "http://ia.media-imdb.com/images/M/MV5BMTMxNzAwMzE0Nl5BMl5BanBnXkFtZTcwNDQxNDY3Mw@@._V1._SX640_SY423_.jpg"]
    },
    { 
      "tittel": "The Godfather",
      "regissor": "Francis Ford Coppola",
      "lanseringsdato": 70239600000,      
      "bilder": ["http://ia.media-imdb.com/images/M/MV5BMjA0MDIwMDYwNl5BMl5BanBnXkFtZTcwMjY0Mzg4Mw@@._V1._SX640_SY474_.jpg"]
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
      "bilder": ["http://ia.media-imdb.com/images/M/MV5BMTQ5OTgxNDAxNF5BMl5BanBnXkFtZTcwODIxMzA4NA@@._V1._SX640_SY430_.jpg", "http://ia.media-imdb.com/images/M/MV5BMjA4OTkzNDMwMl5BMl5BanBnXkFtZTcwMDMxMzA4NA@@._V1._SX640_SY644_.jpg"]
    },
    { 
      "tittel": "Rise of the Planet of the Apes Poster \t",
      "regissor": "Rupert Wyatt",
      "lanseringsdato": 1313359200000,      
      "bilder": []
    }
];
function seed(i){
    i = i || 0;

    if (i < defaultMovies.length)
        movieRepository.insert(defaultMovies[i], function() { seed(i + 1); });            
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