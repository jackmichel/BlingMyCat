(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .directive('imageEditor', imageEditor);

  function imageEditor($cordovaFile, imageStore, blob, utilities, canvasUtilities) {

    return {
      restrict: 'E',
      scope: { currentImage: '=' },
      templateUrl: 'app/image-edit/image-editor.html',
      link: link
    };

    ////////////

    function link(scope, element, attr) {
      var canvas = canvasUtilities.createCanvas(element.find('canvas')[0]);
      canvasUtilities.addImg(canvas, scope.currentImage, true, true);

      element.find('button').on('click', function() {
        canvas.deactivateAll();
        
        var imageBlob = blob.canvasToBlob(canvas);
        var newName = utilities.makeId();

        $cordovaFile.writeFile(cordova.file.dataDirectory, newName, imageBlob, true).then(function(e) {
          imageStore.storeImage(newName);
        });
      });

      element.find('.bling').on('click', function() {
        var imgSrc = angular.element(this).attr('src');
        canvasUtilities.addBlingImg(canvas, imgSrc);
      });
    }

  }

})();