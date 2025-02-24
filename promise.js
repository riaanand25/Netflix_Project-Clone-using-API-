import { IMAGE_URL, BASE_URL, API_KEY, requests } from "./data.js";

const originalsDiv = document.querySelector("#NetflixContainer");
const trendingDiv = document.querySelector("#trendingContainer");
const topRatedDiv = document.querySelector("#topRatedContainer");
const actionMoviesDiv = document.querySelector("#ActionMoviesContainer");
const comedyMoviesDiv = document.querySelector("#ComedyMoviesContainer");
const horrorMoviesDiv = document.querySelector("#HorrorMoviesContainer");
const romanticMoviesDiv = document.querySelector("#romanticMoviesContainer");
const documentariesMoviesDiv = document.querySelector("#documentariesMoviesContainer");

const navbar = document.querySelector(".navbar");
const content = document.querySelector(".content");


async function fetchDataFromURL(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

window.addEventListener("load", startTheFetch);

async function startTheFetch() {
    let promise = [];
    for (let x in requests) {
        promise.push(fetchDataFromURL(BASE_URL + requests[x]));
    }
    let finalData = await Promise.all(promise);

    displayImages(finalData[0], originalsDiv);
    displayImages(finalData[1], trendingDiv);
    displayImages(finalData[2], topRatedDiv);
    displayImages(finalData[3], actionMoviesDiv);
    displayImages(finalData[4], comedyMoviesDiv);
    displayImages(finalData[5], horrorMoviesDiv);
    displayImages(finalData[6], romanticMoviesDiv);
    displayImages(finalData[7], documentariesMoviesDiv);

    displayRandomImage(finalData[0]);
}

function displayImages(data, container) {
    data.results.forEach((item) => {
        if (item.poster_path) {
            const img = document.createElement("img");
            img.src = IMAGE_URL + item.poster_path;
            img.classList.add("Poster");
            container.appendChild(img);
        }
    });
}

function displayRandomImage(data) {
    if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomImage = data.results[randomIndex];

        const Name = document.createElement("h1");
        Name.textContent = randomImage.name;

        const overview = document.createElement("p")
        overview.textContent = randomImage.overview;

        const words = randomImage.overview.split(' ');
        if (words.length > 15) {
            overview.innerHTML = words.slice(0, 15).join(" ") + "...";
        } else {
            overview.innerHTML = randomImage.overview;
        }

        navbar.style.backgroundImage = `url(${IMAGE_URL + randomImage.poster_path})`;
        navbar.style.backgroundSize = "cover";
        navbar.style.backgroundPosition = "center";

        content.prepend(Name, overview)
    }
}



