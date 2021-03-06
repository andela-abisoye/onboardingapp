angular.module('TaskSrv', ['employapp']).factory('TaskService', [
  '$http',
  'CookieService',
  'SharedService',
function(
  $http,
  CookieService,
  SharedService
) {
  return {
    create: function(details) {
      return $http.post('http://localhost:3001/api/v1/tasks', details, {
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    },
    read: function(query) {
      var url = 'http://localhost:3001/api/v1/tasks';

      if (SharedService.isDefined(query.query)) {
        url = `${url}?`;
        Object.keys(query).forEach((key) => {
          url = `${url}${key}=${query[key]}`;
        });
      }

      return $http({
        method: 'GET',
        url: url,
        data: query,
        headers: {
          'x-access-token': CookieService.getToken()
        }
      });
    }
  };
}]);