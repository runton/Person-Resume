/**
 * Created by bjwsl-001 on 2016/9/5.
 */

//模块的声明
var app = angular.module('kaifanla', ['ng', 'ngRoute']);

//配置路由词典
app.config(function ($routeProvider) {
    $routeProvider
        .when('/start', {templateUrl: 'tpl/start.html'})
        .when('/main', {templateUrl: 'tpl/main.html',controller:'mainCtrl'})
        .when('/detail', {templateUrl: 'tpl/detail.html',controller:'detailCtrl'})
        .when('/detail/:did', {templateUrl: 'tpl/detail.html',controller:'detailCtrl'})
        .when('/order', {templateUrl: 'tpl/order.html',controller:'orderCtrl'})
        .when('/order/:did', {templateUrl: 'tpl/order.html',controller:'orderCtrl'})
        .when('/myorder', {templateUrl: 'tpl/myorder.html',controller:'myorderCtrl'})
        .otherwise({redirectTo: '/start'})
})

//声明一个父控制器
app.controller('parentCtrl', function ($scope,$location) {
    $scope.jump = function (path) {
        $location.path(path);
    }
});

//声明一个mainCtrl控制器
app.controller('mainCtrl', function ($scope,$http) {
    $scope.hasMore = true;
    $http.get('data/dish_getbypage.php?start=0')
        .success(function (data) {
            //console.log(data);
            $scope.dishList = data;
    });
    
    $scope.loadMore = function () {
        $http.get('data/dish_getbypage.php?start='+$scope.dishList.length)
            .success(function (data) {
              $scope.dishList = $scope.dishList.concat(data);
                if(data.length < 5){
                    $scope.hasMore = false;
                }
            })
    }

    $scope.$watch('kw', function () {
        if($scope.kw)
        {
            $http.get('data/dish_getbykw.php?kw='+$scope.kw)
                .success(function (data) {
                    $scope.dishList = data;
                });
        }

    });

});

//声明一个DetailCtrl控制器
app.controller('detailCtrl', function ($scope,$http,$routeParams) {

    $http.get('data/dish_getbyid.php?id='+$routeParams.did)
        .success(function (data) {
            console.log(data);
            $scope.dish = data[0];
        })

});

//声明orderCtrl控制器
app.controller('orderCtrl', function ($scope,$rootScope,$http,$routeParams) {
    $scope.order = {"did":$routeParams.did};
    
    $scope.submitOrder = function () {
        var str = jQuery.param($scope.order);
        console.log(str);

        $http.get('data/order_add.php?'+str)
            .success(function (data) {
                if(data[0].msg == 'succ')
                {
                    $rootScope.phone = $scope.order.phone;
                    console.log($rootScope.phone);
                    $scope.succMsg = "下单成功！编号为:"+data[0].oid;
                }
                else
                {
                    $scope.errMsg = "下单失败！原因："+data[0].reason;
                }
            })

    }
    
});

//声明myorderCtr控制器
app.controller('myorderCtrl', function ($scope,$http,$rootScope) {
    console.log($rootScope.phone);
    $http.get('data/order_getbyphone.php?phone='+$rootScope.phone)
        .success(function (data) {
            $scope.orderList = data;
        })

});