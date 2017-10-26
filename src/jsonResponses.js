// const mtg = require('mtgsdk');

class Card {
  constructor(name, tags) {
    this.name = name;
    this.tags = tags;
  }
}

// for posts, store lasted changed card on server
let lastCard = 'black lotus';

const query = require('querystring');

const cardTags = {};
cardTags["death's shadow"] = (new Card("death's shadow", ['check yourself', 'wreck yourself', 'small smash', 'riskit for the biscuit']));
cardTags.thoughtseize = (new Card('thoughtseize', ['that was a mulligan, right?', 'you kept that?', 'whoops sorry I think you needed that', "can't let you do that", 'you USED to have a hand.']));
cardTags.brainstorm = (new Card('brainstorm', ['strictly worse ancestral recall', "except when it isn't", 'this is bad without fetches', 'draw one, kill my next two draws seems dece', 'never legal in modern']));
cardTags['true-name nemesis'] = (new Card('true-name nemesis', ['blue even gets the best creatures in Legacy', 'more power than toughness', 'small butts']));
cardTags['lightning bolt'] = (new Card('lightning bolt', ['#iconic', '#3toface', '#boltyou']));
cardTags['splinter twin'] = (new Card('splinter twin', ['#unbanTrain', 'banned in modern', 'infinite combos', 'oops I win']));
cardTags.tarmogoyf = (new Card('tarmogoyf', ['play card games with $100 bills', 'about as green too', 'bigger and better than ever?']));
cardTags.naturalize = (new Card('naturalize', ['always nice to have', 'the most generic of versions', 'break those things']));
cardTags['path to exile'] = (new Card('path to exile', ['I ramp them?', 'why is this good?', 'but they get more mana now', 'seriously guys why?']));
cardTags['swords to plowshares'] = (new Card('swords to plowshares', ['they gain life?', 'this is worse than ramping them!', "but it'll take longer to kill them", 'legacy vs. modern']));
cardTags['eldrazi temple'] = (new Card('eldrazi temple', ['why this?', 'acceleration on one land a turn!', "sic /'em", "it's time to n-n-n-n-n-noodle"]));
cardTags['thought-knot seer'] = (new Card('thought-knot seer', ['wonderful to see you', "it's noodle time", "you don't get to keep that it might kill my stuff"]));
cardTags.island = (new Card('island', ['#banIslands', 'best basic']));
cardTags['primevil titan'] = (new Card('primevil titan', ["it's prime time"]));
cardTags.griselbrand = (new Card('griselbrand', ["heeeere's grizzledaddy"]));
cardTags['mother of runes'] = (new Card('mother of runes', ['hi mom']));
cardTags['ulamog, the ceaseless hunger'] = (new Card('ulamog, the ceaseless hunger', ['om nom nom nom']));

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getCard = (request, response) => {
  let responseJSON = {};

  // oh god, javascript
  // console.log(JSON.parse(JSON.stringify(query.parse(request.url.split('?')[1]))).cardName);
  const cardName = JSON.parse(JSON.stringify(query.parse(request.url.split('?')[1]))).cardName;

  lastCard = cardName;
  let resMess = 'This card has no tags... :(';

  if (cardTags[cardName]) {
    resMess = cardTags[cardName].tags;
  }

  responseJSON = { id: cardName, message: resMess/* , img: imageUrl */ };

  respondJSON(request, response, 200, responseJSON);
};

const addTag = (request, response, body) => {
  const responseJSON = {
  };

  if (!body.newTag) {
    responseJSON.id = 'missingParams';
      responseJSON.message = "Enter a tag!"
    return respondJSON(request, response, 400, responseJSON);
  }

  if (cardTags[lastCard]) {
    cardTags[lastCard].tags.push(body.newTag);
  } else {
    cardTags[lastCard] = new Card(lastCard, [body.newTag]);
  }

  return respondJSON(request, response, 201, responseJSON);
};

module.exports = {
  getCard,
  addTag,
};
