(function () {
    'use strict';
    window.onload = function () {
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
    var video = document.getElementById("video");
    var source = document.createElement('source');
    var check = 0;

    function searchJSON(search) {
        var temp = search.toLowerCase();
        var newtemp = temp.replace(/[^A-Z0-9]/ig, "");
        console.log("searching for " + newtemp);
        // if (newtemp.includes("_")) {
        //     $.getJSON("phrase.json", function (data) {
        //         console.log("JSON Data: " + data);
        //         $.each(data, function (key, val) {
        //             console.log(key + "  value::  " + val);
        //             console.log(newtemp+"=="+key);
        //             if (key.localeCompare(newtemp) === 0) {
        //                 console.log("found");
        //                 source.setAttribute('src', val);
        //                 document.getElementById("video").removeAttribute("hidden");
        //                 video.appendChild(source);
        //                 video.load();
        //                 video.play();
        //                 check = 1;
        //             }
        //             if (check === 1){
        //                 $('#display').html(search);
        //                 localStorage.setItem("message", search);
        //             } else {
        //                 $('#display').html("Not Found");
        //                 localStorage.setItem("message", "Not Found");
        //             }
        //         });
        //     });
        // } else {
        $.getJSON("word.json", function (data) {
            // console.log("JSON Data: " + data);
            $.each(data, function (key, val) {
                console.log(key + "  value::  " + val);
                if (key.localeCompare(newtemp) === 0) {
                    console.log(newtemp + "==" + key + ", " + "found");
                    source.setAttribute('src', val);
                    document.getElementById("video").removeAttribute("hidden");
                    video.appendChild(source);
                    video.load();
                    video.play();
                    check = 1;
                }
                if (check === 1) {
                    $('#display').html(search);
                    localStorage.setItem("message", search);
                    return false;
                } else {
                    $('#display').html("Not Found");
                    localStorage.setItem("message", "Not Found");
                }
            });
        });
        // }
        // if (check == 0){
        //     $('#display').html("no match found")
        // }
    }

    $('#searchButton').click(() => {
        console.log('click');
        check = 0;
        document.getElementById("video").setAttribute("hidden", "");
        let message = $('#searchText').val();
        search = message;
        console.log(message);
        // $('#display').html(message);
        // localStorage.setItem("message", message);
        searchJSON(search);
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            });
    }
})();
