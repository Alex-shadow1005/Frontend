createMovieMap();

function addRow(movie) {
    const rowCount = movieTable.rows.length;
    let row = movieTable.insertRow(rowCount);
    let colCount = 0;

    //movie_name
    let cell = row.insertCell(colCount++);
    const name = document.createElement('input');
    name.type = "text";
    name.setAttribute("value", movie.movie_name);
    out(name);
    cell.appendChild(name);

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

    //Genre


    //update button
    cell = row.insertCell(colCount++);
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute('value', 'Opdater film');
    pbUpdate.onclick = function () {
        updateRow(movie, rowCount, row, name);
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

} //addRow

async function updateRow(movie, rowNo, row, inputfield) {
    out(movie);
    movie.movie_name = inputfield.value;
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
