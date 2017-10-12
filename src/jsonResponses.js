const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const getCard = (request, response) => {
  const responseJSON = {};
  return respondJSON(request, response, 200, responseJSON);
};

/* const updateTags = (request, response, body) => {
  const responseJSON = {
    message: 'Enter a card name',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }
    
}; */

module.exports = {
  getCard,
  // updateTags,
};
