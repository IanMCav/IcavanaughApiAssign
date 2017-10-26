const query = require('querystring');

// for POSTs, store the last card searched for.
let lastCard = 'black lotus';

// tag data.
const cardTags = {};
cardTags["death's shadow"] = ['check yourself', 'wreck yourself', 'small smash', 'riskit for the biscuit'];
cardTags.thoughtseize = ['that was a mulligan, right?', 'you kept that?', 'whoops sorry I think you needed that', "can't let you do that", 'you USED to have a hand.'];
cardTags.brainstorm = ['strictly worse ancestral recall', "except when it isn't", 'this is bad without fetches', 'draw one, kill my next two draws seems dece', 'never legal in modern'];
cardTags['true-name nemesis'] = ['blue even gets the best creatures in Legacy', 'more power than toughness', 'small butts'];
cardTags['lightning bolt'] = ['#iconic', '#3toface', '#boltyou'];
cardTags['splinter twin'] = ['#unbanTrain', 'banned in modern', 'infinite combos', 'oops I win'];
cardTags.tarmogoyf = ['play card games with $100 bills', 'about as green too', 'bigger and better than ever?'];
cardTags.naturalize = ['always nice to have', 'the most generic of versions', 'break those things'];
cardTags['path to exile'] = ['I ramp them?', 'why is this good?', 'but they get more mana now', 'seriously guys why?'];
cardTags['swords to plowshares'] = ['they gain life?', 'this is worse than ramping them!', "but it'll take longer to kill them", 'legacy vs. modern'];
cardTags['eldrazi temple'] = ['why this?', 'acceleration on one land a turn!', "sic /'em", "it's time to n-n-n-n-n-noodle"];
cardTags['thought-knot seer'] = ['wonderful to see you', "it's noodle time", "you don't get to keep that it might kill my stuff"];
cardTags.island = ['#banIslands', 'best basic'];
cardTags['primevil titan'] = ["it's prime time"];
cardTags.griselbrand = ["heeeere's grizzledaddy"];
cardTags['mother of runes'] = ['hi mom'];
cardTags['ulamog, the ceaseless hunger'] = ['om nom nom nom'];

// fill in JSON response with the object being returned.
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};


// get tag data for a user input card.
const getCard = (request, response) => {
  let responseJSON = {};

  // oh god, javascript
  // console.log(JSON.parse(JSON.stringify(query.parse(request.url.split('?')[1]))).cardName);
  const cardName = JSON.parse(JSON.stringify(query.parse(request.url.split('?')[1]))).cardName;

  lastCard = cardName;
  let resMess = 'This card has no tags... :(';

  if (cardTags[cardName]) {
    resMess = cardTags[cardName];
  }

  responseJSON = { id: cardName, message: resMess };

  respondJSON(request, response, 200, responseJSON);
};

// add a new tag
const addTag = (request, response, body) => {
  const responseJSON = {
  };

  if (!body.newTag) {
    responseJSON.id = 'missingParams';
    responseJSON.message = 'Enter a tag!';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (cardTags[lastCard]) {
    cardTags[lastCard].push(body.newTag);
  } else {
    cardTags[lastCard] = [body.newTag];
  }

  return respondJSON(request, response, 201, responseJSON);
};

// export the functions
module.exports = {
  getCard,
  addTag,
};
