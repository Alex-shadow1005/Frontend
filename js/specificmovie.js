const id = localStorage.getItem("show");

console.log(id);

const divContainer = document.getElementById("specificmovie");

async function loadSpecificMovie() {
    console.log(divContainer);
    const specificMovie = await fetchSpecificMovie("http://localhost:8181/movies/" + id);
    const showMovieName = document.createElement("h1");
    showMovieName.type = "text";
    showMovieName.setAttribute("value", specificMovie.movie_name);

    divContainer.appendChild(specificMovie);
}

function fetchSpecificMovie(url){
    return fetch(url).then(response => response.json());
}

loadSpecificMovie();