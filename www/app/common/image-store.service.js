(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('imageStore', imageStore);

  function imageStore() {

    var images;
    var IMAGE_STORAGE_KEY = 'images';

    return {
      storeImage: addImage,
      images: getImages
    };

    ////////////

    function getImages() {
      var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
      if (img) {
        images = JSON.parse(img);
      } else {
        images = [];
      }
      return images;
    }

    function addImage(img) {
      images.unshift(img);
      window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    }
  }

})();
