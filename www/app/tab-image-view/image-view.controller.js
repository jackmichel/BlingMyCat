(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageViewCtrl', ImageViewCtrl);

  function ImageViewCtrl($ionicActionSheet, camera, imageStore) {
    var vm = this;

    vm.images = imageStore.images();
    vm.urlForImage = urlForImage;
    vm.addImage = addImage;

    ////////////

    function urlForImage(imageName) {
      var trueOrigin = cordova.file.dataDirectory + imageName;
      return trueOrigin;
    }
    
    function addImage(type) {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Take photo' },
          { text: 'Photo from library' }
        ],
        titleText: 'Add images',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          camera.getImage(index);
          hideSheet();
        }
      });
    }
  }

})();