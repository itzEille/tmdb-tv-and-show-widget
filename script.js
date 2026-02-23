//set up variables
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer (get-token-from tmdb api)'
  }
};

const movieDiv = document.getElementById("movieDiv");
const showDiv = document.getElementById("current-shows");
const account_id = "get-from-tmdb api)"
const api_key = "get-from-tmdb-api)"
const movie_api_url = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies`
const tv_api_url = `https://api.themoviedb.org/3/account/${account_id}/watchlist/tv`

/// Get Shows: makes api call and gets the watchlist data
async function getShows() { 
    const response = await fetch(tv_api_url, options);
    const data = await response.json();
    console.log(data)

    
    for (const show of data.results) {
        const showCard = await createShowCard(show); 
        showDiv.appendChild(showCard); 
    }
}

/// creates HTML element with show data
async function createShowCard(show){
    const { name, poster_path, overview, id} = show;
    const showCard = document.createElement("div");

    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`)
    const data = await response.json();

    console.log(data)
    const {tagline, number_of_seasons} = data

  /// correctly sizes title and description
    let desc = "error"
  
    if (overview.length >= 500) {
      desc = tagline
      console.log(desc)
    }
    else {
      desc = overview
       console.log(desc)
    }

    let header_type = "error"

    if (name.length >= 10) {
      header_type = "small"
    }
    else
      header_type = "regular"

    showCard.classList.add("show_item")
  /// adds element
    showCard.innerHTML = `
            <a href="https://www.themoviedb.org/tv/${id}"><img class="current_show_img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${name}"></img> </a>
            <div show_text>
            <div class="show_header_${header_type}"> <h1>${name}</h1> <p class="nos">${number_of_seasons}S</p> </div>
            <p>${desc}<p>
            </div>

    `;
    return showCard;

}

  /// Get Movies: makes api call and gets the watchlist data
async function getMovies() { 
    const response = await fetch(movie_api_url, options);
    const data = await response.json();
    console.log(data)

   
    for (const movie of data.results) {
        const movieCard = await createMovieCard(movie); 
        movieDiv.appendChild(movieCard); 
    }
}

/// creates HTML element with movie data
async function createMovieCard(movie){
    const { title, poster_path, overview, id} = movie;
    const movieCard = document.createElement("div");

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
    const moreData = await response.json();
    console.log(moreData)
    const {runtime, tagline} = moreData

    /// correctly sizes title and description
    let desc = "error"

    if (overview.length >= 500) {
      desc = tagline
    }
    else {
      desc = overview
    }

    let header_type = "error"

    if (title.length >= 10) {
      header_type = "small"
      console.log(header_type)
    }
    else
      header_type = "regular"


    movieCard.classList.add("movie_item")
    /// adds element
    movieCard.innerHTML = `
            <a href="https://www.themoviedb.org/movie/${id}"><img class="current_movie_img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}"></img> </a>
            <div movie_text>
            <div class="movie_header_${header_type}"><h1>${title}</h1> <p>${runtime}m</p></div>
            <p>${desc}<p>
            </div>

    `;
    return movieCard;

}

  /// calls function
getShows()
getMovies()
