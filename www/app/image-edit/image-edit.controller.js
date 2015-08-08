(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageEditCtrl', ImageEditCtrl);

  function ImageEditCtrl($stateParams, camera) {
    var vm = this;

    vm.currentImage = $stateParams.image;
  }

})();
