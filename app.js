var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);



weatherApp.config(function($routeProvider){
    
    
    
    $routeProvider
    
    .when('/',{
        templateUrl:'pages/home.htm',
        controller:'homecontroller'
        
    })
    
    
    .when('/forecast',{
        templateUrl:'pages/forecast.htm',
        controller:'forecastcontroller'
        
    })
    
    .when('/forecast/:days',{
        templateUrl:'pages/forecast.htm',
        controller:'forecastcontroller'
        
    })
    
    
});




weatherApp.service('cityservice',function(){
    this.city ="florida";
    
});
weatherApp.controller('homecontroller',['$scope','cityservice',function($scope,cityservice){
    $scope.city= cityservice.city;
    
     $scope.$watch('city',function(){  
        cityservice.city = $scope.city; 
     });
    
}]);


weatherApp.controller('forecastcontroller',['$scope','$resource','$routeParams','cityservice',function($scope,$resource,$routeParams,cityservice){
     $scope.city = cityservice.city;
    $scope.days = $routeParams.days||'2';
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({APPID:"0b3cc7b8a4eec1770bf503366f9b01e0",q:$scope.city,cnt:$scope.days});
$scope.convertToFarenhite = function(degk){
    return Math.round((1.8*(degk-273))+32);
    
    
    
}
   $scope.convetToDate = function(dt){
       
       return new Date(dt*1000);
   }
}]);