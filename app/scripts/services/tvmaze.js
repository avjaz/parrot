'use strict';

angular.module('tvMazeService', ['ngResource'])
  .factory('tvMaze', ['$http', '$q', function($http, $q){
    var shows = {};   //The 'cache' of shows - a map keyed by show name, value is show data
    var url = 'http://api.tvmaze.com/singlesearch/shows?embed[]=episodes&embed[]=cast&q=';
    return {
      get: function(showTitle) {
        var deferred = $q.defer();
        if (shows[showTitle] === undefined) {
          $http.get(url + showTitle)
            .success(function(data){
              data.summary = data.summary.replace(/<[^>]+>/gm, '');
              deferred.resolve(data);
            })
            .error(function(data, status) {
              console.log("Error: " + data + " " + status); //FIXME - do some better error handling
            });
        }
        else {
          deferred.resolve(shows[showTitle]);
        }
        return deferred.promise;

      },
      getAll: function(showTitles) {
        var deferred = $q.defer();
        for (var i = 0; i < showTitles.length; i++) {
          var showTitle = showTitles[i];
          $http.get(url + showTitle)
            .success(function(data){
              //Remove all the html tags
              data.summary = data.summary.replace(/<[^>]+>/gm, '');

              //Put show into the 'cache'
              shows[data.name] = data;

              //If all shows are in the 'cache' resolve the deferred
              if (Object.keys(shows).length === showTitles.length) {
                deferred.resolve(shows);
              }
            })
            .error(function(data, status) {
              console.log("Error: " + data + " " + status); //FIXME - do some better error handling
            });
        }
        return deferred.promise;
      }
    };
  }]);
