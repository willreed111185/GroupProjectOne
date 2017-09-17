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

//generates buttons for genre dropdown menu
function genreButtons(){
let genreLen = tvGenres.length;
  for (var k =0; k<genreLen; k++){
    //console.log(tvGenres[k].name);
    let innerGenre = $("<a>").attr("href","#").html(tvGenres[k].name);
    let newGenre = $("<li>").addClass("genre-button").attr("id",tvGenres[k].id).attr("dataName",tvGenres[k].name).append(innerGenre);
    $("#genreMenu").append(newGenre);
  }
}
genreButtons();

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

let counter = 1;
let innerCounter = 1;

// Function that takes in the API response and id tag of HTML element to update
function renderCarousel(results, htmlID){
  console.log("renderCarousel on div ID " +htmlID);

  // Looping over every result item and updating html
  for (let j = 0; j < results.length; j++) {
    let name = results[j].name;
    let data_ID = results[j].id;
    let thumbnail;
    if(results[j].poster_path == null){
      thumbnail = "http://via.placeholder.com/185x278"
    }
    else{
      thumbnail = imgBaseUrl + results[j].poster_path;
    }
    // console.log("innerCounter: ",innerCounter);
    // console.log("Counter: ",counter);
    // Create HTML carousel from variables
    if(j<4){
      // console.log("item-j: ", j);
      // console.log("row-i: ", htmlID);
      // console.log("rowFactor: ", rowFactor);
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
      // console.log(counter);
    }
    else if(j<8){
      // console.log("item-j: ", j);
      // console.log("row-i: ", htmlID);
      // console.log("rowFactor: ", rowFactor);
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
      // console.log(counter);

    }
    else if(j<12){
      // console.log("item-j: ", j);
      // console.log("row-i: ", htmlID);
      // console.log("rowFactor: ", rowFactor);
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
      // console.log(counter);

    }
    else if(j<16){
      // console.log("item-j: ", j);
      // console.log("row-i: ", htmlID);
      // console.log("rowFactor: ", rowFactor);
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
      // console.log(counter);

    }
    else if (j<20){
      // console.log("item-j: ", j);
      // console.log("row-i: ", htmlID);
      // console.log("rowFactor: ", rowFactor);
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
      // console.log(counter);
    }
    
    innerCounter++;
    if (innerCounter==5){
      counter++;
      innerCounter=1;
    }    
  }
}

// Event handler when selecting a genre from the nav-bar
$(".genre-button").on("click", function(){
  // Set genre code
  let genreID = $(this).attr("id");
  let nameGenre = $(this).attr("dataName");
  console.log("genreID = "+genreID);
  console.log("genreName = "+nameGenre);

  // TODO: set Title Header of carousel to Genre on HTML
  $("#topRowHeadline").html(nameGenre).css("color", "white").css("font-size","40px").css("font-family","'Passion One', cursive");
  for(var w=1; w<6; w++){
    $(".row"+w).empty();
  }
  $(".row1").empty();
  // Set query details for API
  let query = "https://api.themoviedb.org/3/discover/tv?with_genres="+genreID+"&api_key="+API_KEY+"&language=en-US&page=1";
    queryGenre(query);
})
  
  // Get info from API based on query and load those values to row-0 in HTML"
function queryGenre(query){
  // Performing GET requests to the the movie database API
    $.ajax({
      url: query,
      method: "GET"
    }).done(function(response) {
     // console.log("queryAPI");
      console.log(response);
      let rowCounter=0
      for (let i = 0; i < response.results.length; i++) {
        let name = response.results[i].name;
        let data_ID = response.results[i].id;
        let thumbnail;
        if(response.results[i].poster_path == null){
          thumbnail = "http://via.placeholder.com/185x278"
        }
        else{
          thumbnail = imgBaseUrl + response.results[i].poster_path;
        }
        let newHtml = "<div class='col-sm-3'>" +
          "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
          "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
        if (i < 4) {          
          $(".row1").append(newHtml)
        } 
        else if (i >= 4 && i < 8) {          
          $(".row2").append(newHtml)
        }
        else if (i >= 8 && i < 12) {          
          $(".row3").append(newHtml)
        } 
        else if (i >= 12 && i < 16) {          
          $(".row4").append(newHtml)
        } 
        else if (i >= 16 && i < 20) {          
          $(".row5").append(newHtml)
        }
      }
    });
}


// Event handler when user clicks on an item in the carousel
$(document).on("click", ".thumbnail", function(){
  console.log("TV Show ID: " + $(this).attr("dataid"));
  // Call function to query API for the specific show
  queryShow($(this).attr("dataid"));
})


function carousel(i){
  $('#myCarousel1').carousel({
  interval: 10000
  })
    
    $('#myCarousel1').on('slid.bs.carousel', function() {
      //alert("slid");
  });
    $('#myCarousel2').on('slid.bs.carousel', function() {
      //alert("slid");
  });
    
};

$(document).on("click","#modalMain", function(){
  $(".modalBackdrop").css("opacity", "1");
  $("#modalBox").css("display", "none");
})

// Event handler when user clicks on an item in the carousel
$(document).on("click", ".item", function(){
  console.log("TV Show ID: " + $(this).attr("dataID"));
    $(".modalBackdrop").css("opacity", ".1");

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
    $("#ShowTitle").html(response.name);
    $("#time").html(response.last_air_date);
    $("#plot").html(response.overview);
    if(response.networks.length>0){
      $("#network").html(response.networks[0].name);
    }else{
      $("#network").html(" ");
    }
    $("#modImage").attr("src", "http://image.tmdb.org/t/p/w185"+response.poster_path);
    $("#modalBox").css("display","block");
    console.log("posterpath: ",response.poster_path)
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
