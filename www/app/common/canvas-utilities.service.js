(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('canvasUtilities', canvasUtilities);

  function canvasUtilities() {

    return {
      createCanvas: createCanvas,
      addImg: addImg,
      addBlingImg: addBlingImg
    }

    ////////////

    function createCanvas(element) {
      var canvasWidth = window.screen.width;
      var canvasHeight = canvasWidth;

      var canvas = new fabric.Canvas(element, { 
        width: canvasWidth, 
        height: canvasHeight,
        selection: false
      });
      canvas.setBackgroundColor('rgba(0, 0, 0, 1.0)', canvas.renderAll.bind(canvas));

      /* MAYBE USEFUL 
      var lastActiveObject = null;

      canvas.on('before:selection:cleared', function() {
        lastActiveObject = canvas.getActiveObject();
      });

      canvas.on('selection:cleared', function() {
        canvas.setActiveObject(lastActiveObject);
      });
      */

      return canvas;
    }

    function addImg(canvas, imgSrc, noCrop, noSelect) {
      noCrop = noCrop || false;
      noSelect = noSelect || false; 

      var img = document.createElement('img');
      img.src = imgSrc;

      img.onload = onImageLoad(canvas, img, noCrop, noSelect);
    }

    function onImageLoad(canvas, img, noCrop, noSelect) {
      return function() {
        var imgInstance = new fabric.Image(img, {
            top: 0,
            left: 0
        });

        imgInstance.set({
          borderColor: 'black',
          cornerColor: 'black',
          cornerSize: 30,
          transparentCorners: true
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

        if (noSelect) {
          imgInstance.selectable = false;
        }

        canvas.add(imgInstance);

      };
    }

    function addBlingImg(canvas, imgSrc) {
      var img = document.createElement('img');
      img.src = imgSrc;

      img.onload = onBlingLoad(canvas, img);
    }

    function onBlingLoad(canvas, img) {
      return function() {
        var imgInstance = new fabric.Image(img, {
            top: 0,
            left: 0
        });
        imgInstance.set({
          borderColor: 'black',
          cornerColor: 'black',
          cornerSize: 30,
          transparentCorners: true
        });
        canvas.add(imgInstance);
      };
    }
  }

})();