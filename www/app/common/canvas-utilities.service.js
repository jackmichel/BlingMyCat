angular
  .module('starter')
  .factory('canvasUtilities', canvasUtilities);

function canvasUtilities() {

  function createCanvas(element) {
    var canvasWidth = window.screen.width;
    var canvasHeight = canvasWidth;

    var canvas = new fabric.Canvas(element, { width: canvasWidth, height: canvasHeight });
    canvas.setBackgroundColor('rgba(0, 0, 0, 1.0)', canvas.renderAll.bind(canvas));

    return canvas;
  }

  function addImgDataUrl(canvas, imgDataUrl) {
    var img = document.createElement('img');
    img.src = 'data:image/jpeg;charset=utf-8;base64,' + imgDataUrl;
    var imgInstance;

    img.onload = function() {
      imgInstance = new fabric.Image(img, {
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
    }

  } 

  function addImgSrc(canvas, imgSrc) {
    var img = document.createElement('img');
    img.src = imgSrc;

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
  } 

  return {
    createCanvas: createCanvas,
    addImgSrc: addImgSrc,
    addImgDataUrl: addImgDataUrl
  }

}