'use strict';

var mtg = require('mtgsdk');

var parseJSON = function parseJSON(xhr, content) {
    var obj = JSON.parse(xhr.response);
    console.dir("inparse");

    if (obj.tags) {
        var tagSpot = document.createElement('p');
        var tagString = JSON.stringify(obj.tags);
        tagSpot.textContent = tagString;
        content.appendChild(tagSpot);
    }
};

var handleResponse = function handleResponse(xhr) {
    console.log("handle");
    var content = document.querySelector('#cardSpot');

    switch (xhr.status) {
        case 200:
            content.innerHTML = '<b>Success</b>';
            break;
        case 201:
            content.innerHTML = '<b>Create</b>';
            break;
        case 204:
            content.innerHTML = '<b>Updated (No Content)</b>';
            break;
        case 304:
            content.innerHTML = '<b>Not Modified</b>';
            return;
        case 400:
            content.innerHTML = '<b>Bad Request</b>';
            break;
        case 404:
            content.innerHTML = '<b>Not Found</b>';
            break;
        default:
            content.innerHTML = 'Error code not implemented by client.';
            break;
    }

    parseJSON(xhr, content);
};

var sendPost = function sendPost(e, tagForm) {};

var getCard = function getCard(e, cardForm) {
    var cardName = document.querySelector("#nameField").value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/getCard");

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr);
    };

    var formData = 'cardName=' + cardName;

    xhr.send(formData);

    e.preventDefault();
    return false;
};

var init = function init() {
    var cardForm = document.querySelector('#cardForm');
    var tagForm = document.querySelector('#tagForm');

    var getCard = function getCard(e) {
        return getCard(e, cardForm);
    };
    var setTags = function setTags(e) {
        return sendPost(e, tagForm);
    };

    cardForm.addEventListener('submit', getCard);
    tagForm.addEventListener('submit', setTags);
};

window.onload = init;
