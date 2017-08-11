angular.module('starter', ['ionic', 'starter.controllers'])

//.run' is from the templates, and every AngularJS project needs it to start, so I did not touch it
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
     
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
   
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      //set up state for 'account' tab 
      .state('tab.account', {
        //file location
        url: '/account',
        //how it to be viewed 
        views: {
          'tab-account': {
            //connect it to its html file
            templateUrl: 'templates/tab-account.html',
            //connect it to its controller 
            controller: 'AccountCtrl'
          }
        }
      })

      //set up state for 'schedule' tab 
      .state('tab.schedule', {
        url: '/schedule',
        views: {
          'tab-schedule': {
            templateUrl: 'templates/tab-schedule.html',
            controller: 'ScheduleCtrl'
          }
        }
      })

      //set up state for 'detail' slide botton
      .state('tab.detail', {
        url: '/detail',
        //it needs the intial value to load (I just set it to null)
        params: {
          data: null
        },
        views: {
          'tab-schedule': {
            templateUrl: 'templates/tab-detail.html',
            controller: 'detailCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/account');

  });
