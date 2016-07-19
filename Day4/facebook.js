var app = angular.module("CitiMood", ["firebase", "ngRoute" ]);

app.config(function($routeProvider) 
{

  $routeProvider.when('/', {
  controller: 'MainCtrl',
  templateUrl: 'Day4/home.html',
  })

  $routeProvider.when('/user/:userID/:userName/:userHometown', {
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

app.controller("ProfileCtrl", function($scope, $http ,$routeParams, $firebaseArray, $firebaseObject, $firebaseAuth) 
{
  var id = $routeParams.userID;
  $scope.ref = firebase.database().ref().child("Users");
  $scope.Users = $firebaseArray($scope.ref.child($routeParams.userID));
  $scope.pictures = [];
  console.log($routeParams.userID);
  $scope.userName = $routeParams.userName;
  $scope.home = $routeParams.userHometown;
  FB.api('/me?fields=id,name,cover,hometown,about,bio,gender,picture,languages,link,locale,location,updated_time,timezone,work', function(response) 
  {
    console.log(response);
    $scope.ref.child($routeParams.userID).child("Personal").push(response);
  });

  FB.api('/'+$routeParams.userID+'/albums?fields=id,count,cover_photo,created_time,description,event,from,link,location,name,place,privacy,type,updated_time', function(response) 
  {
      $scope.picLikes = 0;
      $scope.commentTotal = 0;
       $scope.albumID = response.data[1].id;
       $scope.profAlbum = response.data[2].id;
       console.log(response);
       FB.api('/'+$scope.albumID+'/photos?fields=id,count,cover_photo,comments,likes,source,caption,created_time,description,event,from,link,location,name,place,privacy,type,updated_time', function(response) 
       {
            console.log(response);
            $scope.ref.child($routeParams.userID).child("Photos").push(response.data);
            var users = firebase.database().ref().child("Users");
            var userObject = $firebaseObject(users);

            userObject.$loaded().then(function() 
            {
              console.log("I am inside");
                angular.forEach(userObject, function(value, key)
                {
                  if(key==id)
                  {
                    console.log(value);
                    $scope.myPhotos = value.Photos;
                    angular.forEach($scope.myPhotos, function(value, key)
                    {
                      if(key==Object.keys($scope.myPhotos)[0])
                      {
                        console.log(value);
                        for(var i=0; i<value.length;i++)
                        {
                            try
                            {
                              $scope.picLikes += value[i].likes.data.length;
                            }
                            catch(error)
                            {

                            }
                            try
                            {
                              $scope.commentTotal += value[i].comments.data.length;
                            }
                            catch(error)
                            {

                            }
                        }
                      }
                    });
                  }
                });
            });
       });
  });

  FB.api('/'+$routeParams.userID+'/events?fields=id,attending_count,cover,category,description,declined_count,end_time,interested_count,maybe_count,name,place,start_time,timezone,type,updated_time', function(response) 
  {
      $scope.ref.child($routeParams.userID).child("Events").push(response.data);
  });

  FB.api('/'+$routeParams.userID+'/posts?fields=likes,comments', function(response) 
  {
      $scope.postLikes = 0;
      $scope.postComments = 0;
      console.log("fetching feed");
      console.log(response);
      $scope.ref.child($routeParams.userID).child("Posts").push(response.data);
            var users = firebase.database().ref().child("Users");
            var userObject = $firebaseObject(users);
            userObject.$loaded().then(function() 
            {
              console.log("I am inside posts");
                angular.forEach(userObject, function(value, key)
                {
                  if(key==id)
                  {
                    console.log(value);
                    $scope.myPosts = value.Posts;
                    angular.forEach($scope.myPosts, function(value, key)
                    {
                      if(key==Object.keys($scope.myPosts)[0])
                      {
                        console.log(value);
                        for(var i=0; i<value.length;i++)
                        {
                            try
                            {
                              $scope.postLikes += value[i].likes.data.length;
                            }
                            catch(error)
                            {

                            }
                            try
                            {
                              $scope.postComments += value[i].comments.data.length;
                            }
                            catch(error)
                            {

                            }
                        }
                        $scope.totalLikes = $scope.picLikes + $scope.postLikes;
                        $scope.totalComments = $scope.postComments + $scope.commentTotal;
                        console.log($scope.totalLikes);
                        console.log($scope.totalComments);
                      }
                    });
                  }
                });
            });
  });
});