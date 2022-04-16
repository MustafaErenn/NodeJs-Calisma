const express = require("express");
const app = express();

const movies = require("./movies");

const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {

    const baslik = "<h1>Routes</h1>\n";
    const get = "<p>GET  /movies -&gt; Kayıtlı Filmleri Getirir</p>\n";
    const get2 = "<p>GET  /movies/:id -&gt; Girilen id'li filmi getirir</p>\n";
    const post = "<p>POST  /movies/add -&gt; Film kaydeder.</p>\n";

    const result = baslik + get + get2 + post;
    res.send(result);
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


app.listen(port, () => {
    console.log("Server is running on " + port + " port");
});