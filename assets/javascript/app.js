const API_KEY = "aa07ce021371088334d6308641c7a59f";
const API_ROOT_URL = "https://api.themoviedb.org/3/";
const NUM_OF_ITEMS = 20;

let initURLs = [
  {
    title: "Popular TV Shows",
    url: "https://api.themoviedb.org/3/tv/popular?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1",
  },
  {
   title: "Top-Rated TV Shows",
    url: "https://api.themoviedb.org/3/tv/top_rated?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1",
  },
  {
   title: "Airing Today",
    url: "https://api.themoviedb.org/3/tv/airing_today?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1",
  },
  {
    title: "On The Air",
    url: "https://api.themoviedb.org/3/tv/on_the_air?api_key=aa07ce021371088334d6308641c7a59f&language=en-US&page=1",
  }
];

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

// Variables to use in Modal
let selectedTVShow = {
  firstAired: null,
  numSeasons: null,
  numEpisodes: null,
  synopsis: null,
  poster: null,
  recommendation1: null,
  recommendation2: null
};

// Configuration request to get base url for images and initialize
$.ajax({
  url: API_ROOT_URL + "configuration?api_key=" + API_KEY,
  method: "GET"
}).done(function(response) {
  console.log("Configuration API");

   // Set variable from API values
  let baseUrl = response.images.base_url;
  let size = response.images.poster_sizes[2];
  imgBaseUrl = baseUrl + size;

  // Only initialize the rest of webpage once configuration is done
  initCarousel(0);

});

// A recursive function to initialize the webpage with topic items into carousels
function initCarousel(i){
  // Stop recursion if reached end of array
  console.log("initCarousel with index "+i);
  if (i == initURLs.length){
    return;
  }
  else{
    // Get TV shows from the movie database API based on category and update HTML
    $.ajax({
      url: initURLs[i].url,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      i++;
      // Set Title for row
      //TODO: change location/id of where to store Title of row to be outside of htmlID for carousel items so 
      // they are not erased when carousel is built
      //$("#row-"+i).html("<h2>"+initURLs[i-1].title+"</h2");

      // run constructor to add TV category carousel to HTML
      renderCarousel(response.results, "row-"+i);

      // Add next carousel topic
      carousel(i);
      initCarousel(i);
      
    }); 
  }

};

// Function that takes in the API response and id tag of HTML element to update
function renderCarousel(results, htmlID){
  console.log("renderCarousel on div ID " +htmlID);

  // Looping over every result item and updating html
  for (let i = 0; i < results.length; i++) {
    let name = results[i].name;
    let id = results[i].id;
    let thumbnail;
    if(results[i].poster_path == null){
      thumbnail = "http://via.placeholder.com/185x278"
    }
    else{
      thumbnail = imgBaseUrl + results[i].poster_path;
    }
    // Create HTML carousel from variables
    if(i == 0){
      let html = "<div class='item active' dataID=" + id +
        "><div class='w3-container col-lg-4 col-xs-4 col-md-4 col-sm-4'><div class='row' id='box-search'>" +
        "<div class='thumbnail text-center'><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
        "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div></div></div>"

        $("#" + htmlID).append(html);
    }
    else{
      let html = "<div class='item' dataID=" + id +
      "><div class='w3-container col-lg-4 col-xs-4 col-md-4 col-sm-4'><div class='row' id='box-search'>" +
      "<div class='thumbnail text-center'><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div></div></div>"

      $("#" + htmlID).append(html);
    }
    // Update HTML
    
  }

}

// Event handler when selecting a genre from the nav-bar
$(".genre-button").on("click", function(){
  // Set genre code
  let genreID = $(this).val();
  console.log("genreID = "+genreID);

  // TODO: set Title Header of carousel to Genre on HTML

  // Set query details for API
  let query = "&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&include_null_first_air_dates=false&with_genres="+genreID;
  queryAPI(query);
})

// Get info from API based on query and load those values to row-0 in HTML
function queryGenre(query){
  // Performing GET requests to the the movie database API
    $.ajax({
      url: API_ROOT_URL + query + API_KEY + "&language=en-US",
      method: "GET"
    }).done(function(response) {
     console.log("queryAPI");
      console.log(response);
      // Set variable from API values

      // Update HTML carousel
      renderCarousel(response.results, "row-0");
    });
}


// Event handler when user clicks on an item in the carousel
$(document).on("click", ".item", function(){
  console.log("TV Show ID: " + $(this).attr("dataID"));
  // Call function to query API for the specific show
  queryShow($(this).attr("dataID"));
})

// Get individual show details to update modal
function queryShow(showID){
  console.log("queryShow");
  // Performing GET requests to the the movie database API
  $.ajax({
    url: API_ROOT_URL + "tv/" + showID + "?api_key=" + API_KEY + "&language=en-US",
    method: "GET"
  }).done(function(response) {
   
    console.log(response);
    // Set values from API values into local TVShow Object
    selectedTVShow.firstAired = response.first_air_date;
    selectedTVShow.numSeasons = response.number_of_seasons;
    selectedTVShow.numEpisodes = response.number_of_episodes;
    selectedTVShow.synopsis = response.overview;
    selectedTVShow.status = response.status; // Tell if show is still airing or if ended

    if(response.poster_path == null){
      selectedTVShow.poster = "http://via.placeholder.com/185x278"
    }
    else{
      selectedTVShow.poster = imgBaseUrl + response.poster_path;      
    }
    
    // Call API to find similar TV shows      
    $.ajax({
    url: API_ROOT_URL + "tv/" + showID + "/similar?api_key=" + API_KEY + "&language=en-US",
    method: "GET"
    }).done(function(simResponse) {

      var results = simResponse.results;

      // Loop through similar array and choose 2 similar shows to recommend
      for(var i = 1; i < 3; i++){

        let name = results[i].name;
        let id = results[i].id;
        let img;
        if(response.poster_path == null){
          img = "http://via.placeholder.com/185x278"
        }
        else{
          img = imgBaseUrl + results[i-1].poster_path;      
        }

        // TODO: Build the html element for displaying the recommended show.
        let html;

        if(i == 1){
          selectedTVShow.recommendation1 = html;
        }
        else{
          selectedTVShow.recommendation2 = html;
        }
      }
    });
  }); 
}

function carousel(i){
  console.log('calling carousel')
  var intervalTime = 4000;
  $('#myCarousel'+i).carousel({
    interval: intervalTime
  });
  var id = "#myCarousel" + i + " .item"
  console.log(id)
  // $("#myCarousel0 .item").each(function(){
 $(id).each(function(item){
    var next = $(this).next();
    console.log('items in',i,next)
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    if (next.next().length>0) {
   
        next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
        
    }
    else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
       
    }
  })
}

//   $('.carousel .item').each(function(){
//     var next = $(this).next();
//     if (!next.length) {
//       next = $(this).siblings(':first');
//     }
//     next.children(':first-child').clone().appendTo($(this));
//     if (next.next().length>0) {
   
//         next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
        
//     }
//     else {
//         $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
       
//   }
//   });
// }