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

    //update button
    cell = row.insertCell(colCount++);
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute('value', 'Opdater film');
    pbUpdate.onclick = function () {
        updateRow(movie, rowCount, row, inp);
    }
    cell.appendChild(pbUpdate);

    //delete button
    cell = row.insertCell(colCount++);
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute('value', 'Slet film');
    pbDelete.onclick = function () {
        deleteRow(movie, rowCount, row);
    }
    cell.appendChild(pbDelete);

    const genreMap = new Map([[0,"Gyser"],[1,"Action"],[2, "Thriller"],[3, "Komedie"],[4, "Fantasy"], [5, "Romantik"], [6, "Drama"], [7, "Mystik"]]);
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
            const opt = ddGenre.options[selind];

            movie.genre = genreMap.get(opt.value);
            out(movie.genre);
        })
    });
    cell.appendChild(ddGenre);
/*
    const pgMap = new Map([[0, "A"], [1, "7"], [2, "11"], [3, "15"], [4, "F"]]);
    cell = row.insertCell(colCount++);
    const ddPg = document.createElement("select");
    let ix1 = 0;
    pgMap.forEach(pgRating => {
        const el = document.createElement("option");
        el.textContent = pgRating;
        el.value = pgRating;
        ddPg.appendChild(el);
        if(pgRating == movie.pg_rating){
            ddPg.selectedIndex = ix1;
        }
        ix++;
        ddPg.addEventListener("change", (event)=> {
            const selind = ddPg.selectedIndex;
            const opt = ddPg.options[selind];
            movie.pg_rating = pgMap.get(opt.value);
        })
    })
    cell.appendChild(ddPg);

*/

} //addRow

async function updateRow(movie, rowNo, row, inputfield) {
    out(movie);
    movie.name = inputfield.value;
    const response = await restUpdateMovie(movie);
    out("nu har vi opdateret");
    out(response);
    //crazy rule, only change name once
    inputfield.setAttribute('readonly', 'readonly');
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