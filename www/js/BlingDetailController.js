angular
  .module('starter')
  .controller('BlingDetailController', BlingDetailController);

function BlingDetailController($scope, $stateParams) {
  $scope.currentImage = $stateParams.image;
}