angular
  .module('starter')
  .factory('blob', blob);

function blob() {
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

  return {
    canvasToBlob: canvasToBlob,
    b64ToBlob: b64ToBlob
  }
}