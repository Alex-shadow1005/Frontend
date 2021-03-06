const out = function (str) {
    console.log(str);
}

out('vi er igang med fetch movies');

const moviesUrl = 'http://localhost:8181/movies';

function fetchAllMovies() {
    out("get all film kaldt");
    return fetch(moviesUrl).then(response => response.json());
}

const movieMap = new Map();
async function createMovieMap() {
    out("show alle film");
    const movieList = await fetchAllMovies();
    movieList.forEach((movie) => {
        out(movie.movie_name);
        movieMap.set(movie.movie_name, movie);
    })
}

async function callMovieMap(){
    await createMovieMap();
}


callMovieMap();

const pbFetchMovies = document.getElementById('getMovies');
const tblMovies = document.getElementById('movieTable');


out(pbFetchMovies);

