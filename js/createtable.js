createMovieMap();

function addRow(movie) {
    const rowCount = movieTable.rows.length;
    let row = movieTable.insertRow(rowCount);
    let colCount = 0;

    let cell = row.insertCell(colCount++);
    const inp = document.createElement('input');
    inp.type = "text";
    inp.setAttribute("value", movie.movie_name);
    out(inp);
    cell.appendChild(inp);

    //movie_length
    cell = row.insertCell(colCount++);
    const length = document.createElement('input');
    length.type = "number";
    length.setAttribute("value", movie.movie_length);
    out(length);
    cell.appendChild(length);

    //description
    cell = row.insertCell(colCount++);
    const description = document.createElement('input');
    description.type = "text";
    description.setAttribute("value", movie.description);
    out(description);
    cell.appendChild(description);

    const genreMap = new Map([[0,"gyser"],[1,"action"],[2, "thriller"],[3, "komedie"],[4, "fantasy"], [5, "romantik"], [6, "drama"], [7, "mystik"]]);

    cell = row.insertCell(colCount++);
    const ddGenre = document.createElement("select");
    let ix = 0;
    genreMap.forEach(genre => {
        out(genre);
        const el = document.createElement("option");
        el.textContent = genre;
        el.value = genre;
        ddGenre.appendChild(el);
        if (genre == movie.genre){
            ddGenre.selectedIndex = ix;

        }
        ix++;
        ddGenre.addEventListener("change", (event) => {
            const selind = ddGenre.selectedIndex;
            out("index: " + selind);
            const opt = ddGenre.options[selind];
            movie.genre = opt.value;
            out("movie genre: " + movie.genre);
        })
    });
    cell.appendChild(ddGenre);

    const pgMap = new Map([[0, "A"],[1, "7"],[2, "11"],[3, "15"], [4, "F"]]);
    cell = row.insertCell(colCount++);
    const ddPG = document.createElement("select");
    let ix1 = 0;
    pgMap.forEach(pgrating => {
        const el = document.createElement("option");
        el.textContent = pgrating;
        el.value = pgrating;
        ddPG.appendChild(el);
        if(pgrating === movie.pg_rating){
            out(pgrating)
            ddPG.selectedIndex = ix1;
        }
        ix1++;
        ddPG.addEventListener("change", (event) => {
            const selind = ddPG.selectedIndex;
            const opt = ddPG.options[selind];
            movie.pg_rating = opt.value;
        })
    });
    cell.appendChild(ddPG);

    //Release date
    cell = row.insertCell(colCount++);
    const releasedate = document.createElement('input');
    releasedate.type = "text";
    releasedate.setAttribute("value", movie.release_date);
    out(releasedate);
    cell.appendChild(releasedate);

    //delete button
    cell = row.insertCell(colCount++);
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute('value', 'Slet film');
    pbDelete.onclick = function () {
        deleteRow(movie, rowCount, row);
    }
    cell.appendChild(pbDelete);


    //update button
    cell = row.insertCell(colCount++);
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute('value', 'Opdater film');
    pbUpdate.onclick = function () {
        updateRow(movie, rowCount, row, inp, length, description, releasedate);
    }
    cell.appendChild(pbUpdate);


} //addRow

async function updateRow(movie, rowNo, row, name, length, description, releasedate) {
    out(movie);
    movie.movie_name = name.value;
    movie.movie_length = length.value;
    movie.description = description.value;
    movie.release_date = releasedate.value;


    const response = await restUpdateMovie(movie);
    out("nu har vi opdateret");
    out(response);
    //crazy rule, only change name once
    //inputfield.setAttribute('readonly', 'readonly');
}

async function restUpdateMovie(movie) {
    const url = "http://localhost:8181/movie/" + movie.movieID;

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    };

    const jsonString = JSON.stringify(movie);
    fetchOptions.body = jsonString;

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    out(response);
    if (!response.ok) {
        out("Det gik ikke godt med update");
    };

    return response;
} //restUpdateMovie

async function deleteRow(movie, rowNo, row) {
    out(movie);
    const response = await restDeleteMovie(movie);
    out("nu har vi slettet");
    movieTable.deleteRow(row.rowIndex);
}

async function restDeleteMovie(movie) {
    const url = "http://localhost:8181/movie/" + movie.movieID;

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    out(response);
    if (!response.ok) {
        out("Det gik ikke godt med sletning");
    };

    return response;
} //restDeleteMovie

function createTableFromMap() {
    out("create table");
    movieMap.forEach(movie => addRow(movie)
    )
}

const pbCreateTable = document.getElementById("createTable");
const movieTable = document.getElementById("movieTable");

pbCreateTable.addEventListener('click', createTableFromMap);
