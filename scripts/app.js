(function() {
  'use strict';
  window.onload = function() {
    let message = localStorage.getItem("message") || 'Your message will display here';
    $('#searchText').html(message);
    $('#display').html(message);
  };

    // var wordJson = $.getJSON("word.json", function (data) {
    //     // var list = [];
    //     console.log( "JSON Data: " + data);
    //     $.each(data, function (key,val) {
    //         // list.push()
    //         console.log(key + "value:: " + val );
    //     });
    // });
    // var phaseJson = $.getJSON("phase.json", function (data) {
    //     console.log( "JSON Data: " + data);
    //     $.each(data, function (key,val) {
    //         console.log(key + "value:: " + val );
    //     });
    // });

    // var wordfile = $.getJSON('word.json', function(data) {});
    // var phasefile = $.getJSON('phase.json', function(data) {});
    //
    // var wordJson = JSON.parse(wordfile);
    // var phaseJson = JSON.parse(phasefile);
    var search;
    var check = 0;

    function searchJSON(search) {
        var temp = search.toLowerCase();
        console.log("searching for "+temp);
        if (temp.includes(" ")){
            $.getJSON("phase.json", function (data) {
                console.log( "JSON Data: " + data);
                $.each(data, function (key,val) {
                    console.log(key + "  value::  " + val );
                    if (key.localeCompare(temp) == 0) {
                        console.log("found");
                        document.getElementById("video").innerHTML = val;
                        document.getElementById("video").removeAttribute("hidden");
                        updateDiv();
                        check = 1;
                    }
                });
            });
        } else {
            $.getJSON("word.json", function (data) {
                console.log("JSON Data: " + data);
                $.each(data, function (key, val) {
                    console.log(key + "  value::  " + val);
                    if (key.localeCompare(temp) == 0) {
                        console.log("found");
                        document.getElementById("video").innerHTML = val;
                        document.getElementById("video").removeAttribute("hidden");
                        updateDiv();
                        check = 1;
                    }
                });
            });
        }
        // if (check == 0){
        //     $('#display').html("no match found")
        // }
    }

    function updateDiv()
    {
        $( "#here" ).load(window.location.href + " #here" );
    }

  $('#searchButton').click(() => {
    console.log('click');
    let message = $('#searchText').val();
    search = message;
    console.log(message);
    $('#display').html(message);
    localStorage.setItem("message", message);
    searchJSON(search);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
