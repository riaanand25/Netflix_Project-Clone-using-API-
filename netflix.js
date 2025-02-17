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

const data = [];

async function fetchDataFromURL(value) {
    const response = await fetch(BASE_URL + value);
    const result = await response.json();
    console.log(result.results);
    return result.results;
}

for (const key in requests) {
    data.push(await fetchDataFromURL(requests[key]));
}
console.log(data);
getRandomImage()

function displayMovies(movieArray, container) {
    movieArray.forEach((movie) => {
        const poster = document.createElement("img");
        poster.classList.add("Poster")
        poster.src = IMAGE_URL + movie.poster_path;
        container.appendChild(poster);
    });
}

displayMovies(data[0], originalsDiv);
displayMovies(data[1], trendingDiv);
displayMovies(data[2], topRatedDiv);
displayMovies(data[3], actionMoviesDiv);
displayMovies(data[4], comedyMoviesDiv);
displayMovies(data[5], horrorMoviesDiv);
displayMovies(data[6], romanticMoviesDiv);
displayMovies(data[7], documentariesMoviesDiv);

function getRandomImage() {
        
        const randomIndex = Math.floor(Math.random() * data[0].length);
        const randomMovie = data[0][randomIndex];
        console.log(randomMovie);

        

        const Name = document.createElement("h1");
        Name.textContent = randomMovie.name;

        const overview = document.createElement("p")
        overview.textContent = randomMovie.overview;

        navbar.style.backgroundImage = `url(${IMAGE_URL + randomMovie.poster_path})`;
        navbar.style.backgroundSize = "cover";
        navbar.style.backgroundPosition = "center";

        content.prepend(Name,overview)
    }





