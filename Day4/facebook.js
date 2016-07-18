var app = angular.module("CitiMood", ["firebase", "ngRoute" ]);

app.config(function($routeProvider) 
{

  $routeProvider.when('/', {
  controller: 'MainCtrl',
  templateUrl: 'Day4/home.html',
  })

  $routeProvider.when('/user/:userID/', {
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
  console.log($routeParams.userID);
  // $scope.userName = $routeParams.userObj.name;
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
  FB.api('/'+userID+'?metadata=1', function(response) 
  {
      console.log(response);
  });

  FB.api('/'+userID+'/accounts?fields=data,paging,summary,total_count', function(response) 
  {
      console.log(response);
  });

  FB.api('/'+userID+'/admined_groups?', function(response) 
  {
      console.log(response);
  });

  FB.api('/'+userID+'/albums?fields=id,count,cover_photo,created_time,description,event,from,link,location,name,place,privacy,type,updated_time', function(response) 
  {
      $scope.albumID = response.data[1].id;
      console.log(response.data[1].id);
      FB.api('/'+$scope.albumID+'/photos?metadata=1', function(response) 
      {
        console.log(response);
      });
  });

  FB.api('/'+userID+'/events?metadata=1', function(response) 
  {
      console.log(response);
  });

  FB.api('/'+userID+'/books?metadata=1', function(response) 
  {
      console.log(response);
  });
});