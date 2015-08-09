(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageViewCtrl', ImageViewCtrl);

  function ImageViewCtrl($ionicActionSheet, $ionicViewSwitcher, camera, imageStore, $state, share) {
    var vm = this;

    vm.images = imageStore.images();
    vm.urlForImage = urlForImage;
    vm.addImage = addImage;
    vm.genericShare = share.genericShare;
    vm.tweet = share.tweet;
    vm.fbShare = share.fbShare;

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
  }

})();
