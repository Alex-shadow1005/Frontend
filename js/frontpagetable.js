//Credit to "Group JJJYM" for this !
const divContainer = document.getElementById("movies");

async function loadMovies() {
    const movies = await fetchMovies("http://localhost:8181/movies");
    for (let i = 0; i < movies.length; i++){
        const movie = movies[i];
        const showContainer = document.createElement("img");
        showContainer.src = movie.image_link;

        showContainer.addEventListener('click', () => {
            localStorage.setItem("show", JSON.stringify(movie.movieID));
            window.location.href = "specificmovie.html";
        })
        divContainer.appendChild(showContainer);
    }
}

function fetchMovies(url){
    return fetch(url).then(response => response.json());
}

loadMovies();