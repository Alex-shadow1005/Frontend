createShowingMap()

function addSRow(showing) {
    const rowCount = showingTable.rows.length;
    let row = showingTable.insertRow(rowCount);
    let colCount = 0;

    let cell = row.insertCell(colCount++);
    const inp = document.createElement('input');
    inp.type = "text";
    inp.setAttribute("value", showing.movie.movie_name);
    out(inp);
    cell.appendChild(inp);

    //movie_length
    cell = row.insertCell(colCount++);
    const length = document.createElement('input');
    length.type = "number";
    length.setAttribute("value", showing.movie.movie_length);
    out(length);
    cell.appendChild(length);

    //description
    cell = row.insertCell(colCount++);
    const description = document.createElement('input');
    description.type = "text";
    description.setAttribute("value", showing.movie.description);
    out(description);
    cell.appendChild(description);

    cell = row.insertCell(colCount++);
    const genre = document.createElement('input');
    genre.type = "text";
    genre.setAttribute("value", showing.movie.genre);
    out(genre);
    cell.appendChild(genre);

    cell = row.insertCell(colCount++);
    const pgrating = document.createElement('input');
    pgrating.type = "text";
    pgrating.setAttribute("value", showing.movie.pg_rating);
    out(pgrating);
    cell.appendChild(pgrating);

    //Release date
    cell = row.insertCell(colCount++);
    const releasedate = document.createElement('input');
    releasedate.type = "text";
    releasedate.setAttribute("value", showing.movie.release_date);
    out(releasedate);
    cell.appendChild(releasedate);

    cell = row.insertCell(colCount++);
    const showingtime = document.createElement('input');
    showingtime.type = "text";
    showingtime.setAttribute("value", showing.showingTime);
}
function createTableSFromMap() {
    out("create table");
    showingMap.forEach(showing => addSRow(showing))
}
const pbCreateTableShowing = document.getElementById("createTableShowing");

const showingTable = document.getElementById("showingTable");

pbCreateTableShowing.addEventListener('click', createTableSFromMap);
