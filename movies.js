const fs = require("fs");


const getMovies = () => {
    const movies = loadMovies();
    return movies;
};

const getMovieById = (id) => {
    const movies = loadMovies();


    for (let index = 0; index < movies.length; index++) {
        if (movies[index].id == id) {
            return movies[index];
        }
    }

    return { "hata": "Film Bulunamadı!" };
};


const postMovie = (movie) => {
    const movies = loadMovies();

    const duplicateMovies = movies.filter((element) => {
        return element.name === movie.name
    });

    if (duplicateMovies.length != 0) {
        return { "hata": "Film daha önce kayıt edilmiş!" };
    }

    const newId = parseInt(movies[movies.length - 1].id) + 1;
    movie.id = newId;
    movies.push(movie);
    saveMovie(movies);
    return { "sonuc": movie.name + " filmi başarıyla kaydedildi" };
}


const saveMovie = (movies) => {
    const movieString = JSON.stringify(movies);
    fs.writeFileSync("movies.json", movieString);
};

const loadMovies = () => {
    try {
        const dataBuffer = fs.readFileSync("movies.json");
        const dataString = dataBuffer.toString();
        const dataObject = JSON.parse(dataBuffer);

        return dataObject;
    } catch (error) {
        return [];
    }
};


module.exports = {
    getMovies,
    getMovieById,
    postMovie
}