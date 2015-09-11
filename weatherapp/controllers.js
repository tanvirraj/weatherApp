

//controller
weatherApp.controller('homeCtrl',['$scope','citynameService', function($scope, citynameService) {
    $scope.cityName = citynameService.cityName;
    $scope.$watch('cityName', function(){
        citynameService.cityName = $scope.cityName;
    })
}]);

weatherApp.controller('forecastCtrl' , ['$scope', '$resource','$routeParams', 'citynameService',
    function($scope ,$resource ,$routeParams ,citynameService) {

        $scope.cityName = citynameService.cityName;
        $scope.days = $routeParams.days || '2';
        $scope.weatherAPI=
            $resource("http://api.openweathermap.org/data/2.5/forecast/daily" , { callback: "JSON_CALLBACK"} ,
                { get: { method: "JSONP" }});

        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.cityName , cnt: $scope.days });

        $scope.convertToFahrenheit= function(dgk){

            return Math.round((1.8 * (dgk - 273)) + 32);
        };

        $scope.convertToCelsius = function(dgk){
            return Math.round(dgk - 273);
        }

        $scope.convertToDate = function(dt) {
            return new Date(dt * 1000 );
        }
    }]);
