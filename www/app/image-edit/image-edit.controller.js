(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageEditCtrl', ImageEditCtrl);

  function ImageEditCtrl($scope, $stateParams) {
    $scope.currentImage = $stateParams.image;
  }

})();