/**
 * Created by domenicovacchiano on 12/02/15.
 */
/**
 * @name        ngDvHttpGet
 * @restrict    E
 * @description
 * Allows to execute a GET on a remote server
 * @isolated_scope
 * ------------------------------------------------------------------------------------------------------
 * attr name        type                description
 * ------------------------------------------------------------------------------------------------------
 * url          one-way binding     Absolute or relative URL of the resource that is being requested.
 * headers      one-way binding     Map of strings or functions which return strings representing HTTP headers to
 *                                  send to the server. If the return value of a function is null, the header will
 *                                  not be sent. Functions accept a config object as an argument
 * params       one-way binding     Map of strings or objects which will be turned to ?key1=value1&key2=value2
 *                                  after the url. If the value is not a string, it will be JSONified.
 * remoteData   two-way binding     Set here your data source  for the response body
 * ------------------------------------------------------------------------------------------------------
 * @events
 * ------------------------------------------------------------------------------------------------------
 * name                     data               description
 * ------------------------------------------------------------------------------------------------------
 * ngDvHttpGet_DataChanged          --         it will be raised when your data source changes, generally
 *                                             if the the success promise method will be invoked
 *
 * ------------------------------------------------------------------------------------------------------

 *  -------------------------------------------------------------
 *  Events implementations
 *  -------------------------------------------------------------
 *  $scope.$on('ngDvHttpGet_DataChanged',function(event){
 *       //your code
 *   });
 *  -------------------------------------------------------------
 * @example
 *  <ng-dv-http-get url="https://api.github.com/users/alchimya/repos"  remote-data="httpGETData">
 *      <table>
 *          <thead>
 *              <tr>
 *                  <th>Name</th>
 *                  <th>Url</th>
 *              </tr>
 *          </thead>
 *          <tbody>
 *              <tr ng-repeat="item in httpGETData">
 *                  <td>
 *                  {{item.name}}
 *                  </td>
 *                  <td>
 *                      <a href="{{item.html_url}}" target="_blank">{{item.html_url}}</a>
 *                  </td>
 *              </tr>
 *          </tbody>
 *      </table>
 *  </ng-dv-http-get>
 *  -------------------------------------------------------------
 *  For the previous example I used the controller below
 *  Invoke the startProgress function.
 *  -------------------------------------------------------------
 *  var httpGetController=angular.module('myApp.HttpGetController',[]);
 *  httpGetController.controller('HttpGetController',function($scope){
 *      $scope.httpGETData={};
 *      $scope.isRequestInProgress=true;
 *      $scope.$on('ngDvHttpGet_DataChanged',function(event){
 *          $scope.isRequestInProgress=false;
 *      });
 *   });
 *  -------------------------------------------------------------
 */
var ngDvHttpGet=angular.module('ngDvHttpGet',[]);
ngDvHttpGet.directive('ngDvHttpGet',function($http,$q,$compile){

    return{
        restrict:'E',
        replace: false,
        scope:{
            url:'@',
            headers:'@',
            params:'@',
            remoteData:'='
        },
        link: function(scope,element,attrs,ctrl){

            //scope params controls
            if (scope.url===undefined){
                throw new Error("Invalid url attribute");
            }
            if (scope.remoteData===undefined){
                throw new Error("Invalid remote-data attribute");
            }

            if (element.html().trim().length != 0) {
                element.append($compile(element.contents())(scope));
            }

            //send a get request to the remote HTTP server
            $http({
                method: "GET",
                url:scope.url ,
                headers:scope.headers,
                params:scope.params
            })
            .success(function (data, status, headers, config) {
                scope.remoteData=data;
            })
            .error(function (data, status, headers, config) {
                throw new Error(data.message + " " + status);
            });

            scope.$watch("remoteData",function(newValue,oldValue){
                //watch on the remoteData attribute
                if (newValue==oldValue){
                    return;
                }
                scope.$emit("ngDvHttpGet_DataChanged");
            });

        }


    };

});
