let start;
let initialInterval = 4;
let updatedUrls

$(document).ready(function() {
    start = setInterval(requestStatus, initialInterval * 1000);
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
            alert(error);
        }
    });
}

function getUpdatedStatuses() {
     $.ajax({
        url : 'http://localhost:8000/urls/user_urls/',
        type : 'POST',
        data : {},
        success : function(data) {
            for (let i=0; i < data.length; i++){
                if (data[i]['fields']['status']) {
                    $('#' + data[i]['pk']).css('background-color', 'green');
                } else {
                    $('#' + data[i]['pk']).css('background-color', 'red');
                }
            }
        },
        error : function(request,error) {
            alert(error);
        }
    });
}

function addUrl() {
    var newUrl = $('#urlVal').val();

    if (newUrl.startsWith('http') || newUrl.startsWith('www')) {
        $.ajax({
            url : 'http://localhost:8000/urls/',
            type : 'POST',
            data : {'newUrl': newUrl},
            success : function(data) {
               alert('Url was added');

            },
            error : function(request,error) {
                alert(error);
            }
        });
    } else {
        alert("please enter valid URL")
    }
}

function changeInterval(){
    clearInterval(start);
    let newInterval = $('#intervalVal').val() * 1000;
    start = setInterval(requestStatus, newInterval);
}
