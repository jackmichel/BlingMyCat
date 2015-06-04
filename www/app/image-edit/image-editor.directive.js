angular
  .module('starter')
  .directive('imageEditor', imageEditor);

function imageEditor($cordovaFile, imageStore, blob, utilities, canvasUtilities) {
  return {
    restrict: 'E',
    scope: { currentImage: '=' },
    template: '<canvas></canvas><button>Save</button>',
    link: function(scope, element, attr) {
      var canvas = canvasUtilities.createCanvas(element.find('canvas')[0]);
      canvasUtilities.addImgSrc(canvas, cordova.file.dataDirectory + scope.currentImage);

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