angular
  .module('starter')
  .controller('ImageViewCtrl', ImageViewCtrl);

function ImageViewCtrl($timeout, $scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, camera, imageStore) {
  $ionicPlatform.ready(function() {
    $scope.images = imageStore.images();
    $timeout(function() {
        $scope.$apply();
    });
  });
  
  $scope.urlForImage = function(imageName) {
    var trueOrigin = cordova.file.dataDirectory + imageName;
    return trueOrigin;
  }
 
  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take photo' },
        { text: 'Photo from library' }
      ],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  }
 
  $scope.addImage = function(type) {
    $scope.hideSheet();
    camera.handleMediaDialog(type).then(function() {
      $timeout(function() {
          $scope.$apply();
      });
    });
  }
}