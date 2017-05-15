angular.module('thought').service('mainSvc', function($http) {
  this.getLiners = () => {
    return $http({
      method: 'GET',
      url: '/getLiners'
    }).then((res) => {
      return res.data;
    });
  }
  this.setLiner = (liner) => {
    return $http({
      method: 'POST',
      url: '/setLiner',
      data: liner
    }).then((res) => {
      return res.data;
    });
  }
  this.deleteLiner = (liner) => {
    return $http({
      method: 'DELETE',
      url: '/deleteLiner/' + liner
    }).then((res) => {
      return res.data;
    });
  }
});
