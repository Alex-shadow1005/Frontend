createMovieMap();
createTableFromMap();

function frontpageRow(movie) {
    const rowCount = movieTable.rows.length;
    let row = movieTable.insertRow(rowCount);
    let colCount = 0;

    let cell = row.insertCell(colCount++);
    const movie1 = document.createElement('img');
    movie1.type = "image";
    movie1.setAttribute("src", movie.image_link);
    movie1.innerHTML = movie.image_link;
    out(movie1);
    cell.appendChild(movie1);
}