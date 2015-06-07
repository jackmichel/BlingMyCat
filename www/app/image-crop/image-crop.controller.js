(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageCropCtrl', ImageCropCtrl);

  function ImageCropCtrl($stateParams) {
    var vm = this;

    vm.currentImage = $stateParams.image;

  }

})();