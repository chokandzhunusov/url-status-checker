let start;
let initialInterval = 4000;
let updatedUrls

$(document).ready(function() {
    requestStatus();
    // start = setInterval(requestStatus, initialInterval);
});

function requestStatus() {
    $.ajax({
        url : 'http://localhost:8000/urls/url_checker/',
        type : 'POST',
        data : {},
        success : function(data) {
           console.log(data);
           updatedUrls = getUpdatedStatuses();
        },
        error : function(request,error) {
            console.log(error);
        }
    });
}

function getUpdatedStatuses() {
     $.ajax({
        url : 'http://localhost:8000/urls/user_urls/',
        type : 'POST',
        data : {},
        success : function(data) {

            for (i=0; i < data.length; i++){
                console.log(data[i]['pk']);
            }
        },
        error : function(request,error) {
            console.log(error);
        }
    });
}

function changeInterval(){
    clearInterval(start);
    var newInterval = $('#intervalVal').val();
    start = setInterval(requestStatus, newInterval);
}

function addUrl() {
    var newUrl = $('#urlVal').val();

    $.ajax({
        url : 'http://localhost:8000/urls/',
        type : 'POST',
        data : {'newUrl': newUrl},
        success : function(data) {
           console.log(data);

        },
        error : function(request,error) {
            console.log(error);
        }
    });
}