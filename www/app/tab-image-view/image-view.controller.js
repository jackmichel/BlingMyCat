(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageViewCtrl', ImageViewCtrl);

  function ImageViewCtrl($ionicActionSheet, $ionicViewSwitcher, camera, imageStore, $state) {
    var vm = this;

    vm.images = imageStore.images();
    vm.urlForImage = urlForImage;
    vm.addImage = addImage;
    vm.editImage = editImage;

    ////////////

    function urlForImage(imageName) {
      return cordova.file.dataDirectory + imageName;
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
          hideSheet();
          camera.getImage(index).then(function(imgData) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('image-crop', { image: imgData });
          });
        }
      });
    }

    function editImage(imageName) {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('image-edit', { image: urlForImage(imageName) });
    }
  }

})();