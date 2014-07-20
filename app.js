angular.module('instaSearch', ['ngAnimate'])
  .controller('SearchCtrl', function($scope, $http){
    var loadImages = function(){
      var url = 'https://api.instagram.com/v1/tags/' + $scope.searchTerm + '/media/recent'
      var params = {
        client_id: '21560bbde39b44e1aeb207234486fa36',
        callback: 'JSON_CALLBACK'
      };

      $http({
        method: 'JSONP',
        url: url,
        params: params
      }).
      success(function(response){
        $scope.lastSearch = $scope.searchTerm;
        $scope.images = response.data;
        $scope.loading = false;
      }).
      error(function(){
        $scope.loading = false;
        $scope.instaError = true;
      });
    };

    $scope.searchInstagram = function(){
      $scope.lastSearch = null;
      $scope.images = [];
      $scope.submitted = true;
      $scope.instaError = false;
      if($scope.searchForm.$valid){
        $scope.submitted = false;
        $scope.loading = true;
        loadImages();
      }
    }
  });
