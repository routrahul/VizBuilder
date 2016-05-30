angular.module('LastMile', [
  'ngRoute',
  'leaflet-directive',
  'LastMile.Landing',
  'LastMile.map',
  'LastMile.SideMenu',
  'LastMile.RightSideMenu'
])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .otherwise({redirectTo: '/landing'})
}])

.factory('ProductFactory',['$http',function($http){
  return {
    getProductHttpObject : function(){
      return $http.get('http://'+host+':'+port+'/data/product/');;
    }
  }
}])

.factory('CitiesFactory',['$http',function($http){
  return {
    getCitiesHttpObject : function(){
      return $http.get('http://'+host+':'+port+'/data/city/');;
    }
  }
}])

.factory('RegionFactory',['$http',function($http){
  return {
    getRegionHttpObject : function(obj){
      return $http({
          method: 'POST',
          url: 'http://'+host+':'+port+'/data/region/',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $.param({cityId: obj.id})
      });
      // return $http.post('http://'+host+':'+port+'/data/region/', {"cityId":obj.id});
      // return $http.get();
    }
  }
}])
.factory('HeatmapFactory', ['$http', function($http){
  return {
        getHeatmapHttpObject : function(){
          return $http.get('http://'+host+':'+port+'/data/heatmap/');
      }
  }
}])

.factory('MapsFactory',['$http',function($http){
  var selectedProduct;
  var showRightPanel = false;
  return {
    setSelectedProduct : function(obj){
      selectedProduct = obj;
    },
    getSelectedProduct : function(){
      return selectedProduct
    },
    getShowRightPanel : function(){
      return showRightPanel;
    },
    setShowRightPanel : function(obj){
      showRightPanel = obj;
    }
  }
}]);
