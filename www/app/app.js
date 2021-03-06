angular.module('BlingMyCat', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "app/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.image-view', {
    url: '/image-view',
    views: {
      'tab-image-view': {
        templateUrl: 'app/tab-image-view/tab-image-view.html',
        controller: 'ImageViewCtrl as view'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'app/tab-about/tab-about.html'
      }
    }
  })

  .state('image-edit', {
    url: '/image-edit/:image',
    templateUrl: 'app/image-edit/image-edit.html',
    controller: 'ImageEditCtrl as edit'
  })

  .state('image-crop', {
    url: '/image-edit/:image',
    templateUrl: 'app/image-crop/image-crop.html',
    controller: 'ImageCropCtrl as crop'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/image-view');

});
