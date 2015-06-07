(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .factory('canvasUtilities', canvasUtilities);

  function canvasUtilities() {

    return {
      createCanvas: createCanvas,
      addImgSrc: addImgSrc,
      addImgDataUrl: addImgDataUrl
    }

    ////////////

    function createCanvas(element) {
      var canvasWidth = window.screen.width;
      var canvasHeight = canvasWidth;

      var canvas = new fabric.Canvas(element, { width: canvasWidth, height: canvasHeight });
      canvas.setBackgroundColor('rgba(0, 0, 0, 1.0)', canvas.renderAll.bind(canvas));

      return canvas;
    }

    function addImgSrc(canvas, imgSrc) {
      var img = document.createElement('img');
      img.src = cordova.file.dataDirectory + imgSrc;

      img.onload = onImageLoad(canvas, img);
    } 

    function addImgDataUrl(canvas, imgDataUrl) {
      var img = document.createElement('img');
      img.src = 'data:image/jpeg;charset=utf-8;base64,' + imgDataUrl;

      img.onload = onImageLoad(canvas, img);
    } 

    function onImageLoad(canvas, img) {
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

        canvas.add(imgInstance);

      };
    }
  }

})();