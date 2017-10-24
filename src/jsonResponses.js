let cardData = "placeholder";
cardData["death's shadow"] = ['check yourself', 'wreck yourself', 'small smash', 'riskit for the biscuit'];
cardData.thoughtseize = ['that was a mulligan, right?', 'you kept that?', 'whoops sorry I think you needed that', "can't let you do that", 'you USED to have a hand.'];
cardData.brainstorm = ['strictly worse ancestral recall', "except when it isn't", 'this is bad without fetches', 'draw one, kill my next two draws seems dece', 'never legal in modern'];
cardData['true-name nemesis'] = ['blue even gets the best creatures in Legacy', 'more power than toughness', 'small butts'];
cardData['lightning bolt'] = ['#iconic', '#3toface', '#boltyou'];
cardData['splinter twin'] = ['#unbanTrain', 'banned in modern', 'infinite combos', 'oops I win'];
cardData.tarmogoyf = ['play card games with $100 bills', 'about as green too', 'bigger and better than ever?'];
cardData.naturalize = ['always nice to have', 'the most generic of versions', 'break those things'];
cardData['path to exile'] = ['I ramp them?', 'why is this good?', 'but they get more mana now', 'seriously guys why?'];
cardData['swords to plowshares'] = ['they gain life?', 'this is worse than ramping them!', "but it'll take longer to kill them", 'legacy vs. modern'];
cardData['eldrazi temple'] = ['why this?', 'acceleration on one land a turn!', "sic /'em", "it's time to n-n-n-n-n-noodle"];
cardData['thought-knot seer'] = ['wonderful to see you', "it's time to get noodled", "you don't get to keep that it might kill my stuff"];
cardData.island = ['#banIslands', 'best basic'];

const url = require('url');

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/JSON',
  });

  response.write(JSON.stringify(object));
  response.end();
};

const getCard = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const cardTags = cardData[parsedUrl.search.split('=')[1]];
  const responseJSON = { cardTags };

  return respondJSON(request, response, 200, responseJSON);
};

const updateTags = (request, response, body) => {
  const responseJSON = {
    message: 'Enter a card name',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 202, responseJSON);
};

module.exports = {
  getCard,
  updateTags,
};
