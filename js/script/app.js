/**
 * Created with WebStorm 10.0.3.
 * User: 张小兵
 * Date: 2016-12-30
 * Time: 15:18:55
 * Contact: 949869293@qq.com
 * person's webstate : http://www.runton.com.cn
 *
 * file describe: 主模块
 */

//模块的声明
var app = angular.module('resumeApp', ['ng', 'ngRoute','ngSanitize']);

//配置路由词典
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {templateUrl: 'tpl/home.html',controller:'homeCtrl'})
        .when('/skills', {templateUrl: 'tpl/skills.html',controller:'skillCtrl'})
        .when('/works', {templateUrl: 'tpl/works.html',controller:'worksCtrl'})
        .when('/interest', {templateUrl: 'tpl/interest.html',controller:'interestCtrl'})
        .when('/contact', {templateUrl: 'tpl/contact.html',controller:'contactCtrl'})
        .when('/work_detail/:wid', {templateUrl: 'tpl/work_detail.html',controller:'work_detailCtrl'})
        .otherwise({redirectTo: '/home'})
});
//自定义服务
app.factory("Comment",function($http){
   return {

       //得到所有的评论
       get : function(commentFileUrl) {
           return  $http({
               method: "GET",
               url: commentFileUrl,
               params: {R:Math.random()},
               headers: {'Cache-Control':'no-cache'}
           });
       },

       //保存一个评论
       save : function(commentFileUrl,commentData) {

           $http({
               method: "POST",
               url: "php/saveCommits.php",
               data: {commentUrl:commentFileUrl,commit:commentData},
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
               transformRequest: function(obj) {
                   var str = [];
                   for (var p in obj) {
                       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                   }
                   return str.join("&");
               }
           }).success(function(data){
               alert("评论已提交！");
           }).error(function(data) {
               alert("评论提交失败，错误信息:" + JSON.stringify({data:data}));
           });
       }
   }
});
//声明一个父控制器
app.controller('parentCtrl', function ($scope,$location) {
    $scope.entry = function (path) {
        $location.path(path);
    };

});

//声明一个控制器
app.controller('homeCtrl',function($scope){

});

//声明一个控制器
app.controller('skillCtrl',function($scope){

});

//声明一个控制器
app.controller('worksCtrl',function($scope,$http,$filter){
    $scope.search={};
    $scope.type="all";
    //获取作品列表
    $http.get('userdata/worklists.json').success(function (data) {
        $scope.worklists = data;
    });
});

//声明一个控制器
app.controller('interestCtrl',function($scope){

});

//声明一个控制器
app.controller('contactCtrl',function($scope){

});

//声明一个控制器
app.controller('work_detailCtrl',function($scope,$http,$routeParams,Comment,$filter,$cacheFactory){
    var id = $routeParams.wid;

    //获取本地json资源文件
    $http.get('userdata/work_content.json').success(function (data) {
        $scope.work = data[id];

        //根据 每个作品中指定的评论文件加载对应的前5条评论内容。
        Comment.get($scope.work.commentUrl).success(function(data){
            $scope.Comments = data.slice(0,5);
        }).error(function(){
            $scope.Comments =null;
        });

        // 加载更多用户评论
        $scope.loadMore =function(){
            Comment.get($scope.work.commentUrl).success(function(data){
                $scope.Comments = data;
            }).error(function(){
                $scope.Comments =null;
            });
        };

        //保存用户评论到json文件中
        $scope.saveComment =function(){
            var tm =new Date();
            var userid ="游客"+tm.getTime();
            var newComment = {
                "userid": userid,
                "comment": AnalyticEmotion($scope.comment),
                "commit_time": $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss')
            };
            //将评论内容转成json字符串
            var data =JSON.stringify(newComment);

            console.log(data);

            Comment.save($scope.work.commentUrl,data);

            //向scope.Comments中追加新评论内容，刷新视图
            $scope.Comments.push(newComment);
        };
    });
});



