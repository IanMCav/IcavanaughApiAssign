"use strict";

//global content value because of GETS being a pair of asynchronous calls
var contentText = "";

//takes the results and puts them on the page.
var parseJSON = function parseJSON(xhr) {
    var content = document.querySelector('#cardSpot');

    var obj = JSON.parse(xhr.response);

    //id is used to store the card name when things go correctly, and error types otherwise
    if (obj.id) {
        contentText += "<h3>" + obj.id + "</h3>";
    }

    //message is used to store the card's tags if any
    if (obj.message) {
        var messageString = "";

        if (obj.message != "This card has no tags... :(") {
            for (var i = 0; i < obj.message.length; i++) {
                messageString += "<p>" + obj.message[i] + "</p>";
            }
        } else {
            messageString += "<p>" + obj.message + "</p>";
        }
        contentText += messageString;
    }

    //cards is where the mtgapi returns its results. Different printings each have their own entry
    //and some promo arts don't have images on the gatherer, so I have to loop through the list
    //until I find one an image.
    if (obj.cards) {
        var imageUrl = void 0;
        var curInd = 0;

        //find the first returned card with a gatherer image
        while (!imageUrl) {
            if (obj.cards[curInd].imageUrl) {
                imageUrl = obj.cards[curInd].imageUrl;
            } else {
                curInd++;
            }
        }

        contentText += "<img src=" + imageUrl + ">";
    }

    content.innerHTML = contentText;
};

//deal with errors and the responses.
var handleResponse = function handleResponse(xhr) {
    var content = document.querySelector('#cardSpot');
    var statusMessage = "";

    switch (xhr.status) {
        case 200:
            statusMessage = "<p class=\"success\"><b>Success</b></p>";
            break;
        case 201:
            statusMessage = '<p class="success"><b>Create</b></p>';
            break;
        case 204:
            statusMessage = '<p class="success"><b>Updated (No Content)</b></p>';
            break;
        case 304:
            statusMessage = '<p class="neutral"><b>Not Modified</b></p>';
            return;
        case 400:
            statusMessage = '<p class="error"><b>Bad Request</b></p>';
            break;
        case 404:
            statusMessage = '<p class="error"><b>Not Found</b></p>';
            break;
        default:
            statusMessage = "<p class=\"error\"><b>Error code not implemented by client.</b></p>";
            break;
    }

    contentText += statusMessage;
    content.innerHTML = contentText;

    if (xhr.status === 200 || xhr.status === 201) {
        parseJSON(xhr);
    }
};

//add a new tag
var sendPost = function sendPost(e, tagForm) {
    var newTag = document.querySelector('#tagsField').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/addTag");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    var formData = "newTag=" + newTag;

    xhr.send(formData);

    e.preventDefault();
    return false;
};

//get a card's tags
var reqCard = function reqCard(e, cardForm) {
    contentText = "";

    var cardName = document.querySelector("#nameField").value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getCard?cardName=" + cardName.toLowerCase());

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    xhr.send();

    e.preventDefault();
    return false;
};

//set up form submission buttons
var init = function init() {
    var cardForm = document.querySelector('#cardForm');
    var tagForm = document.querySelector('#tagForm');

    var getCard = function getCard(e) {
        //get the card's tags, which are stored on the local server.
        reqCard(e, cardForm);

        //get card metadata from the mtgapi, which an asyncronous call
        //found from https://docs.magicthegathering.io/
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.magicthegathering.io/v1/cards?name=\"" + document.querySelector("#nameField").value + "\"");

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onload = function () {
            return handleResponse(xhr);
        };

        xhr.send();

        e.preventDefault();
        return false;
    };
    var setTags = function setTags(e) {
        sendPost(e, tagForm);
    };

    cardForm.addEventListener('submit', getCard);
    tagForm.addEventListener('submit', setTags);
};

window.onload = init;
