const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4eecf5256eab803f360de6810865ba98&page=1';

const imgPath = 'https://image.tmdb.org/t/p/w1280';
const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=4eecf5256eab803f360de6810865ba98&query=';
const movieDetailsUrl = 'https://www.themoviedb.org/movie/';
const heartIcon = document.querySelector('.heart-holder');

getMovies(API_URL);

async function getMovies(url) {
    const response = await fetch(url);
    const responseData = await response.json();

    showMovies(responseData.results);

}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview, id } = movie;

        if (poster_path === null) {
            return false;
        }


        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}"/>
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h4>Overview</h4>
        ${overview}
        <div class = "details">
        <a class="btn-details" href="${movieDetailsUrl + id}" target = "_blank">Details</a>
            <div class = "heart-holder"></div>
        </div>
        
        </div>
       
        `;
        main.appendChild(movieElement);

    });


}


function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchAPI + searchTerm);
        search.value = '';
    }

});