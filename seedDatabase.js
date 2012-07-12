var movieRepository = require("./repository/movieRepository");

var defaultMovies = [
    { //"id": 1,
      "title": "The Shawshank Redemption",
      "director": "Frank Darabont",
      "releasedate": 789346800000,
      "comment": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. ",
      "images": ["http://ia.media-imdb.com/images/M/MV5BMTM0NjUxMDk5MF5BMl5BanBnXkFtZTcwNDMxNDY3Mw@@._V1._SX640_SY427_.jpg", "http://ia.media-imdb.com/images/M/MV5BMTMxNzAwMzE0Nl5BMl5BanBnXkFtZTcwNDQxNDY3Mw@@._V1._SX640_SY423_.jpg"]
    },
    { //"id": 2,
      "title": "The Godfather",
      "director": "Francis Ford Coppola",
      "releasedate": 70239600000,
      "comment": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. ",
      "images": ["http://ia.media-imdb.com/images/M/MV5BMjA0MDIwMDYwNl5BMl5BanBnXkFtZTcwMjY0Mzg4Mw@@._V1._SX640_SY474_.jpg"]
    },
    { //"id": 3, 
      "title": "Den gode, den onde og den grusomme",
      "director": "Sergio Leone",
      "releasedate": 16322400000,
      "comment": "", 
      "images": []
    },
    { //"id": 4,
      "title": "Star Wars",
      "director": "George Lucas",
      "releasedate": 231285600000,
      "comment": "",
      "images": ["http://ia.media-imdb.com/images/M/MV5BMTQ5OTgxNDAxNF5BMl5BanBnXkFtZTcwODIxMzA4NA@@._V1._SX640_SY430_.jpg", "http://ia.media-imdb.com/images/M/MV5BMjA4OTkzNDMwMl5BMl5BanBnXkFtZTcwMDMxMzA4NA@@._V1._SX640_SY644_.jpg"]
    },
    { //"id": 5,
      "title": "Rise of the Planet of the Apes Poster \t",
      "director": "Rupert Wyatt",
      "releasedate": 1313359200000,
      "comment": "", 
      "images": []
    }
];
function seed(i){
    if(i < defaultMovies.length)
        movieRepository.insert(defaultMovies[i], function() { seed(i + 1); });            
}

module.exports = function() {
    movieRepository.getAll(function(result) {        
        if(result.length == 0) {
            seed(0);
            console.log("seed database");
        }
    });
}