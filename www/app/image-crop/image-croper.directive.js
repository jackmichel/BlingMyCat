angular
  .module('starter')
  .directive('imageCroper', imageCroper);

function imageCroper($cordovaFile, imageStore, blob, utilities, canvasUtilities) {
  return {
    restrict: 'E',
    scope: { currentImage: '=' },
    template: '<canvas></canvas><button class="button button-block button-energized">Save</button>',
    link: function(scope, element, attr) {
      var canvas = canvasUtilities.createCanvas(element.find('canvas')[0]);
      canvasUtilities.addImgDataUrl(canvas, scope.currentImage);

      element.find('button').on('click', function() {
        var imageBlob = blob.canvasToBlob(canvas);
        var newName = utilities.makeId();

        $cordovaFile.writeFile(cordova.file.dataDirectory, newName, imageBlob, true).then(function(e) {
          imageStore.storeImage(newName);
        });
      });
    }
  }
}