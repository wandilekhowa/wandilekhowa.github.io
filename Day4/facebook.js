var app = angular.module("CitiMood", ["firebase", "ngRoute" ]);

app.config(function($routeProvider) 
{

  $routeProvider.when('/', {
  controller: 'MainCtrl',
  templateUrl: 'Day4/home.html',
  })

  $routeProvider.when('/user/:userObj/', {
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
  console.log($routeParams.userObj);
  $scope.userName = $routeParams.userObj.name;
  // $scope.home = $routeParams.userObj.location.name;
  // if($routeParams.userObj.bio instanceof String)
  // {  
  //   console.log("It's a string");
  //   $scope.bio = $routeParams.userObj.bio;
  // }
  // else
  // {
  //   $scope.bio = "";
  // }
  FB.api('/me?fields=id,name,cover,hometown,about,bio,gender,languages,link,locale,location,updated_time,timezone,work', function(response) 
  {
      $scope.userName = response.name;
      console.log($scope.userName+"Hey bru");
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