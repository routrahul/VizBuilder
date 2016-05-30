'use strict';

angular.module('LastMile.Factories', ['ngRoute'])

.factory('ProductFactory',['$scope',function(){

  return {
    getProductHttpObject : function(){
      return $http.get('/app/data/products.json');;
    }
  }
}])
