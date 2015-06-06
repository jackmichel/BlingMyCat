angular
  .module('starter')
  .controller('ImageCropCtrl', ImageCropCtrl);

function ImageCropCtrl(camera) {
  var vm = this;

  vm.currentImage = camera.getCurrentImage();

}