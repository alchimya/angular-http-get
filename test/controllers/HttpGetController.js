/**
 * Created by domenicovacchiano on 12/02/15.
 */
var httpGetController=angular.module('myApp.HttpGetController',[]);
httpGetController.controller('HttpGetController',function($scope){

    $scope.httpGETData={};
    $scope.isRequestInProgress=true;

    $scope.$on('ngDvHttpGet_DataChanged',function(event){
        $scope.isRequestInProgress=false;
    });

});
