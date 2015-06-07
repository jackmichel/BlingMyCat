(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('utilities', utilities);

  function utilities() {

    return {
      makeId: makeId
    }

    ////////////

    function makeId() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      text += Date.now();

      return text;
    }
  }

})();