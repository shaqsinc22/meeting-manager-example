(function() {
  "use strict";

  angular.module("app").controller("meetingsCtrl", function($scope, $http){

    $scope.setup = function(){
      $http.get('/api/v1/meetings.json').then(function(response){
        $scope.meetings = response.data;
      });
      $http.get('/api/v1/tags.json').then(function(response){
        $scope.tags = response.data;
      });
    };

    $scope.filterByTag = function(tag){
      if (tag) {
      $scope.tagFilterId = tag.id
      } else{
        $scope.tagFilterId = null;
      };
    };

    $scope.matchTag = function(meeting){
      if ($scope.tagFilterId) {
        for (var i = 0; i < meeting.tags.length; i++){
          var tag = meeting.tags[i];
          if (tag.id === $scope.tagFilterId) {
            return true;
          };
        };
        return false;
      } else {
        return true;
      };
    };

    $scope.changeOrderAttribute = function(attribute){
      if (attribute !== $scope.orderAttribute) {
        $scope.descending = false;
      } else {
        $scope.descending = !$scope.descending;
      };
      $scope.orderAttribute = attribute;
    };

  });
}());
