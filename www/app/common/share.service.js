(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('share', share);

  function share($cordovaSocialSharing) {

    var DEFAULTS = {
      LINK: 'treehouseanimals.org',
      MESSAGE: '#treehousecats #everydollarcounts',
      SUBJECT: 'Every Dollar Counts!'
    };

    return {
      genericShare: genericShare,
      tweet: tweet,
      fbShare: fbShare
    };

    ////////////

    function genericShare(image, message, subject, link) {
      image = cordova.file.dataDirectory + image;
      message = message || DEFAULTS.MESSAGE;
      subject = subject || DEFAULTS.SUBJECT;
      link = link || DEFAULTS.LINK;

      $cordovaSocialSharing
        .share(message, subject, image, link)
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occured. Show a message to the user
        });
    }

    function tweet(image, message, link) {
      image = cordova.file.dataDirectory + image;
      message = message || DEFAULTS.MESSAGE;
      link = link || DEFAULTS.LINK;

      $cordovaSocialSharing
        .shareViaTwitter(message, image, link)
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
        });
    }

    function fbShare(image, message, link) {
      image = cordova.file.dataDirectory + image;
      message = message || DEFAULTS.MESSAGE;
      link = link || DEFAULTS.LINK;

      $cordovaSocialSharing
        .shareViaFacebook(message, image, link)
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
        });
    }
  }

})();
