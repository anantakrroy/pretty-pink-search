var responseData;
var searchQuery;
var searchResult;

$('document').ready(function () {
    $('.card').hide();

    // clear input on focus
    $('input').on('focus', function() {
        $('input').val('');
    });

    // on search click
    $('#searchQuery').on('click', function () {
        $('.card').show();
        $('li').remove();
        searchQuery = $('input').val();
        $("#searchHeading").text("You searched for: " + searchQuery);
        $.ajax({
            "type": "GET",
            "dataType": "JSON",
            "url": "https://api.duckduckgo.com/?q=" + searchQuery + "&format=json&pretty=1",
            "success": function (response) {
                console.log(response);
                responseData = response;
                creatResultCard();
                createResultList();
            },
        });
    });
});

function creatResultCard() {
    $("#card-heading").text(responseData.Heading);
    $(".lead").text(responseData.AbstractText);
    $("#subtitleLink").attr("href", responseData.AbstractURL).text(responseData.AbstractURL);
}

function createResultList() {
    $('ul').hide();
    searchResult = responseData.RelatedTopics;
    for (var i = 0; i < searchResult.length; i++) {
        if (searchResult[i].Text) {
            $("<li/>").attr("id", "result" + i).appendTo('ul')
            $("<h6/>").attr({ "id": "result" + i, "class": "m-2 p-2" }).text(searchResult[i].Text).appendTo('#result' + i);
            $("<a/>").attr({ "class": "card-subtitle", "href": searchResult[i].FirstURL, "target" : "_blank" }).text("Read more...").appendTo('#result' + i);
        } else {
            for (var j = 0; j < searchResult[i].Topics.length; j++) {
                $("<li/>").attr("id", "result" + i + j).appendTo('ul')
                $("<h6/>").attr({ "id": "result" + i + j, "class": "m-2 p-2" }).text(searchResult[i].Topics[j].Text).appendTo('#result' + i + j);
            }

        }

    }
    $('ul').fadeIn(1200);
}
