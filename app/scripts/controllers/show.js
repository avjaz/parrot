'use strict';

/**
 * @ngdoc function
 * @name parrotApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the parrotApp
 */
angular.module('parrotApp')
  .controller('ShowCtrl', ['$scope', 'tvMaze', '$routeParams', 'ratings',
function ($scope, tvMaze, $routeParams, ratings) {
  tvMaze.get($routeParams.show).then(function(data) {
    $scope.show = data;

    var episodes = data._embedded.episodes,
      currentSeason = '',
      seasonCount = 0;
    for (var i = 0; i < episodes.length; i++) {
      if (episodes[i].season !== currentSeason) {
        currentSeason = episodes[i].season;
        seasonCount ++;
      }
    }

    $scope.seasonCount = seasonCount;
  });
  ratings.get($routeParams.show).then(function(data) {
    var ratings = data.ratings,
      labels = [],
      ratingsData = [];
    for (var day in ratings) {
      labels.push(moment(day, 'YYYY-MM-DD').format('ddd M/DD'));
      ratingsData.push(ratings[day]);
    }

    $scope.allLabels = labels;
    $scope.allData = ratingsData;

    $scope.setGraphPeriod = function(type, days) {
      if (type === 'line') {
        $scope.lineLabels = labels.slice(0, days);
        $scope.lineRatings = [
          ratingsData.slice(0, days)
        ]
      }
      else if (type === 'bar') {
        $scope.barLabels = labels.slice(0, days);
        $scope.barRatings = [
          ratingsData.slice(0, days)
        ]
      }
    };

    $scope.series = ['Ratings'];

    $scope.setGraphPeriod('line', 7);
    $scope.setGraphPeriod('bar', 7);
  });

  $scope.pageTitle = 'Show Detail';
}]);
