const id = localStorage.getItem("show");

console.log(id);

const movieContainer = document.getElementById("specificmovie");
const imageContainer = document.getElementById("specificimage");

async function loadSpecificMovie() {
    const specificMovie = await fetchSpecificMovie("http://localhost:8181/movie/" + id);

    //image_link
    const showMovieImage = document.createElement('img');
    showMovieImage.classList.add("image_link");
    showMovieImage.src = specificMovie.image_link;
    movieContainer.appendChild(showMovieImage);

    //movie_name
    const showMovieName = document.createElement('h1');
    showMovieName.classList.add("movie_info");
    showMovieName.innerText = specificMovie.movie_name;
    movieContainer.appendChild(showMovieName);

    //movie_length
    const showMovieLength = document.createElement('h1');
    showMovieLength.classList.add("movie_info");
    showMovieLength.innerText = specificMovie.movie_length + " minutter";
    movieContainer.appendChild(showMovieLength);

    //description
    const showMovieDescription = document.createElement('h1');
    showMovieDescription.classList.add("movie_info");
    showMovieDescription.innerText = specificMovie.description;
    console.log(showMovieDescription.innerText.length);
    if(showMovieDescription.innerText.length > 225){
        showMovieDescription.innerText = specificMovie.description.slice(0, 225) + "...";
    }
    movieContainer.appendChild(showMovieDescription);

    //genre
    const showMovieGenre = document.createElement('h1');
    showMovieGenre.classList.add("movie_info");
    showMovieGenre.innerText = "Genre: " + specificMovie.genre;
    movieContainer.appendChild(showMovieGenre);

    //pg_rating
    const showMovieRating = document.createElement('h1');
    showMovieRating.classList.add("movie_info");
    showMovieRating.innerText = "Aldersgrænse: " + specificMovie.pg_rating;
    movieContainer.appendChild(showMovieRating);

    //release_date
    const showMovieReleaseDate = document.createElement('h1');
    showMovieReleaseDate.classList.add("movie_info");
    showMovieReleaseDate.innerText = specificMovie.release_date;
    movieContainer.appendChild(showMovieReleaseDate);
}

function fetchSpecificMovie(url){
    return fetch(url).then(response => response.json());
}

loadSpecificMovie();