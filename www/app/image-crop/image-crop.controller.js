(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageCropCtrl', ImageCropCtrl);

  function ImageCropCtrl(camera) {
    var vm = this;

    vm.currentImage = camera.getCurrentImage();

  }

})();