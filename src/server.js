const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// deal with POST requests.
const handlePost = (request, response, parsedUrl) => {
  console.log(parsedUrl.pathname);
  if (parsedUrl.pathname === '/addTag') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addTag(request, res, bodyParams);
    });
  }
};

// deal with GET requests
const handleGet = (request, response, parsedUrl) => {
  console.log(parsedUrl.pathname);
  const res = response;

  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getCard') {
    jsonHandler.getCard(request, res);
  } else if (parsedUrl.pathname === '/es5Scripts.js') {
    htmlHandler.getBundle(request, response);
  } else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// figure out what kind of request we're dealing with
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
