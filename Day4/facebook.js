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

  $http({
    url: "https://api.twitter.com/1.1/search/tweets.json",
    method: "GET",
    params: {
        /* text:"good news everyday", */
      access_token:"3039716836-PrmDqeMfsMhW4ZMiRG0k8fHmbaC6coEMk7SKKEW",
    }
  }).then(function(response) 
  {
    //console.log(response);
    $scope.brus = response.data;
  })

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
//   FB.api('/'+$routeParams.userID+'?metadata=1', function(response) 
//   {
//       console.log(response);
//   });

//   FB.api('/'+$routeParams.userID+'/accounts?fields=data,paging,summary,total_count', function(response) 
//   {
//       console.log(response);
//   });

//   FB.api('/'+$routeParams.userID+'/admined_groups?', function(response) 
//   {
//       console.log(response);
//   });

//   FB.api('/'+$routeParams.userID+'/albums?fields=id,count,cover_photo,created_time,description,event,from,link,location,name,place,privacy,type,updated_time', function(response) 
//   {
//       // $scope.albumID = response.data[1].id;
//       // console.log(response.data[1].id);
//       // FB.api('/'+$scope.albumID+'/photos?fields=id,count,cover_photo,created_time,description,event,from,link,location,name,place,privacy,type,updated_time', function(response) 
//       // {
//       //   console.log(response);
//       // });
//   });

//   FB.api('/'+$routeParams.userID+'/events?metadata=1', function(response) 
//   {
//       console.log(response);
//   });

//   FB.api('/'+$routeParams.userID+'/books?metadata=1', function(response) 
//   {
//       console.log(response);
//   });
});