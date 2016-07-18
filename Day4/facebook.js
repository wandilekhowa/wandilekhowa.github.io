var app = angular.module("CitiMood", ["firebase", "ngRoute" ]);

app.config(function($routeProvider) 
{

  $routeProvider.when('/', {
  controller: 'MainCtrl',
  templateUrl: 'Day4/home.html',
  })

  $routeProvider.when('/username/userID/:user_name/:bio/', {
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
  $scope.bio = $routeParams.bio;
  console.log($routeParams.user_name+" "+$routeParams.user_id);
  FB.api('/me?fields=id,about,bio,name,email,quotes, cover', function(response) 
  {
      console.log(response);
      //window.location.href = "/#/username/userID/"+response.name+"/"+response.id;
      // console.log('Successful login for: ' + response.name);
      // document.getElementById('status').innerHTML =
      //   'Thanks for logging in, ' + response.name + '!';
    });
  // $http({
  //   url: "https://graph.facebook.com/me?",
  //   method: "GET",
  //   // params:{
  //   //   access_token: $routeParams.token,
  //   // },
  //   fields:{
  //     id: $scope.userId,
  //     name: $scope.userName
  //   }
  // }).then(function(response) 
  // {
  //   console.log(response);
    
  // })
});