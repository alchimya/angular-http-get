# angular-http-get
An AngularJs directive to request data via $http.get

# How to use
<h5>isolatd scope data</h5>
  attr name   |     type        |   description    
--------------| ----------------|-------------------------------------------------------------------
url           | one-way binding | Absolute or relative URL of the resource that is being requested
headers       | one-way binding | Map of strings or functions which return strings representing HTTP headers to send to the server. If the return value of a function is null, the header will not be sent. Functions accept a config object as an argument
params        | one-way binding | Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be JSONified.
remoteData    | two-way binding | Set here your data source  for the response body

<h5>events</h5>
  event name            |     data        |   description    
--------------          | ----------------|-------------------------------------------------------------------
ngDvHttpGet_DataChanged |     ***         | it will be raised when your data source changes, generally if the the success promise method will be invoked



```javascript
 
  <ng-dv-http-get 
    url="https://api.github.com/users/alchimya/repos"  
    remote-data="httpGETData">
     <table>
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Url</th>
             </tr>
         </thead>
         <tbody>
             <tr ng-repeat="item in httpGETData">
                 <td>
                 {{item.name}}
                 </td>
                 <td>
                     <a href="{{item.html_url}}" target="_blank">{{item.html_url}}</a>
                 </td>
             </tr>
         </tbody>
     </table>
 </ng-dv-http-get>
 
```
