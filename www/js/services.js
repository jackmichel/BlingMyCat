angular.module('starter.services', [])

.factory('FileService', function() {
  var images;
  var IMAGE_STORAGE_KEY = 'images';
 
  function getImages() {
    var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
    if (img) {
      images = JSON.parse(img);
    } else {
      images = [];
    }
    return images;
  };
 
  function addImage(img) {
    images.push(img);
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    alert(window.localStorage.getItem(IMAGE_STORAGE_KEY));
  };
 
  return {
    storeImage: addImage,
    images: getImages
  }
})

.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {
 
  function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
 
  function optionsForType(type) {
    var source;
    switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    return {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 1280,
      targetHeight: 1280,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };
  }
 
  function saveMedia(type) {
    return $q(function(resolve, reject) {
      var options = optionsForType(type);
 
      $cordovaCamera.getPicture(options).then(function(imageUrl) {
        var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
        var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
          .then(function(info) {
            alert('copy worked');
            FileService.storeImage(newName);
            resolve();
          }, function(e) {
            alert(JSON.stringify(e));
            reject();
          });
      });
    })
  }
  return {
    handleMediaDialog: saveMedia
  }
});