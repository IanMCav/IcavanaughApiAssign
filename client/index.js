const parseJSON = (xhr, content) => {    
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
    
    if(obj.tags) {
        const tagSpot = document.createElement('p');
        const tagString = JSON.stringify(obj.tags);
        tagSpot.textContent = tagString;
        content.appendChild(tagSpot);
    }

};

const handleResponse = (xhr) => {
    console.log("handle");
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

    if(xhr.request.method === "GET") {
        parseJSON(xhr, content);
    }
};

const sendPost = (e, tagForm) => {
    const newTag = document.querySelector('#tagsField').value;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/addTag");
    
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader ('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr);
    
    const formData = `newTag=${newTag}`;
    
    xhr.send(formData);
    
    e.preventDefault();
    return false;
    
};

const getCard = (e, cardForm) => {
    const cardName = document.querySelector("#nameField").value;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/getCard");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr);

    const formData = `cardName=${cardName}`;
    
    xhr.send(formData);

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