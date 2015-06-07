(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('camera', camera);
   
  function camera($cordovaCamera, $q) { 
    
    return {
      getImage: getImage
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
        quality: 100,
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
      var deferred = $q.defer();

      $cordovaCamera.getPicture(optionsForType(type)).then(function(dataUrl) {
        deferred.resolve('data:image/jpeg;charset=utf-8;base64,' + dataUrl);
      });

      return deferred.promise;
    }

  }

})();