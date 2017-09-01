const API_KEY = "aa07ce021371088334d6308641c7a59f";
const API_ROOT_URL = "https://api.themoviedb.org/3/movie/76341?api_key=" + API_KEY;
const NUM_OF_ITEMS = 10;

let tvGenres = [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

// stores the base url for images
let imgBaseUrl;

// Variable to store Object for TV show Modal
let tvObj = {};


// const TOP = "&sort_by=popularity.desc";
// Get available genres https://api.themoviedb.org/3/genre/movie/list?api_key=aa07ce021371088334d6308641c7a59f&language=en-US
// Tv-top rated -- GET /tv/top_rated -- https://api.themoviedb.org/3/tv/top_rated?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1
// TV-Airing TOday -- GET /tv/airing_today-- https://api.themoviedb.org/3/tv/airing_today?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1
// TV-ON-THE-AIR -- GET /tv/on_the_air --https://api.themoviedb.org/3/tv/on_the_air?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1
// TV-POPULAR -- GET /tv/popular -- https://api.themoviedb.org/3/tv/popular?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1

// Recommended TV shows based on single TV id -- GET /tv/{tv_id}/recommendations


// Configuration request to get base url for images
$.ajax({
  url: "https://api.themoviedb.org/3/configuration?api_key=aa07ce021371088334d6308641c7a59f",
  method: "GET"
}).done(function(response) {
 
  console.log(response);
  // Set variable from API values
  let baseUrl = response.images.base_url;
  let size = response.images.poster_sizes[2];
  imgBaseUrl = baseUrl + size;
});


// Event handler when selecting a genre from the nav-bar
$("$.genre-button").on("click", function(){
	// Set genre code
	let genreID = $(this).val();
	// Set query details for API
	let query = "&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&with_genres="+genreID;

	// Send API query and update HTML
	queryAPI(query);
})

// Get info from API based on query and load those values to HTML
function queryAPI(query){
	// Performing GET requests to the the movie database API
    $.ajax({
      url: API_ROOT_URL + query,
      method: "GET"
    }).done(function(response) {
     
      console.log(response);
      // Set variable from API values

      // Update HTML carousel
    });
}

// Get individual show details to update modal
function queryShow(showID){
	// Performing GET requests to the the movie database API
    $.ajax({
      url: API_ROOT_URL + query,
      method: "GET"
    }).done(function(response) {
     
      console.log(response);
      // Set values from API values into local TVShow Object

    });	
}