angular.module('starter')

.controller('BlingDetailController', function($scope, $stateParams, FileService, $cordovaFile) {
  $scope.currentImage = cordova.file.dataDirectory + $stateParams.image;
});