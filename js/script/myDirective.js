app.directive('myHeader',function(){
    return {
        restrict: 'AECM',
        replace: true,
        templateUrl: './tpl/include/navigation.html',
        controller: function($scope,$location){
            $scope.jump = function (path) {
                //设置当前导航位置样式
                $location.path(path);
            };
        },
        link: function(scope,element,attrs){
            var currentLocation =window.location.hash;
            var nav_ul = document.getElementById('nav_ul').children;
            for(var i=0;i<nav_ul.length;i++){
                nav_ul[i].style.color="black";
            }
            //设置当前导航位置样式
            switch(currentLocation){
                case "#/home":
                    nav_ul[0].style.color="red";
                    break;
                case "#/skills":
                    nav_ul[1].style.color="red";
                    break;
                case "#/works":
                    nav_ul[2].style.color="red";
                    break;
                case "#/interest":
                    nav_ul[3].style.color="red";
                    break;
                case "#/contact":
                    nav_ul[4].style.color="red";
                    break;
                default :
                    nav_ul[2].style.color="red";
            }
            //监听用户切换导航事件
            element.context.addEventListener('click',function(e){
                var target = e.target;
                if(target.nodeName=="LI"){
                    var currentLocation =window.location.hash;
                    var nav_ul = document.getElementById('nav_ul').children;

                    angular.element('#menu').removeClass("in");

                    for(var i=0;i<nav_ul.length;i++){
                        nav_ul[i].style.color="black";
                    }

                    //设置当前导航位置样式
                    switch(currentLocation){
                        case "#/home":
                            nav_ul[0].style.color="red";
                            break;
                        case "#/skills":
                            nav_ul[1].style.color="red";
                            break;
                        case "#/works":
                            nav_ul[2].style.color="red";
                            break;
                        case "#/interest":
                            nav_ul[3].style.color="red";
                            break;
                        case "#/contact":
                            nav_ul[4].style.color="red";
                            break;
                        default :
                            nav_ul[0].style.color="red";
                    }
                }
            });
        }
    }
});

//home页 图片轮播插件
app.directive('myPicture',function(){
    return {
        restrict: 'AECM',
        templateUrl: './tpl/lunbo.html',
        link: function(scope,ele,attrs){
            ele.find("#mylink").carousel({
                interval: 8000
            });
        }
    }
});

//contact页 背景插件
app.directive('bgCanvas',function(){
    return {
        restrict: 'AECM',
        templateUrl: './tpl/tools/bgCanvas.html',
        transclude: true,
        replace: true,
        link: function(scope,ele,attrs){
            var num = 200; //圆形的数量
            var cavs =document.getElementById("canv");
            var container =document.getElementById("bg_contact");
            //var w = window.innerWidth;
            //var h = window.innerHeight;
            var w = cavs.offsetWidth;
            var h = cavs.offsetHeight;
            var max = 100;
            //圆形初始坐标
            var _x = 0;
            var _y = 0;
            var _z = 150;
            // 产生元素分布距离 随机数
            var dtr = function(d) {
                return d * Math.PI / 180;
            };

            var rnd = function() {
                return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
            };

            var dist = function(p1, p2, p3) { //空间点的三维距离
                return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
            };
            //圆形对象
            var cam = {
                obj: {
                    x: _x,
                    y: _y,
                    z: _z
                },
                dest: {
                    x: 0,
                    y: 0,
                    z: 1
                },
                dist: {
                    x: 0,
                    y: 0,
                    z: 200
                },
                ang: {
                    cplane: 0,
                    splane: 0,
                    ctheta: 0,
                    stheta: 0
                },
                zoom: 1,
                disp: {
                    x: w / 2,
                    y: h / 2,
                    z: 0
                },
                upd: function() {
                    cam.dist.x = cam.dest.x - cam.obj.x;
                    cam.dist.y = cam.dest.y - cam.obj.y;
                    cam.dist.z = cam.dest.z - cam.obj.z;
                    cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                    cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                    cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                    cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                }
            };

            var trans = {
                parts: {
                    sz: function(p, sz) {
                        return {
                            x: p.x * sz.x,
                            y: p.y * sz.y,
                            z: p.z * sz.z
                        };
                    },
                    rot: {
                        x: function(p, rot) {
                            return {
                                x: p.x,
                                y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                                z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
                            };
                        },
                        y: function(p, rot) {
                            return {
                                x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                                y: p.y,
                                z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
                            };
                        },
                        z: function(p, rot) {
                            return {
                                x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                                y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                                z: p.z
                            };
                        }
                    },
                    pos: function(p, pos) {
                        return {
                            x: p.x + pos.x,
                            y: p.y + pos.y,
                            z: p.z + pos.z
                        };
                    }
                },
                pov: {
                    plane: function(p) {
                        return {
                            x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
                            y: p.y,
                            z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
                        };
                    },
                    theta: function(p) {
                        return {
                            x: p.x,
                            y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
                            z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
                        };
                    },
                    set: function(p) {
                        return {
                            x: p.x - cam.obj.x,
                            y: p.y - cam.obj.y,
                            z: p.z - cam.obj.z
                        };
                    }
                },
                persp: function(p) {
                    return {
                        x: p.x * cam.dist.z / p.z * cam.zoom,
                        y: p.y * cam.dist.z / p.z * cam.zoom,
                        z: p.z * cam.zoom,
                        p: cam.dist.z / p.z
                    };
                },
                disp: function(p, disp) {
                    return {
                        x: p.x + disp.x,
                        y: -p.y + disp.y,
                        z: p.z + disp.z,
                        p: p.p
                    };
                },
                steps: function(_obj_, sz, rot, pos, disp) {
                    var _args = trans.parts.sz(_obj_, sz);
                    _args = trans.parts.rot.x(_args, rot);
                    _args = trans.parts.rot.y(_args, rot);
                    _args = trans.parts.rot.z(_args, rot);
                    _args = trans.parts.pos(_args, pos);
                    _args = trans.pov.plane(_args);
                    _args = trans.pov.theta(_args);
                    _args = trans.pov.set(_args);
                    _args = trans.persp(_args);
                    _args = trans.disp(_args, disp);
                    return _args;
                }
            };

            (function() {
                "use strict";
                var threeD = function(param) {
                    this.transIn = {};
                    this.transOut = {};
                    this.transIn.vtx = (param.vtx);
                    this.transIn.sz = (param.sz);
                    this.transIn.rot = (param.rot);
                    this.transIn.pos = (param.pos);
                };

                threeD.prototype.vupd = function() {
                    this.transOut = trans.steps(

                        this.transIn.vtx,
                        this.transIn.sz,
                        this.transIn.rot,
                        this.transIn.pos,
                        cam.disp
                    );
                };

                var Build = function() {
                    this.vel = 0.04;
                    this.lim = 360;
                    this.diff = 200;
                    this.initPos = 100;
                    this.toX = _x;
                    this.toY = _y;
                    this.go();
                };

                Build.prototype.go = function() {
                    this.canvas = document.getElementById("canv");
                    //this.canvas.width = window.innerWidth;
                    //this.canvas.height = window.innerHeight;
                    this.canvas.width = w;
                    this.canvas.height = h;
                    this.$ = canv.getContext("2d");
                    this.$.globalCompositeOperation = 'source-over';
                    this.varr = [];
                    this.dist = [];
                    this.calc = [];

                    for (var i = 0, len = num; i < len; i++) {
                        this.add();
                    }

                    this.rotObj = {
                        x: 0,
                        y: 0,
                        z: 0
                    };
                    this.objSz = {
                        x: w / 5,
                        y: h / 5,
                        z: w / 5
                    };
                };

                Build.prototype.add = function() {
                    this.varr.push(new threeD({
                        vtx: {
                            x: rnd(),
                            y: rnd(),
                            z: rnd()
                        },
                        sz: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        rot: {
                            x: 20,
                            y: -20,
                            z: 0
                        },
                        pos: {
                            x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                            y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                            z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
                        }
                    }));
                    this.calc.push({
                        x: 360 * Math.random(),
                        y: 360 * Math.random(),
                        z: 360 * Math.random()
                    });
                };

                Build.prototype.upd = function() {
                    cam.obj.x += (this.toX - cam.obj.x) * 0.05;
                    cam.obj.y += (this.toY - cam.obj.y) * 0.05;
                };

                Build.prototype.draw = function() {
                    this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    cam.upd();
                    this.rotObj.x += 0.1;
                    this.rotObj.y += 0.1;
                    this.rotObj.z += 0.1;

                    for (var i = 0; i < this.varr.length; i++) {
                        for (var val in this.calc[i]) {
                            if (this.calc[i].hasOwnProperty(val)) {
                                this.calc[i][val] += this.vel;
                                if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
                            }
                        }

                        this.varr[i].transIn.pos = {
                            x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
                            y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
                            z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
                        };
                        this.varr[i].transIn.rot = this.rotObj;
                        this.varr[i].transIn.sz = this.objSz;
                        this.varr[i].vupd();
                        if (this.varr[i].transOut.p < 0) continue;
                        var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2);
                        this.$.globalCompositeOperation = 'lighter';
                        g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
                        g.addColorStop(.5, 'hsla(' + (i + 2) + ',85%, 40%,1)');
                        g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)');
                        this.$.fillStyle = g;
                        this.$.beginPath();
                        this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
                        this.$.fill();
                        this.$.closePath();
                    }
                };
                Build.prototype.anim = function() {
                    window.requestAnimationFrame = (function() {
                        return window.requestAnimationFrame ||
                            function(callback, element) {
                                window.setTimeout(callback, 1000 / 60);
                            };
                    })();
                    var anim = function() {
                        this.upd();
                        this.draw();
                        window.requestAnimationFrame(anim);
                    }.bind(this);
                    window.requestAnimationFrame(anim);
                };

                Build.prototype.run = function() {
                    this.anim();
                    //监听窗口鼠标移动
                    container.addEventListener('mousemove', function(e) {
                        this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
                        this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
                    }.bind(this));
                    //监听窗口鼠标移动
                    container.addEventListener('touchmove', function(e) {
                        e.preventDefault();
                        this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
                        this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
                    }.bind(this));
                    //监听窗口鼠标按下
                    container.addEventListener('mousedown', function(e) {
                        for (var i = 0; i < 100; i++) {
                            this.add();
                        }
                    }.bind(this));
                    //监听窗口鼠标按下
                    container.addEventListener('touchstart', function(e) {
                        e.preventDefault();
                        for (var i = 0; i < 100; i++) {
                            this.add();
                        }
                    }.bind(this));
                };
                var app = new Build();
                app.anim();
                //app.run();
            })();
            window.addEventListener('resize', function() {
                var canvs = document.getElementById("canv");
                canvs.width = w = window.innerWidth;
                //canv.height = h = window.innerHeight;
            }, false);
        }
    }
});

//work 过滤
app.directive('myFilter',function() {
    return {
        restrict: 'AECM',
        templateUrl: './tpl/tools/filter.html',
        scope: false,
        link: function ($scope, ele, attrs) {
            //监听鼠标点击事件
            ele.on("click","nav ul li a",function(e){
                var target = e.target;
                angular.element("nav ul li a").removeClass("current");
                angular.element(target).addClass("current");
                $scope.type =angular.element(target).attr("data-filter");
                $scope.$digest();
            })
        }
    }
});

//评论表单工具
app.directive('commentTool',function(){
    return {
        restrict: 'AECM',
        templateUrl: './tpl/tools/comment.html',
        scope: false,
        link:function($scope, ele, attrs){

            //监听提交按钮点击事件
            ele.find('#send').on("click",function(){
                //检查评论内容是否为空
                var content =ele.find("#emotion")[0].value;
                if( content== "undefined" ||content==null || content==""){
                    alert("评论不能为空！");
                }else {
                    $scope.comment =content;
                    $scope.saveComment();
                }
            })
        }
    }
});