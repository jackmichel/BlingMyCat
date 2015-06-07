(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('canvasUtilities', canvasUtilities);

  function canvasUtilities() {

    return {
      createCanvas: createCanvas,
      addImg: addImg
    }

    ////////////

    function createCanvas(element) {
      var canvasWidth = window.screen.width;
      var canvasHeight = canvasWidth;

      var canvas = new fabric.Canvas(element, { width: canvasWidth, height: canvasHeight });
      canvas.setBackgroundColor('rgba(0, 0, 0, 1.0)', canvas.renderAll.bind(canvas));

      return canvas;
    }

    function addImg(canvas, imgSrc, noCrop) {
      noCrop = noCrop || false;

      var img = document.createElement('img');
      img.src = imgSrc;

      img.onload = onImageLoad(canvas, img, noCrop);
    }

    function onImageLoad(canvas, img, noCrop) {
      return function() {
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
          imgInstance.scaleToHeight(canvas.height + 1);
          imgInstance.lockMovementY = true;
        } else {
          imgInstance.scaleToWidth(canvas.width + 1);
          imgInstance.lockMovementX = true;
        }

        if (noCrop) {
          imgInstance.lockMovementY = true;
          imgInstance.lockMovementX = true;
        }

        canvas.add(imgInstance);

      };
    }
  }

})();