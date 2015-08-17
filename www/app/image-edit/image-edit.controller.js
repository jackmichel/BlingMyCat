(function() {
  'use strict';

  angular
    .module('BlingMyCat')
    .controller('ImageEditCtrl', ImageEditCtrl);

  function ImageEditCtrl($stateParams, camera, $state, $ionicViewSwitcher, $ionicPopup) {
    var vm = this;

    vm.currentImage = $stateParams.image;
    vm.goHome = goHome;

    function goHome() {
      var confirm = $ionicPopup.confirm({
        title: 'Go home without saving?',
        subTitle: 'Are you sure you want to go home? Your image will not be saved.',
        okText: 'Yes',
        okType: 'button-energized',
        cancelText: 'Cancel'
      });
      confirm.then(function (answer) {
        if (answer) {
          $ionicViewSwitcher.nextDirection('back');
          $state.go('tab.image-view');
        }
      });
    }
  }

})();
