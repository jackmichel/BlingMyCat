angular
  .module('starter')
  .controller('BlingDetailController', BlingDetailController);

function BlingDetailController($scope, $stateParams, FileService, $cordovaFile) {
  $scope.currentImage = cordova.file.dataDirectory + $stateParams.image;

  var canvasHeight = 500;
  var canvasWidth = window.screen.width;

  var canvas = new fabric.Canvas('ImageEditor', { width: canvasWidth, height: canvasHeight });

}