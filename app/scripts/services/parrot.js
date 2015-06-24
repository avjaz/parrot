'use strict';

angular.module('parrotApiService', ['ngResource'])
  .factory('ratings', ['$q', '$http', function($q, $http){
    var apiKey = 'h0y3PiuUHytcS1p6mTO8';
    var url = 'http://api.parrotanalytics.com/ratings?key=' + apiKey + '&period=30&title=';

    return {
      get: function(showTitle) {
        var deferred = $q.defer();

        $http.get(url + showTitle)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            console.log('Error: ' + data + ' ' + status);
          });

        //deferred.resolve({
        //  "ratings" : {
        //    "2015-05-22" : 8.6,
        //    "2015-05-23" : 9.5,
        //    "2015-05-24" : 9.2,
        //    "2015-05-25" : 8.7,
        //    "2015-05-26" : 9.5,
        //    "2015-05-27" : 8.5,
        //    "2015-05-28" : 9.7,
        //    "2015-05-29" : 9.0,
        //    "2015-05-30" : 9.3,
        //    "2015-05-31" : 8.1,
        //    "2015-06-01" : 8.7,
        //    "2015-06-02" : 8.6,
        //    "2015-06-03" : 9.2,
        //    "2015-06-04" : 8.2,
        //    "2015-06-05" : 9.8,
        //    "2015-06-06" : 8.4,
        //    "2015-06-07" : 8.2,
        //    "2015-06-08" : 9.5,
        //    "2015-06-09" : 9.2,
        //    "2015-06-10" : 9.7,
        //    "2015-06-11" : 9.8,
        //    "2015-06-12" : 8.6,
        //    "2015-06-13" : 8.9,
        //    "2015-06-14" : 9.0,
        //    "2015-06-15" : 8.1,
        //    "2015-06-16" : 8.4,
        //    "2015-06-17" : 8.2,
        //    "2015-06-18" : 9.7,
        //    "2015-06-19" : 8.4,
        //    "2015-06-20" : 8.8
        //  },
        //  "id" : "82",
        //  "title" : "Game Of Thrones",
        //  "country" : "US"
        //});

        return deferred.promise;
      }
    }

  }]);
