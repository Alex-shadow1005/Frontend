const out = function (str) {
    console.log(str);
}

out('vi er igang med fetch movies');
const dt = localStorage.getItem('date');
let d = dt.slice(8, 10);
let y = dt.slice(11);
let m = dt.slice(4,7);
out(dt);
out(d);
out(y);
out(m);
let mi = 0;
getmonth(m);
const urldt = y + "-" + mi + "-" + d;
function getmonth(str) {
    switch (str) {
        case "Jan":
            mi = 1;
            break;
        case "Feb":
            mi = 2;
            break;
        case "Mar":
            mi = 3;
            break;
        case "Apr":
            mi = 4;
            break;
        case "May":
            mi = 5;
            break;
        case "Jun":
            mi = 6;
            break;
        case "Jul":
            mi = 7;
            break;
        case "Aug":
            mi = 8;
            break;
        case "Sep":
            mi = 9;
            break;
        case "Oct":
            mi = 10;
            break;
        case "Nov":
            mi = 11;
            break;
        case "Dec":
            mi = 12;
            break;
    }

}

const showingssUrl = 'http://localhost:8181/showingbydate/' + urldt;
out(showingssUrl);
function fetchshowingsbydt() {
    out("get shows by date kaldt");

    return fetch(showingssUrl).then(response => response.json());
}

const showingMap = new Map();
async function createShowingMap() {
    out("show alle showings");
    const showingList = await fetchshowingsbydt();

    showingList.forEach((showing, index) => {
        out(index);
        out(showing.showingTime);
        showingMap.set(showing.showingID, showing);
        index++;
    })
}

const pbFetchShowings = document.getElementById('getShowings');

//add event listeners
pbFetchShowings.addEventListener('click', createShowingMap);
