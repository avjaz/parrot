'use strict';

angular.module('tvMazeService', ['ngResource'])
  .factory('tvMaze', ['$resource', '$q', function($resource, $q){
    var shows = {};
    return {
      get: function(showTitle) {
        var deferred = $q.defer();
        if (shows[showTitle] === undefined) {
          var Show = $resource('http://api.tvmaze.com/singlesearch/shows', {q: showTitle, embed: 'episodes'});
          Show.get(
            function(data) {
              data.summary = data.summary.replace(/<[^>]+>/gm, '');
              deferred.resolve(data);
            },
            function(reason) {
              console.log('Error:' + reason);
            }
          );
        }
        else {
          deferred.resolve(shows[showTitle]);
        }
        return deferred.promise;

      },
      getAll: function(showTitles) {
        var deferred = $q.defer();
        for (var i = 0; i < 50; i++) {
          var showTitle = showTitles[i];
          var Show = $resource('http://api.tvmaze.com/singlesearch/shows', {q: showTitle, embed: 'cast'});
          Show.get(
            function(data) {
              data.summary = data.summary.replace(/<[^>]+>/gm, '');
              shows[data.name] = data;      //Put into 'cache'
              if (Object.keys(shows).length === showTitles.length) {
                deferred.resolve(shows);
              }
            },
            function(reason) {
              console.log('Error:' + reason);
            }
          );
        }
        return deferred.promise;
      }
    };
  }]);
