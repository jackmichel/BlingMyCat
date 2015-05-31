angular
  .module('starter')
  .controller('BlingDetailController', BlingDetailController);

function BlingDetailController($scope, $stateParams, FileService, $cordovaFile) {
  $scope.currentImage = cordova.file.dataDirectory + $stateParams.image;
}