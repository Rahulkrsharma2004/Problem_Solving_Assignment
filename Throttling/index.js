
document.getElementById('searchBox').addEventListener('input', function () {
    let throttling = false;
    if (throttling == false) {
        throttling = true
        setTimeout(function () {
            throttling = false;
            showMovies(document.getElementById("searchBox").value)
            console.log(document.getElementById("searchBox").value)
        }, 200)
    }

})

const showMovies = async () => {
    try {
        let query = document.querySelector("#searchBox").value;
        let url = `http://www.omdbapi.com/?i=tt3896198&apikey=6f10ab69&s=${query}`;

        let response = await fetch(url);

        let data = await response.json();
        console.log("Hello", data);
        showData(data.Search);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error.message);
    }
};

showData = (data) => {
    let container = document.querySelector("#container");
    container.innerHTML = null;
    if (data != undefined) {
        data.forEach(function (el) {
            let div = document.createElement("div");
            let poster = document.createElement("img");
            poster.src = el.Poster;
            let title = document.createElement("h3");
            title.innerText = el.Title;
            let year = document.createElement("p");
            year.innerText = el.Year;
            let imdbID = document.createElement("p");
            imdbID.innerText = el.imdbID;
            div.append(poster, title, year, imdbID);
            container.append(div);
        });
    } else {
        let h1 = document.createElement("h1");
        h1.innerText = "Not Found Any Movies for the Search!";
        container.append(h1);
    }
};