$(document).ready(function() {
  "use strict";

  function getWikipediaResults(searchTerms, callback) {
    var apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerms + "&limit=10&namespace=0&format=json&warningsaserror=true&callback=?";

    $.getJSON(apiURL, function success(data) {
      callback(data, searchTerms);
    });
  }

  function updateHTML(searchResults, searchWords) {
    var searchResultHTML = "<div class='col-sm-6 col-sm-offset-3'>" +
      "<div class='panel panel-default'>" +
      "<div class='panel-heading'><a href='#' target='_blank' title=''>Panel heading without title</a></div>" +
      "<div class='panel-body'>" +
      "</div>" +
      "</div>" +
      "</div>";

    //Remove old search result(s)
    $("#searchResults").children().remove();

    if (searchResults[1].length === 0) {
      //Handle zero search results
      $("#searchResults").append(searchResultHTML);
      $(".panel-heading").html("<p class='zeroResults'>Your search - " + searchWords + " - did not match any Wikipedia entries.</p>");
      $(".panel-body").html(
        "<p class='zeroResults'>Suggestions:</p>" +
        "<ul class='zeroResults'>" +
        "<li>Make sure that all words are spelled correctly.</li>" +
        "<li>Try different keywords." +
        "<li>Try more general keywords." +
        "</ul>"
      );
    } else {
      //Create search result panel(s)
      for (var i = 0; i < searchResults[1].length; i++) {
        $("#searchResults").append(searchResultHTML);
        $(".panel-heading:eq(" + i + ") a").attr("href", searchResults[3][i]);
        $(".panel-heading:eq(" + i + ") a").attr("title", "Visit the Wikipedia page for " + searchResults[1][i]);
        $(".panel-heading:eq(" + i + ") a").html(searchResults[1][i]);

        //Limit summary to 140 characters (arbitrary decision)
        if (searchResults[2][i].length > 140) {
          searchResults[2][i] = searchResults[2][i].slice(0, 140) + " . . .";
        }
        $(".panel-body:eq(" + i + ")").html(searchResults[2][i]);
      }
    }

    $("input").blur(); //hide mobile keyboard after search
  }

  //Clear search field
  $("input").val("");

  $("input").on("keypress", function keyboardSearch(event) {
    //keyCode 13 is Enter/Return key
    if (event.which === 13 && $("input").val() !== "") {
      getWikipediaResults($("input").val(), updateHTML);
    }
  });

  $("#searchButton").on("click", function mouseSearch() {
    if ($("input").val() !== "") {
      getWikipediaResults($("input").val(), updateHTML);
    }
  });

});