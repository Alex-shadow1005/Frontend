createShowingMap();

function addSRow(showing) {
    const rowCount = showingTable.rows.length;
    console.log(rowCount);
    let row = showingTable.insertRow(rowCount);
    let colCount = 0;
    window.localStorage.setItem(row.rowIndex.toString(),showing.showingID.toString());
    let cell = row.insertCell(colCount++);
    const inp = document.createElement('input');
    inp.type = "text";
    inp.setAttribute("value", showing.movie.movie_name);
    out(inp);
    inp.setAttribute('readonly', 'readonly');
    cell.appendChild(inp);

    //movie_length
    cell = row.insertCell(colCount++);
    const length = document.createElement('input');
    length.type = "number";
    length.setAttribute("value", showing.movie.movie_length);
    out(length);
    length.setAttribute('readonly', 'readonly');
    cell.appendChild(length);

    //description
    cell = row.insertCell(colCount++);
    const description = document.createElement('input');
    description.type = "text";
    description.setAttribute("value", showing.movie.description);
    out(description);
    description.setAttribute('readonly', 'readonly');
    cell.appendChild(description);

    cell = row.insertCell(colCount++);
    const genre = document.createElement('input');
    genre.type = "text";
    genre.setAttribute("value", showing.movie.genre);
    out(genre);
    genre.setAttribute('readonly', 'readonly');
    cell.appendChild(genre);

    cell = row.insertCell(colCount++);
    const pgrating = document.createElement('input');
    pgrating.type = "text";
    pgrating.setAttribute("value", showing.movie.pg_rating);
    out(pgrating);
    pgrating.setAttribute('readonly', 'readonly');
    cell.appendChild(pgrating);

    //Release date
    cell = row.insertCell(colCount++);
    const releasedate = document.createElement('input');
    releasedate.type = "text";
    releasedate.setAttribute("value", showing.movie.release_date);
    out(releasedate);
    releasedate.setAttribute('readonly', 'readonly');
    cell.appendChild(releasedate);

    cell = row.insertCell(colCount++);
    const showingtime = document.createElement('input');
    showingtime.type = "text";
    showingtime.setAttribute("value", showing.showingTime);
    out("showing time: " + showingtime);
    showingtime.setAttribute('readonly', 'readonly');
    cell.appendChild(showingtime);

    cell = row.insertCell(colCount++);
    const pbPopUp = document.createElement("input");
    pbPopUp.type = "button";
    pbPopUp.setAttribute('value', 'Slet Kommune');
    pbPopUp.onclick = function () {
        goToBookin(row.rowIndex);
    }
    cell.appendChild(pbPopUp);
/*
    const booknow = document.createElement('a');
    booknow.setAttribute('href', 'booking.html');
    booknow.innerText = "book nu"
    cell.appendChild(booknow);
*/
}
function createTableSFromMap() {
    out("create table");
    showingMap.forEach(showing => addSRow(showing))
}

async function goToBookin(rowIndex){
    let testy =localStorage.getItem(rowIndex.toString())
    window.localStorage.setItem('showID', testy);
    console.log(testy);
    openForm();



}

async function openForm() {
    document.getElementById("popUpForm").style.display = "block";

}
async function closeForm() {
    document.getElementById("popUpForm").style.display = "none";
}

const pbCreateTableShowing = document.getElementById("createTableShowing");

const showingTable = document.getElementById("showingTable");

pbCreateTableShowing.addEventListener('click', createTableSFromMap);


