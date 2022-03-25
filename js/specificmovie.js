const id = localStorage.getItem("show");

console.log(id);

const divContainer = document.getElementById("specificmovie");

async function loadSpecificMovie() {
    const specificMovie = await fetchSpecificMovie("http://localhost:8181/movie/" + id);

    //image_link
    const showMovieImage = document.createElement('img');
    showMovieImage.classList.add("image_link");
    showMovieImage.src = specificMovie.image_link;
    divContainer.appendChild(showMovieImage);

    //movie_name
    const showMovieName = document.createElement('h1');
    showMovieName.classList.add("movie_name");
    showMovieName.innerText = specificMovie.movie_name;
    divContainer.appendChild(showMovieName);

    //movie_length
    const showMovieLength = document.createElement('h1');
    showMovieLength.innerText = specificMovie.movie_length;
    divContainer.appendChild(showMovieLength);

    //description
    const showMovieDescription = document.createElement('h1');
    showMovieDescription.innerText = specificMovie.description;
    divContainer.appendChild(showMovieDescription);

    //genre
    const showMovieGenre = document.createElement('h1');
    showMovieGenre.innerText = specificMovie.genre;
    divContainer.appendChild(showMovieGenre);

    //pg_rating
    const showMovieRating = document.createElement('h1');
    showMovieRating.innerText = specificMovie.pg_rating;
    divContainer.appendChild(showMovieRating);

    //release_date
    const showMovieReleaseDate = document.createElement('h1');
    showMovieReleaseDate.innerText = specificMovie.release_date;
    divContainer.appendChild(showMovieReleaseDate);
}

function fetchSpecificMovie(url){
    return fetch(url).then(response => response.json());
}

loadSpecificMovie();