(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .directive('imageCroper', imageCroper);

  function imageCroper(canvasUtilities, $state, $ionicViewSwitcher) {

    return {
      restrict: 'E',
      scope: { currentImage: '=' },
      template: '<canvas></canvas><button class="button button-block button-energized save">Save</button>',
      link: link
    };

    /////////////

    function link(scope, element, attr) {
      var canvas = canvasUtilities.createCanvas(element.find('canvas')[0]);
      canvasUtilities.addImg(canvas, scope.currentImage);

      canvas.on('object:moving', function(e) {
        var activeObject = e.target;
        var maxLeft = (window.screen.width - activeObject.getWidth());
        var maxTop = (window.screen.width - activeObject.getHeight());

        if (activeObject.get('left') >= 0) {
          activeObject.set('left', 0);
        } else if (activeObject.get('left') <= maxLeft) {
          activeObject.set('left', maxLeft);
        }

        if (activeObject.get('top') >= 0) {
          activeObject.set('top', 0);
        } else if (activeObject.get('top') <= maxTop) {
          activeObject.set('top', maxTop);
        }
      });

      element.find('button.save').on('click', function() {
        canvas.deactivateAll();

        var imageData = canvas.toDataURL('image/jpeg', 1.0);

        $ionicViewSwitcher.nextDirection('forward');
        $state.go('image-edit', { image: imageData });
      });
    }
  }

})();
