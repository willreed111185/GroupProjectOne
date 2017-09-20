const API_KEY = "aa07ce021371088334d6308641c7a59f";
const API_ROOT_URL = "https://api.themoviedb.org/3/";
const API_KEY_VoiceRSS = "e079d9f39dd34f978e9d92173c101949"

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

let imgBaseUrl;
let audioElement;

//variables for use in dynamic fill of API info into rows/Rows/and slides for carousel
let counter = 1;
let innerCounter = 1;

// Configuration request to get base url for images and initialize
$.ajax({
  url: API_ROOT_URL + "configuration?api_key=" + API_KEY,
  method: "GET"
}).done(function(response) {

   // Set variable from API values
  let baseUrl = response.images.base_url;
  let size = response.images.poster_sizes[2];
  imgBaseUrl = baseUrl + size;

  // Only initialize the rest of webpage once configuration is done
  initCarousel(0);
});
genreButtons();

// CAROUSEL FUNCTIONS \\

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
      // run constructor to add TV category carousel to HTML
      renderCarousel(response.results);
      // Add next carousel topic
      carousel(i);
      initCarousel(i);  
    }); 
  }
}

// Function that takes in the API response and id tag of HTML element to update
function renderCarousel(results){
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
      //if algorithm to fill slides/rows with show info within carousel
    if(j<4){
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
    }
    else if(j<8){
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
    }
    else if(j<12){
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
    }
    else if(j<16){
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
    }
    else if (j<20){
      let html = "<div class='col-sm-3'>" +
      "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
      "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
      $(".row"+counter).append(html)
    }
    innerCounter++;
    if (innerCounter==5){
      counter++;
      innerCounter=1;
    }    
  }
}

//function to time carousel autoSlide
function carousel(i){
  $('#myCarousel1').carousel({
  interval: 10000
  })
    $('#myCarousel1').on('slid.bs.carousel', function() {
  });
    $('#myCarousel2').on('slid.bs.carousel', function() {
  });
};

// GENRE FUNCTIONS \\ 

// Function that generates buttons for genre dropdown menu
function genreButtons(){
let genreLen = tvGenres.length;
  for (let k =0; k<genreLen; k++){
    //console.log(tvGenres[k].name);
    let innerGenre = $("<a>").attr("href","#").html(tvGenres[k].name);
    let newGenre = $("<li>").addClass("genre-button").attr("id",tvGenres[k].id).attr("dataName",tvGenres[k].name).append(innerGenre);
    $("#genreMenu").append(newGenre);
  }
}

// Get info from API based on query and display in top-most carousel
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


// MODAL FUNCTIONS \\

// Get individual show details to update modal
function queryShow(showID){
  console.log("queryShow");
  // Performing GET requests to the the movie database API
  $.ajax({
    url: API_ROOT_URL + "tv/" + showID + "?api_key=" + API_KEY + "&language=en-US",
    method: "GET"
  }).done(function(response) {

    //Call text to speech function
    voiceRSS(response.overview);

    //write to modal
    $("#ShowTitle").html(response.name);
    $("#time").html(response.last_air_date);
    $("#plot").html(response.overview);
    if(response.networks.length>0){
      $("#network").html(response.networks[0].name);
    }else{
      $("#network").html(" ");
    }
    $("#modImage").attr("src", "http://image.tmdb.org/t/p/w185"+response.poster_path);
    $("#modalBox").css("display","block"); //show modul
    
    // Call API to find similar TV shows      
    $.ajax({
    url: API_ROOT_URL + "tv/" + showID + "/similar?api_key=" + API_KEY + "&language=en-US",
    method: "GET"
    }).done(function(simResponse) {
      $(".rowA").empty();
      let results = simResponse.results;
      console.log("simShows: ",results);
      // Loop through similar array and choose 5 similar shows to recommend
      for(let i = 1; i < 5; i++){
        let name = results[i].name;
        let data_ID = results[i].id;
        let thumbnail;
        if(response.poster_path == null){
          thumbnail = "http://via.placeholder.com/185x278"
        }
        else{
          thumbnail = imgBaseUrl + results[i].poster_path;      
        }
        // Build the html element for displaying the recommended show.
        let newhtml = "<div class='col-sm-3'>" +
        "<div class='thumbnail text-center' dataid= "+data_ID+"><img src=" + thumbnail + " alt=" + name + " class='img-responsive' " +
        "><div class='caption'><p id='titleCaption'>" + name + "</p></div></div></div>";
        $(".rowA").append(newhtml);
      }
    });
  }); 
}

//function to API into voiceRSS to retrieve audio of plot
function voiceRSS(dialogue) {
  $.speech({
      key: API_KEY_VoiceRSS,
      src: dialogue,
      hl: 'en-au',
      r: 0, 
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
  });
}


// EVENT HANDLERS \\

// Event handler when selecting a genre from the nav-bar
$(".genre-button").on("click", function(){
  // Set genre code
  let genreID = $(this).attr("id");
  let nameGenre = $(this).attr("dataName");
  console.log("genreID = "+genreID);
  console.log("genreName = "+nameGenre);

  //set Title Header of carousel to Genre on HTML
  $("#topRowHeadline").html(nameGenre).css("color", "white").css("font-size","40px").css("font-family","'Passion One', cursive");
  for(let w=1; w<6; w++){
    $(".row"+w).empty();
  }
  $(".row1").empty();
  // Set query details for API
  let query = "https://api.themoviedb.org/3/discover/tv?with_genres="+genreID+"&api_key="+API_KEY+"&language=en-US&page=1";
    queryGenre(query);
})

// Event handler to show modal when user clicks on an item in the carousel
$(document).on("click", ".thumbnail", function(){
  console.log("TV Show ID: " + $(this).attr("dataid"));
  // Call function to query API for the specific show
  queryShow($(this).attr("dataid"));
})

// Event handler to close the modal
$(document).on("click","#close", function(){
  $(".modalBackdrop").css("opacity", "1");
  $("#modalBox").css("display", "none");
  audioElement.pause();
  audioElement = null;
})

// Event handler to pause playback of TTS
$(document).on("click", "#pause", function() {
  console.log("clicked pause");
  audioElement.pause();
})
// Event handler to play playback of TTS
$(document).on("click", "#play", function() {
  console.log("clicked play");
  audioElement.play();
})

// Event handler for user search
$("#submit-btn").on("click", function(event) {
  event.preventDefault();
  var showInput = $("#show-input").val().trim();
  console.log(showInput);
  $("#show-input").val("");

  // Performing GET requests to the the movie database API
  $.ajax({
    url: API_ROOT_URL+"search/tv?api_key="+API_KEY+"&language=en-US&query="+showInput+"&page=1",
    //API_ROOT_URL + "/search/tv?api_key=" + API_KEY + "&language=en-US&page=1&query=" + +showInput,
    method: "GET"
  }).done(function(response) {
    if (response.results.length == 0){
      // Alert user that could not find the show
      $("#show-input").attr("style", "border-color: red; border-width: 1.5px");
      $("#show-input").attr("placeholder", "Show not found");
    }
    else{
      $("#show-input").removeAttr("style");
      $("#show-input").attr("placeholder", "Search");
      queryShow(response.results[0].id);
    }
  });
})