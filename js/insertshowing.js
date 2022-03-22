const out = function (str){
    console.log(str);
}

out("hej");

document.addEventListener('DOMContentLoaded', createFormEventListener);
const moviesUrl = 'http://localhost:8181/movies';

let showingForm;
function createFormEventListener() {
    showingForm = document.getElementById("newShowingForm");
    showingForm.addEventListener('submit', handleFormSubmit);
}


callMovieMap();

function fetchAllMovies() {
    out("get all film kaldt");
    return fetch(moviesUrl).then(response => response.json());
}

const movieMap = new Map();
async function createMovieMap() {
    out("show alle film");
    const movieList = await fetchAllMovies();
    movieList.forEach((movie, index) => {
        out(movie.movie_name);
        movieMap.set(movie.movie_name, movie);
    })
}

async function callMovieMap(){
    await createMovieMap();
}



async function handleFormSubmit(event) {
    event.preventDefault();
    out("hej1");
    const form = event.currentTarget;
    const url = form.action;
    out(form);
    out(url);
    try {
        const formData = new FormData(form);
        out(formData);
        const responseData = await postFormDataAsJson(url, formData);
        out(responseData);
        alert(formData.get('showingDate') + ' er oprettet');

    } catch (err) {
        alert(err.message);
        out(err);
    }
}

async function postFormDataAsJson(url, formData) {
    out(formData.entries());
    const plainFormData = Object.fromEntries(formData.entries());
    console.log("plain form data")
    out(plainFormData);

    plainFormData.movie = {};
    plainFormData.movie.movieID = ddMovies.value;
    out(ddMovies.value);


    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formDataJsonString
    };

    const response = await fetch(url, fetchOptions);
    if (!response) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    console.log("response JSON");
    console.log(response.json);
    return response.json();
}

async function movieDropDown() {
//Create a dropdown
    out(movieMap);
    movieMap.forEach(movie => {
        out(movie);
        const el = document.createElement("option");
        el.textContent = movie.movie_name;
        el.value = movie.movieID;
        ddMovies.appendChild(el);

    });
}

const pbFillDropDown = document.getElementById('pbFillDropDown');
const ddMovies = document.getElementById("ddMovies");

pbFillDropDown.addEventListener('click', movieDropDown);
out(pbFillDropDown);

