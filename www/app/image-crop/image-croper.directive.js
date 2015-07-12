(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .directive('imageCroper', imageCroper);

  function imageCroper(canvasUtilities, $state, $ionicViewSwitcher) {

    return {
      restrict: 'E',
      scope: { currentImage: '=' },
      template: '<canvas></canvas><button class="button button-block button-energized">Save</button>',
      link: link
    };

    /////////////

    function link(scope, element, attr) {
      var canvas = canvasUtilities.createCanvas(element.find('canvas')[0]);
      canvasUtilities.addImg(canvas, scope.currentImage);

      element.find('button').on('click', function() {
        canvas.deactivateAll();
        
        var imageData = canvas.toDataURL('image/jpeg', 1.0);

        $ionicViewSwitcher.nextDirection('forward');
        $state.go('image-edit', { image: imageData });
      });
    }

  }

})();