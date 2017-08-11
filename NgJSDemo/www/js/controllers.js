angular.module('starter.controllers', [])

  .controller('ScheduleCtrl', function ($scope, $rootScope, $http, $state) {
    //schedule can't be viewed if user has not login yet  
    if ($rootScope.isLogin == false || $rootScope.isLogin == undefined) {
      alert("please login to see more");
      //stay on account tab
      $state.go('tab.account')
    } else {

      //if login, go fetch data
      $http({
        method: "get",
        //where my dummy data is
        url: '../json/data.js'

      }).then(function (response) {
        //store the fetched data to 'data'
        var data = response.data.detail;

        //this will be the showing result
        $scope.result = []

        //loop through the fetched data, and store them into the 'showing result'
        for (var i = 0; i < data.length; i++) {
          if (data[i].name === $rootScope.user.name) {
            $scope.result.push(data[i])
          }
        }

      }, function (response) {
        //if the request data did not find
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
      });
    }

    //function for the slide 'detal' botton
    $scope.detail = function (obj) {
      
      var identity = {
        "test": obj
      }
      $state.go('tab.detail', {
        data: identity
      });
    }

  })

  //controller for 'detail' page
  .controller('detailCtrl', function ($scope, $rootScope, $stateParams) {

    $scope.obj = $stateParams.data.test;
  })

  //controller for 'account' page
  .controller('AccountCtrl', function ($scope, $rootScope, $http) {

    if ($rootScope.isLogin == undefined) {
      $rootScope.isLogin = false;
    }

    $scope.userInfo = {};

    $scope.login = function (userInfo) {     

      $http({
        method: "get",
        url: '../json/data.js'
      }).then(function (response) {
        
        //store the 'register' info in into temp var 'data'
        var data = response.data.register;
        //if the found 'email' equals to the input for email, store it into 'result'
        var result = data.find(x => x.email === userInfo.email)

        //when nothing is found
        if (result === undefined) {
          alert("user name does not exist")
        //meanwile matching its password as well   
        } else if (result.password === userInfo.password) {
          alert("login successs")
          //when email and password both are matched set 'isLogin' to true
          $rootScope.isLogin = true;
          //once login is true, set up rootScope, so this info can be shareed in this app
          $rootScope.user = response.data.userData.find(x => x.name === result.name)
          
        } else {
          alert("login fail")
        }
      }, function (response) {
       
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
      });
    }

    $scope.logout = function () {      
      $rootScope.user = {}
      $rootScope.isLogin = false;
    }
  })




