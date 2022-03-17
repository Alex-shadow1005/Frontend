const genresUrl = 'http://localhost:8181/genres';

const outerr = function (err, str) {
    out(err);
    alert("Der var fejl:" + err + " " + str);
    inp1.innerText = err;
}

const inp1 = document.getElementById("inperror");

function fetchAllGenres() {
    out("get all genres kaldt");
    return fetch(genresUrl).then(response => response.json()).catch(err => outerr(err, "fetch genre err"));
}

function actionFetchAllGenres(btn) {
    out("fetch genres kaldt");
    const prom = fetchAllGenres();
    prom.then(createGenreMap);
    out("Vi er færdige med fetch genres");
}

const genreMap = new Map();
function createGenreMap(data) {
    data.forEach((genre) => {
        genreMap.set(genre.genreid, genre);
    })
    out(genreMap);
}

const pbFetchGenres = document.getElementById('getGenres');

//add event listeners
pbFetchGenres.addEventListener('click', actionFetchAllGenres);
