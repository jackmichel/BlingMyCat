(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .directive('imageEditor', imageEditor);

  function imageEditor($cordovaFile, imageStore, blob, utilities, canvasUtilities) {

    return {
      restrict: 'E',
      scope: { currentImage: '=' },
      template: '<canvas></canvas><button>Save</button>',
      link: link
    };

    ////////////

    function link(scope, element, attr) {
      var canvas = canvasUtilities.createCanvas(element.find('canvas')[0]);
      canvasUtilities.addImg(canvas, scope.currentImage, true);

      element.find('button').on('click', function() {
        canvas.deactivateAll();
        
        var imageBlob = blob.canvasToBlob(canvas);
        var newName = utilities.makeId();

        $cordovaFile.writeFile(cordova.file.dataDirectory, newName, imageBlob, true).then(function(e) {
          imageStore.storeImage(newName);
        });
      });
    }

  }

})();