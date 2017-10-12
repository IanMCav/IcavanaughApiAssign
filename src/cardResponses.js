const cardData = {};

//convert to proper server-side JSON object, accessed via GET and POST
//Have individual tags so that users can sort/filter by them


cardData["death's shadow"] = 'check yourself, wreck yourself, small smash, riskit for the biscuit';
cardData.thoughtseize = "was that a mulligan, you kept that, whoops sorry I think you needed that, can't let you do that, you USED to have a hand.";
cardData.brainstorm = "strictly worse ancestral recall, except when it isn't, this was fine before fetches, draw three seems dece, never legal in modern";
cardData['true-name nemesis'] = 'blue even gets the best creatures in Legacy, more power than toughness, small butts';
cardData['lightning bolt'] = '#iconic, #3toface, #boltyou';
cardData['splinter twin'] = '#unbanTrain, banned in modern, infinite combos, oops I win';
cardData.tarmogoyf = 'better than $100 bills in your wallet, just as green though, bigger and better than ever?';
cardData.naturalize = 'always nice to have, the most generic of versions, break those things';
cardData['path to exile'] = 'I ramp them?, why is this good?, but they get more mana now, seriously guys why?';
cardData['swords to plowshares'] = "they gain life? this is worse than ramping them!, but it'll take longer to kill them, legacy vs. modern";
cardData['eldrazi temple'] = "why this?, acceleration on one land a turn!, sic 'em";
cardData['thought knot seer'] = "wonderful to see you, it's time to get noodled, you don't get to keep that it might kill my stuff";

const getCardData = name => cardData[name];

const pushCardData = (name, tags) => {
  cardData[name] = tags;
};

module.exports = {
  getCardData,
  pushCardData,
};
