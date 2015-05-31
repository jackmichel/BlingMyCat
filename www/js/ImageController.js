angular
  .module('starter')
  .controller('ImageController', ImageController);

function ImageController($timeout, $scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {
  $ionicPlatform.ready(function() {
    $scope.images = FileService.images();
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
    ImageService.handleMediaDialog(type).then(function() {
      $scope.$apply();
    });
  }
}