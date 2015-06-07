(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('camera', camera);
   
  function camera($cordovaCamera, imageStore, $q, $cordovaFile, utilities, $state) { 

    var currentImage;
    
    return {
      getImage: getImage,
      getCurrentImage: getCurrentImage
    }

    //////////////

    function optionsForType(type) {
      var source;
      switch (type) {
        case 0:
          source = Camera.PictureSourceType.CAMERA;
          break;
        case 1:
          source = Camera.PictureSourceType.PHOTOLIBRARY;
          break;
      }
      return {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: source,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 1280,
        targetHeight: 1280,
        correctOrientation: true,
        saveToPhotoAlbum: true
      };
    }
   
    function getImage(type) {
      $cordovaCamera.getPicture(optionsForType(type)).then(function(dataUrl) {
        currentImage = dataUrl;
        $state.go('image-crop');
      });
    }

    function getCurrentImage() {
      return currentImage;
    }
  }

})();