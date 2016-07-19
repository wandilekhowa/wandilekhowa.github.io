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

  //var searchString        = encodeURI(#capetowns);
  var searchURL           = "https://search.twitter.com/search.json?q=%40capetown";
  $http.jsonp(searchURL).success(function(data)
  {
    console.log(data);
  })
  // var Twitter = require('twitter-js-client').Twitter;

  //   //Get this data from your twitter apps dashboard
  //   var config = {
  //       "consumerKey": "b21Mq7VV3sOKnvupl87ZatVei",
  //       "consumerSecret": "aWU5msqZ47zmivi5MF5rrdhdzfEvZqIEx0d7yIjYtNw2vsadLN",
  //       "accessToken": "3039716836-PrmDqeMfsMhW4ZMiRG0k8fHmbaC6coEMk7SKKEW",
  //       "accessTokenSecret": "9xUppaTn6gihmXQdFa7QP0FY1BYoa0zeCkVUE0RJs7yiV",
  //       "callBackUrl": "https://wandilekhowa.github.io/#/"
  //   }

  //   var twitter = new Twitter(config);
  //   twitter.getSearch({'q':'#capetown','count': 100}, error, success);


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