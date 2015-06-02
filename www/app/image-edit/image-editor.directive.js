angular
  .module('starter')
  .directive('imageEditor', imageEditor);

function imageEditor($cordovaFile, imageStore, blob, utilities) {
  return {
    restrict: 'E',
    scope: { currentImage: '=' },
    template: '<canvas></canvas><button>Save</button>',
    link: function(scope, element, attr) {
      var canvasWidth = window.screen.width;
      var canvasHeight = canvasWidth;

      var canvas = new fabric.Canvas(element.find('canvas')[0], { width: canvasWidth, height: canvasHeight });
      canvas.setBackgroundColor('rgba(0, 0, 0, 1.0)', canvas.renderAll.bind(canvas));

      var img = document.createElement('img');
      img.src = cordova.file.dataDirectory + scope.currentImage;

      var imgInstance = new fabric.Image(img, {
          top: 0,
          left: 0
      });

      imgInstance.hasBorders = false;
      imgInstance.lockRotation = true;
      imgInstance.lockScalingX = true;
      imgInstance.lockScalingY = true;
      // Is the image taller or wider?
      if (img.width > img.height) {
        imgInstance.scaleToHeight(canvasHeight + 1);
        imgInstance.lockMovementY = true;
      } else {
        imgInstance.scaleToWidth(canvasWidth + 1);
        imgInstance.lockMovementX = true;
      }
      canvas.add(imgInstance);

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