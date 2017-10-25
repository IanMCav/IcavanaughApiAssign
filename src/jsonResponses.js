class Card {
  constructor(name, tags) {
    this.name = name;
    this.tags = tags;
  }
}

const query = require('querystring');

const cardData = {};
cardData["death's shadow"] = (new Card("death's shadow", ['check yourself', 'wreck yourself', 'small smash', 'riskit for the biscuit']));
cardData.thoughtseize = (new Card('thoughtseize', ['that was a mulligan, right?', 'you kept that?', 'whoops sorry I think you needed that', "can't let you do that", 'you USED to have a hand.']));
cardData.brainstorm = (new Card('brainstorm', ['strictly worse ancestral recall', "except when it isn't", 'this is bad without fetches', 'draw one, kill my next two draws seems dece', 'never legal in modern']));
cardData['true-name nemesis'] = (new Card('true-name nemesis', ['blue even gets the best creatures in Legacy', 'more power than toughness', 'small butts']));
cardData['lightning bolt'] = (new Card('lightning bolt', ['#iconic', '#3toface', '#boltyou']));
cardData['splinter twin'] = (new Card('splinter twin', ['#unbanTrain', 'banned in modern', 'infinite combos', 'oops I win']));
cardData.tarmogoyf = (new Card('tarmogoyf', ['play card games with $100 bills', 'about as green too', 'bigger and better than ever?']));
cardData.naturalize = (new Card('naturalize', ['always nice to have', 'the most generic of versions', 'break those things']));
cardData['path to exile'] = (new Card('path to exile', ['I ramp them?', 'why is this good?', 'but they get more mana now', 'seriously guys why?']));
cardData['swords to plowshares'] = (new Card('swords to plowshares', ['they gain life?', 'this is worse than ramping them!', "but it'll take longer to kill them", 'legacy vs. modern']));
cardData['eldrazi temple'] = (new Card('eldrazi temple', ['why this?', 'acceleration on one land a turn!', "sic /'em", "it's time to n-n-n-n-n-noodle"]));
cardData['thought-knot seer'] = (new Card('thought-knot seer', ['wonderful to see you', "it's time to get noodled", "you don't get to keep that it might kill my stuff"]));
cardData.island = (new Card('island', ['#banIslands', 'best basic']));

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getCard = (request, response) => {
  let responseJSON = {};

  // oh god, javascript
  // console.log(JSON.parse(JSON.stringify(query.parse(request.url.split("?")[1])))["cardName"]);
  const cardName = JSON.parse(JSON.stringify(query.parse(request.url.split('?')[1]))).cardName;


  if (cardData[cardName]) {
    const cardTags = cardData[cardName].tags;
    responseJSON = { cardTags };
  } else {
    responseJSON = { message: 'No tags for this card yet!' };
  }

  respondJSON(request, response, 200, responseJSON);
};

const updateTags = (request, response, body) => {
  const responseJSON = {
    message: 'Enter a card name',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  getCard,
  updateTags,
};
