/*let colCount = 0;
let movieCount = 0;
let row = 0;

function frontpageRow(movie) {
    const rowCount = frontPageTable.rows.length;
    if(movieCount === 0) {
        row = frontPageTable.insertRow(rowCount);
    }
    movieCount++;
    let cell = row.insertCell(colCount++);
    if(movieCount > 2) {
        movieCount = 0;
    }

    const movie1 = document.createElement('img');
    movie1.src = movie.image_link;
    movie1.setAttribute("src", movie.image_link);
    out(movie1.src);
    cell.appendChild(movie1);
}

async function createFrontpageTableFromMap() {
    await createMovieMap();
    out("frontpage table creation");
    out(movieMap);
    movieMap.forEach(movie => frontpageRow(movie));
}*/

//const pbCreateFrontpageTable = document.getElementById("createFrontpageTable");
//const frontPageTable = document.getElementById("frontpageTable");
//createFrontpageTableFromMap();
//pbCreateFrontpageTable.addEventListener('DOMContentLoaded', createFrontpageTableFromMap);


//Credit to "Group JJJYM" for this !
const divContainer = document.getElementById("movies");

async function loadMovies() {
    const movies = await fetchMovies("http://localhost:8181/movies");
    for (let i = 0; i < movies.length; i++){
        const movie = movies[i];
        const showContainer = document.createElement("img");
        showContainer.classList.add("Card");
        showContainer.src = movie.image_link;

        showContainer.addEventListener('click', () => {
            localStorage.setItem("show", JSON.stringify(movie));
            //window.location.href = "booking.html";
        })
        divContainer.appendChild(showContainer);
    }
}

function fetchMovies(url){
    return fetch(url).then(response => response.json());
}

loadMovies();