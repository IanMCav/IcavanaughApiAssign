const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const bundle = fs.readFileSync(`${__dirname}/../hosted/es5Scripts.js`);

// return the main page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// return the CSS file
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// return our bundled js
const getBundle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(bundle);
  response.end();
};


module.exports = {
  getIndex,
  getCSS,
  getBundle,
};
