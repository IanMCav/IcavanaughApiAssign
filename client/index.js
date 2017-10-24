//mtgsdkstuff here too
const mtg = require('mtgsdk');

const parseJSON = (xhr, content) => {
    //process the tags, get picture
};

const handleResponse = (xhr) => {
    const content = document.querySelector('#cardSpot');

    switch(xhr.status) {
        case 200:
            content.innerHTML = `<b>Success</b>`;
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
            content.innerHTML = `Error code not implemented by client.`;
            break;
    }

    if(xhr.status === 200 || xhr.status === 201 || xhr.status === 304) {
        parseJSON(xhr, content);
    }
};

const sendPost = (e, tagForm) => {

};

const getCard = (e, cardForm) => {

    const nameField = document.querySelector("#nameField");

    const cardName = nameField.value;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "getCard");

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr);

    xhr.send(`name=${cardName}`);

    e.preventDefault();
    return false;
};

const init = () => {
    const cardForm = document.querySelector('#cardForm');
    const tagForm = document.querySelector('#tagForm');

    const getCard = (e) => getCard(e, cardForm);
    const setTags = (e) => sendPost(e, tagForm);

    cardForm.addEventListener('submit', getCard);
    tagForm.addEventListener('submit', setTags);
};

window.onload = init;