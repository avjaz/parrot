'use strict';

/**
 * @ngdoc function
 * @name parrotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parrotApp
 */
angular.module('parrotApp')
  .controller('MainCtrl', ['$scope', '$filter', 'tvMaze', 'ngTableParams',
    function ($scope, $filter, tvMaze, ngTableParams) {

    var allShows = [
      '12 Monkeys',
      '90210',
      'Adventure Time',
      'American Odyssey',
      'Aquarius',
      'Beauty and the Beast',
      'Better Call Saul',
      'Breaking Bad',
      'Castle',
      'Chicago Pd',
      'Covert Affairs',
      'Criminal Minds',
      'Daredevil',
      'Dawson\'s Creek',
      'Defiance',
      'Dexter',
      'Doctor Who',
      'Drake and Josh',
      'Durarara!!',
      'Er',
      'Game Of Thrones',
      'Girls',
      'Graceland',
      'Grey\'s Anatomy',
      'Hannibal',
      'House Of Cards',
      'How I Met Your Mother',
      'Marco Polo',
      'Marvel\'s Agent Carter',
      'Modern Family',
      'Mr. Robot',
      'NCIS',
      'Orange Is The New Black',
      'Orphan Black',
      'Outlander',
      'Penny Dreadful',
      'Reign',
      'Sense8',
      'Shameless (US)',
      'Silicon Valley',
      'Stalker',
      'Suits',
      'Texas Rising',
      'The Amazing Race',
      'The Big Bang Theory',
      'The Flash',
      'The Messengers',
      'The Musketeers',
      'The Whispers',
      'True Detective'
    ];

    $scope.tableParams = new ngTableParams(
      {
        page: 1,
        count: 4,
        sorting: {
          name: 'asc'
        }
      },
      {
        counts: [],
        total: allShows.length,
        getData: function($defer, params) {
            tvMaze.getAll(allShows).then(function (data) {
              var shows = [];
              for (var key in data) {
                shows.push(data[key]);
              }

              $defer.resolve(shows.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            });
        }
      }
    );

    $scope.pageTitle = 'Landing Page';
  }]);
