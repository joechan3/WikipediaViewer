$(document).ready(function() {

  function getWikipediaResults(searchTerms,callback) {
    var apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerms + "&limit=10&namespace=0&format=json&warningsaserror=true&callback=?";
    
    $.getJSON(apiURL,function success(data){
      callback(data);
    });
  }

  function updateHTML(searchResults) {
    console.log("From update HTML: ", searchResults);
    console.log("Number of results is " + searchResults[1].length);
    
    var searchResultHTML = '<div class="col-sm-6 col-sm-offset-3">'+
                             '<div class="panel panel-default">'+
                               '<div class="panel-heading"><a href="#" target="_blank">Panel heading without title</a></div>'+
                               '<div class="panel-body">'+
                                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel malesuada ex. Aliquam bibendum fringilla semper. Nunc ac ante eget sed.'+
                               '</div>'+
                             '</div>'+
                            '</div>';
    
    //Remove old search result(s)
    $("#searchResults").children().remove();
    
    //Create a search result panel(s)
    for (var i = 0; i < searchResults[1].length; i++){
      $("#searchResults").append(searchResultHTML);
      $(".panel-heading:eq(" + i + ") a").attr("href", searchResults[3][i]);
      $(".panel-heading:eq(" + i + ") a").html(searchResults[1][i]);
      
      //Limit summary to 140 characters (arbitrary decision)
      if (searchResults[2][i].length > 140){
        searchResults[2][i] = searchResults[2][i].slice(0,140) + " . . .";
      }
      $(".panel-body:eq(" + i + ")").html(searchResults[2][i]);
    }
    
  }

  //Clear search field
  $("input").val("");

  $("input").on("keypress", function keyboardSearch(event) {
    //keyCode 13 is Enter/Return key
    if (event.which === 13 && $("input").val() !== "") {
      getWikipediaResults($("input").val(),updateHTML);
    }
  });

  $("#searchButton").on("click", function mouseSearch() {
    if ($("input").val() !== "") {
      getWikipediaResults($("input").val(),updateHTML);
    }
  });

});

//request api search results



//update HTML