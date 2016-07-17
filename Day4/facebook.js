var app = angular.module("CitiMood", ["firebase", "ngRoute" ]);

app.config(function($routeProvider) 
{

  $routeProvider.when('/', {
  controller: 'MainCtrl',
  templateUrl: 'Day4/home.html',
  })

  $routeProvider.when('/username/userID/:user_name/:user_id/:token', {
  controller: 'ProfileCtrl',
  templateUrl: 'Day4/profile.html',
  })
});

var dateConverter = function timeConverter(UNIX_timestamp)
{
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = Math.round(a.getFullYear());
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var amm = " AM";
    if(hour>=12)
    {
      amm = " PM";
    }
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min+amm;
    return time;
}  

app.controller("MainCtrl", function($scope, $firebaseArray) 
{

});

app.controller("ProfileCtrl", function($scope, $http ,$routeParams, $firebaseArray) 
{
  $scope.userName = $routeParams.user_name;
  $scope.userId = $routeParams.user_id;
  console.log($routeParams.user_name+" "+$routeParams.user_id+" "+$routeParams.token);
  $http({
    url: "https://www.facebook.com/dialog/oauth?client_id=269074203460979&redirect_uri=https://wandilekhowa.github.io/#/",
    // url: "https://graph.facebook.com/oauth/access_token?client_id=269074203460979&client_secret=bcfd7d1a64a493ac79f1a4d47055702b&grant_type=client_credentials" +"&redirect_uri=https://wandilekhowa.github.io/#/&scope=user_about_me",
    method: "GET",
  }).then(function(response) 
  {
    //console.log(response);
    // $scope.userInfo = response.data;
    // var myToken = $scope.userInfo.split("=");
    // console.log(myToken);
    // $scope.token = myToken[1];
  //   $http({
  //   url: "https://graph.facebook.com/me?",
  //   method: "GET",
  //   params:{
  //     access_token: $scope.token,
  //   },
  //   fields:{
  //     id: $scope.userId,
  //     name: $scope.userName
  //   }
  // }).then(function(response) 
  // {
  //   console.log(response);
    
  // })
  })
});