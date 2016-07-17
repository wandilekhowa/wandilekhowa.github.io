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
    url: "https://graph.facebook.com/me?",
    method: "GET",
    params: {
      access_token:"EAACEdEose0cBALlbYJiaCS1Pb5TYZA8IW4BIH8EIPEZCTeqhJ7YRasl9uy7FC4dXw0Ec1iNnWt9LluwZBIeMWx8nsrjHb4OHmumbS1QABvNHmcHmIbZCMI6bYHZCWrjSFZBPIft9GrGqeT71pRhLZC53FQE9nEs0ZCIeNUxBbkoHtgZDZD",
    },
    fields: {
      id: $routeParams.user_id,
      name: $routeParams.user_name
    }
  }).then(function(response) 
  {
    console.log(response);
    $scope.userInfo = response.data;
  })
});