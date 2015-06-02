angular
  .module('starter')
  .directive('imageEditor', ImageEditorDirective);

function ImageEditorDirective($cordovaFile, FileService) {
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
        var blob = canvasToBlob(canvas);

        $cordovaFile.writeFile(cordova.file.dataDirectory, 'a' + scope.currentImage, blob, true).then(function(e) {
          FileService.storeImage('a' + scope.currentImage);
        });
      });
    }
  }
}

function canvasToBlob(canvas, contentType) {
  contentType = contentType || 'image/jpeg';
  return b64ToBlob(canvas.toDataURL(contentType));
}

function b64ToBlob(b64Data, contentType) {
    contentType = contentType || 'image/jpeg';

    var b64Data = b64Data.split(',')[1]; 
    var sliceSize = 512;
    var byteCharacters = decodeFromBase64(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

function decodeFromBase64(input) {
  input = input.replace(/\s/g, '');
  return atob(input);
}