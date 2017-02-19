/**
 * TODO  该文件用于保存页面导航栏和页脚元素的处理程序。以及保存一些公共的函数
 */
/***********************************************************************
 *    TODO      通用函数
 ***********************************************************************/
// TODO 读取cookies操作
function getCookie(name){
    var arr,reg =new RegExp("(^|)"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}
// TODO 删除cookies操作
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime()-1);
    var cval =getCookie(name);
    if(cval!=null){
        document.cookie=name+"="+cval+";expires="+exp.toGMTString();
    }
}
// TODO 设置cookies操作
function setCookie(cname,cvalue,exSecond)
{
    if(exSecond!=0&&isNaN(exSecond)){
        var d = new Date();
        d.setTime(d.getTime()+(exSecond)*1000);
        var expires ="expires="+d.toGMTString();
        console.log(expires);
        console.log(d);
        document.cookie = cname + "=" +cvalue+ ";" + expires;
    }else{
        document.cookie = cname + "=" +cvalue;
    }
}
// TODO 检查cookies操作
function checkCookie(cname)
{
    var cookieName=getCookie(cname);
    if (cookieName!="")
    {
        return true;
    }
    else
    {
        return false;
    }
}
$.fn.hiddenElement= function(){
    this.attr('style','display:none');
}
$.fn.showElement=function(){
    this.attr('style','display:block');
}

function GetRequest() {

    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//TODO 页脚加载最新的四条文章记录
function loadLastArticle(){
    //向服务器请求最新的文章标题和创建 日期 数据 4条
    $.get('php/runton_last_article.php',function(data){  //获得一个对象数组
        var htmltext ="";
        console.log(data);
        for(var i=0;i<3;i++){
            htmltext += "<li><p><a href='runton_article.html?tid="+data[i].tid+"'>"+data[i].title+"</a></p><span>"+data[i].create_time+"</span></li>";
        }
        $("footer .row1 .container .col-md-3 .last_adjust").append(htmltext);
    });
}
//TODO 页脚加载最新的四条文章评论
function loadLastComment(){
    //向服务器请求最新的文章标题和创建 日期 数据 4条
    $.get('php/runton_last_comment.php',function(data) {  //获得一个对象数组
        var htmltext ="";
        for(var i=0;i<4;i++){
            htmltext += "<li><p><a href='runton_article.html?tid="+data[i].tid+"'>"+AnalyticEmotion(data[i].text)+"</a></p></li>";
        }
        $("footer .row1 .container .col-md-3 .last-comment").append(htmltext);
    });
}


//TODO   加载资源到资源页面
function loadSource(data,type){
    if(data.length==0){
        alert("加载失败。");
        return;
    }
    //确定资源加载的位置
    var target=null;
    if(type==0){
        target=$("#all");
    }else if(type==1){
        target=$("#refer");
    }else if(type==2){
        target=$("#doc");
    }else if(type==3){
        target=$("#soft");
    }else if(type==4){
        target=$("#example");
    }else if(type==5){
        target=$("#pulguns");
    }else if(type==6){
        target=$("#models");
    }else if(type==7){
        target=$("#other");
    }else{
        return false;
    }
    if(type!=0){
        target.empty();
    }
    var htmlText ="";
    // 区分数据类型
    var sourceData = diffData(data,type);
    if(sourceData.length==0){
        htmlText +="<div class='media'><div class='media-body'><h4 class='media-heading'>没有找到对应类型资源。</h4></div></div>";
    }else{
        //遍历资源数组
        for(var i=0;i<sourceData.length;i++){
            htmlText +="<div class='media'><span class='pull-left'><img class='media-object' src='' alt=''/></span>";
            htmlText +="<div class='media-body'><h4 class='media-heading'>"+sourceData[i].title+"</h4>";
            //资源分类
            if(type==0){
                switch (sourceData[i].type) {
                    case "0":
                        htmlText += "<p><span>教程</span></p>";
                        break;
                    case "1":
                        htmlText += "<p><span>文档</span></p>";
                        break;
                    case "2":
                        htmlText += "<p><span>软件</span></p>";
                        break;
                    case "3":
                        htmlText += "<p><span>案例</span></p>";
                        break;
                    case "4":
                        htmlText += "<p><span>插件</span></p>";
                        break;
                    case "5":
                        htmlText += "<p><span>模板</span></p>";
                        break;
                    case "6":
                        htmlText += "<p><span>Other</span></p>";
                        break;
                }
            }else if(type==1){
                htmlText += "<p><span>教程</span></p>";
            }else if(type==2){
                htmlText += "<p><span>文档</span></p>";
            }else if(type==3){
                htmlText += "<p><span>软件</span></p>";
            }else if(type==4){
                htmlText += "<p><span>案例</span></p>";
            }else if(type==5){
                htmlText += "<p><span>插件</span></p>";
            }else if(type==6){
                htmlText += "<p><span>模板</span></p>";
            }else if(type==7){
                htmlText += "<p><span>Other</span></p>";
            }
            htmlText +="<p>"+sourceData[i].decoration+"</p>";
            htmlText +="<p><label>链接：</label><a href='"+sourceData[i].linkUrl+"'>"+sourceData[i].linkUrl+"</a></p></div></div>";
        }
    }
    //将html文本追加到相应元素之后
    target.append(htmlText);

    return true;  //加载成功
}
//切换导航栏
function tabToggle(selector,index){
    $(selector).siblings().removeClass("active");
    $($(selector)[index]).addClass("active");
}
//TODO 标签切换函数
function tabContentToggle(selector){
    $(selector).addClass("tab-pane fade in active").siblings("div").removeClass("in active");
}

/*********************TODO 通用模块 --资源类型  ***************************/
//TODO 点击右侧资源类型按钮，根据点击的对象，加载相应类型到页面中。
function sourceToggle(sourceData){
    $("ul.source-type").on("click","li",function(event){
        var target = event.target;
        //获取当前地址，判断是否位于runton_source.html页面。
        var localUrl =window.location.href;
        if(localUrl.indexOf("runton_source.html")!=-1){
            if(target.innerHTML=="全部"){
                $("#all div.media").remove();
                loadSource(sourceData,0);
                tabToggle("section .col-md-9 .source-tabs ul li",0);
                tabContentToggle("#all");
            }else if(target.innerHTML=="教程"){
                loadSource(sourceData,1);
                tabToggle("section .col-md-9 .source-tabs ul li",1);
                tabContentToggle("#refer");
            }else if(target.innerHTML=="文档"){
                loadSource(sourceData,2);
                tabToggle("section .col-md-9 .source-tabs ul li",2);
                tabContentToggle("#doc");
            }else if(target.innerHTML=="软件"){
                loadSource(sourceData,3);
                tabToggle("section .col-md-9 .source-tabs ul li",3);
                tabContentToggle("#soft");
            }else if(target.innerHTML=="案例"){
                loadSource(sourceData,4);
                tabToggle("section .col-md-9 .source-tabs ul li",4);
                tabContentToggle("#example");
            }else if(target.innerHTML=="插件"){
                loadSource(sourceData,5);
                tabToggle("section .col-md-9 .source-tabs ul li",5);
                tabContentToggle("#pulguns");
            }else if(target.innerHTML=="模板"){
                loadSource(sourceData,6);
                tabToggle("section .col-md-9 .source-tabs ul li",6);
                tabContentToggle("#models");
            }else if(target.innerHTML=="其他"){
                loadSource(sourceData,7);
                tabToggle("section .col-md-9 .source-tabs ul li",7);
                tabContentToggle("#other");
            }
        }else{
            var type = target.getAttribute("data-type");
            window.location.href="runton_source.html?type="+type;
        }
    });
}
/*********************TODO 通用模块 --搜索热点  ***************************/
//在section col-md-3 ul.word上绑定点击事件 根据关键词搜索指定文章。
function hotWordToggle(){
    $("section .container .col-md-3 .row .word").on("click","li",function(event){
        var target = event.target ;
        var label = target.innerHTML;
        //判断模块当前位置是否在runton_art_list.html页面中
        var localUrl =window.location.href;
        if(localUrl.indexOf("runton_art_list.html")!=-1){
            //将文章标签发送给服务器，请求相关文章数据
            $.get("php/runton_label_article.php",{"label":label},function(data){
                if(data!="fail"){
                    $("#all").html("");
                    $("#all").append(data);
                }else{
                    $("#all").html("");
                    $("#all").append("<p>暂无此类内容。。</p>");
                }
            });
        }else {
            window.location.href="runton_art_list.html?label="+label;
        }
    });
}
/***********************************************************************
 *      TODO  结束
 ***********************************************************************/

$(document).ready(function() {
    // TODO 判断用户是否登录
    if (getCookie('PHPSESSID')&&getCookie('login_id')) {
        $("nav .container ul li .user_center").showElement();
        $("nav .container ul li .login-reg").hiddenElement();
    } else {
        $("nav .container ul li .login-reg").showElement();
        $("nav .container ul li .user_center").hiddenElement();
    }


});
//  TODO  启用提示工具。
//$(function () { $("[data-toggle='tooltip']").tooltip(); });

/**
 * TODO  用户点击登录按钮  弹出登录模态框。
 */
//$("nav .container ul li .login-reg .login").click(function(e){
//    e.preventDefault();
//    $("nav .container .login_container").removeClass('hidden');
//});
$("nav .container .login_container a").click(function(e){
    e.preventDefault();
    $("nav .container .login_container").addClass('hidden');
});
/**
 * TODO  用户点击 “退出” 菜单  用户中心图标隐藏 ，登录、注册按钮显示
 * TODO  同时 浏览器会话ID注销。
 */
$(".Exit").click(function(e){
    e.preventDefault();
    $("nav .container ul li .user_center").hiddenElement();
    $("nav .container ul li .login-reg").showElement();
    //TODO 删除会话变量
    $.get("php/runton_exit.php");
    delCookie('login_id');
    var reg =/runton_usercenter.html/;
    var url =window.location.href;
    if(url.match(reg)!=null){
        window.location.href="index.html";
    }
});
//TODO 点击用户中心
$("#user").click(function(event){
    event.preventDefault();
    var user_id = getCookie("login_id");
    var session_id = getCookie("PHPSESSID");
    window.location.href="runton_usercenter.html?user_id="+user_id+";session_id="+session_id;
});
/**
 * TODO   点击“登录”按钮，异步提交登录信息
 */
//var loginUserName = null;
//$('#bt-login').click(function(){
//    // TODO 表单序列化
//    var requestData = $('#login-form').serialize();
//    //TODO 异步提交：$.post  $.ajax
//    $.post('php/runton_login.php',requestData,function(data){
//        if(data.msg!=='succ'){  // TODO 登录失败
//            $('.modal-content .msg').html(data.reason);
//        }else{  // TODO 登录成功
//            loginUserName = $('[name="user_name"]').val();
//            $("nav .container ul li .user_center").showElement();
//            $("nav .container ul li .login-reg").hiddenElement();
//            $('.login_container').fadeOut();
//            // TODO  在浏览器端设置一个cookie用于保存用户id； 半小时后过期
//            setCookie("login_id",data.login_id,0);
//        }
//    });
//});

/**
 * TODO   点击“登录”按钮，异步提交登录信息
 */
    //var loginUserName = null;
$("#login-form input[type='submit']").click(function(e){
    e.preventDefault();
    // TODO 表单序列化
    var requestData = $('#login-form').serialize();
    //TODO 异步提交：$.post  $.ajax
    $.post('php/runton_login.php',requestData,function(data){
        if(data.msg!=='succ'){  // TODO 登录失败
            $('.lgn-title p').html(data.reason);
        }else{  // TODO 登录成功
            $('.login-reg').hiddenElement();
            window.location.href="index.html";
            // TODO  在浏览器端设置一个cookie用于保存用户id；
            setCookie("login_id",data.login_id,0);
        }
    });
});

/*********************************************************************/
/******************* TODO  页脚动态功能 *************************/
/*********************************************************************/
// TODO 鼠标移入页脚微信等联系站长图片上时，显示关注二维码。
$('footer ul.contact-icon').on("mouseover","li a",function(event){
    var target = event.target;
    if(target.className=="qq_icon"){
        addQRCode(target,"imgs/IMG_0633.jpg");
        $("footer ul.contact-icon .QRCode").attr("style","display:block");
    }else if(target.className=="weixin_icon"){
        addQRCode(target,"imgs/IMG_0630.jpg");
        $("footer ul.contact-icon .QRCode").attr("style","display:block");
    }else if(target.className=="sinablog_icon"){
        addQRCode(target,"imgs/IMG_0632.jpg");
        $("footer ul.contact-icon .QRCode").attr("style","display:block");
    }else if(target.className=="qqblog_icon"){
        addQRCode(target,"imgs/liantu.jpg");
        $("footer ul.contact-icon .QRCode").attr("style","display:block");
    }
    function addQRCode(target,imgUrl){
        var frg=document.createDocumentFragment();
        var QRCode = document.createElement("div");
        QRCode.className="QRCode";
        var arrow = document.createElement("div");
        arrow.className="arrow";
        var img = document.createElement("img");
        img.className= "img-responsive";
        img.setAttribute("src",imgUrl);
        QRCode.appendChild(arrow);
        QRCode.appendChild(img);
        frg.appendChild(QRCode);
        target.appendChild(frg);
    }
});
$('footer ul.contact-icon').on("mouseout","li a",function(){
    $("footer ul.contact-icon .QRCode").remove();
});
$('footer ul.contact-icon').on("click","li a",function(event){
    event.preventDefault();
});

// TODO 页面加载时在页脚导入最新成员
function loadLastMember(){
    $.post("php/runton_lastMember.php",function(userData){
        if(userData.length>0){
            var htmlText="";
            for(var i=0;i<userData.length;i++){
                htmlText += "<li><a href='#' data-toggle='tooltip' title='"+userData[i].username+"'>";
                htmlText +="<img class='img-responsive' src='"+userData[i].user_pic+"' alt=''/></a></li>";
            }
            $("footer .row1 ul.last-member").empty().append(htmlText);
        };
    });
}
