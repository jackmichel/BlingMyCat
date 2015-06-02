angular
  .module('starter')
  .controller('ImageEditCtrl', ImageEditCtrl);

function ImageEditCtrl($scope, $stateParams) {
  $scope.currentImage = $stateParams.image;
}