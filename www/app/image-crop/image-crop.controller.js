angular
  .module('starter')
  .controller('ImageCropCtrl', ImageCropCtrl);

function ImageCropCtrl($ionicActionSheet, $scope, camera) {

  console.log(camera.getCurrentImage());

}