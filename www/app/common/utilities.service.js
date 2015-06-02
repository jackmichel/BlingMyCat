angular
  .module('starter')
  .factory('utilities', utilities);

function utilities() {
  function makeId() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
    for (var i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += Date.now();

    return text;
  };

  return {
    makeId: makeId
  }
}