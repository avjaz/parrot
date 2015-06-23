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
        $scope.labels = labels.slice(0,7);
        $scope.allData = ratingsData;
        $scope.data = [
          ratingsData.slice(0,7) //7 days by default
        ];
        $scope.series = ['Ratings'];

        $scope.setGraphPeriod = function(days) {
          $scope.labels = labels.slice(0, days);
          $scope.data = [
            ratingsData.slice(0, days)
          ]
        }
      });


      $scope.pageTitle = 'Show Detail';
  }]);
