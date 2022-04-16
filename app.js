const express = require("express");
const app = express();

const movies = require("./movies");


app.use(express.json());

// sayfamıza gelen istekleri aldıgımız fonk
app.get("/", (req, res) => {
    res.send("<h1>Ana sayfa</h1>");
});


app.get("/movies/:id?", (req, res) => {
    const filmId = req.params.id;
    if (filmId) {
        const movie = movies.getMovieById(filmId);
        res.send(movie);
    } else {
        const movieList = movies.getMovies();
        res.send(movieList);

    }
});


app.post("/movies/add", (req, res) => {
    const movie = req.body;
    const sonuc = movies.postMovie(movie);
    res.send(sonuc);
});


app.listen(3000, () => {
    console.log("Server is running on 3000 port");
});