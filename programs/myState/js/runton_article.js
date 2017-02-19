/*****************************************************************************************/
/****************************************TODO 文章详情页 ***********************************/
/*****************************************************************************************/
//定义函数
function drawArticle(art_data){
    //绘制文章头部
    var artheader = "<h3 align='center'>"+art_data.title+"</h3>";
    artheader =artheader+"<p><span>作者：</span><span>"+art_data.authorname+"</span><span>标签：</span><span><a href=''>"+art_data.label+"</a></span>";
    //判断文章类型
    if(art_data.type =='1'){//原创类型
        artheader =artheader+"<span><img src='imgs/1473234397502.gif' alt=''/></span></p>";
    }else{
        artheader =artheader+"<p><span><img src='imgs/1473234438240.gif' alt=''/></span><a href='"+art_data.loadUrl+"'>"+art_data.loadUrl+"</a></p><hr/>";
    }
    $("section .container .col-md-9 .article_title").html(artheader);
    //绘制文章主体内容 解码htmlText
    var text = art_data.htmlText;

    $("#article_context").append(text);

    $("#article_context").append("<p class='recommend'><a href='#'><span class='glyphicon glyphicon-thumbs-up'></span>赞("+(art_data.upvote!=null?art_data.upvote:0)+")</a><a href='#'><span class='glyphicon glyphicon-thumbs-down'></span>贬("+(art_data.devalue!=null?art_data.devalue:0)+")</a></p>")
}
function drawComment(pram){//传入文章编号
    $.post("php/article_response.php", {"tid": pram['tid']}, function (data) {
        //console.log(data);
        $("#comment_context").html(AnalyticEmotion(data));
    });
}
/**
 *  TODO 在页面加载时向服务器发送请求
 */
$(document).ready(function(){
    //获得文章的ID 在URL地址之后
    var pram = GetRequest();
    // TODO 加载文章内容
    if(pram['tid']==''){
        alert("没有找到文章！");
    }else{
        //向服务器发送请求，获取文章详情
        $.post("php/article_detail.php",{"tid":pram['tid']},function(art_data){
            //绘制文章
            drawArticle(art_data);
        })
    }
    // TODO 加载文章评论内容
    drawComment(pram);
    //TODO 页脚加载最新的四条文章评论和用户评论
    loadLastArticle();
    loadLastComment();
    loadLastMember();
    //TODO 搜索热点
    hotWordToggle();
    //TODO 资源类型
    sourceToggle("");
    //TODO 修改文章统计信息
    $.get("php/runton_art_stat_update1.php",{"tid":pram['tid']},function(result){
        if(result=='succ'){
            console.log(result);
        }else{
            console.log(result);
        }
    });
});

/**
 * TODO  用户点击登录链接  弹出登录模态框。
 */
$("section .container .comment_edit p a").first().click(function(e){
    e.preventDefault();
    $("nav .container .login_container").removeClass('hidden');
});

//TODO  绑定表情
$("#face").SinaEmotion($("#emotion"));
//TODO  为“发表”按钮绑定发表评论函数
$("#send").click(function out(){
    var inputText =$("#emotion").val();
    var pram = GetRequest();
    // TODO 判断用户是否登录
    if(getCookie('PHPSESSID')&&getCookie('login_id')) {
        if (inputText == "") {
            return;
        }
        //将评论内容发送至服务器
        $.post('php/runton_insert_response1.php', {"text": inputText,"user_id": getCookie('login_id'),"tid": pram['tid']},function(data) {
            if (data == 'succ') {
                //TODO 绘制评论到页面，并情况评论框
                drawComment(pram);
                $("#emotion").val("");
            }else{
                alert("评论失败。");
            }});
    }else{
        alert("您还没有登录，请先登录");
    }
});

//TODO 回复用户评论
$("#comment_context").on("click","div.media div.media-body p span a",function(event){
    event.preventDefault();
    var target = event.target;
    $("form").remove(".comment_edit1");
    //TODO 点击回复时 弹出回复编辑框
    var str = "<form class='comment_edit1'><textarea id='emotion1' class='emotion' cols='80' rows='2' style='font-size: 13px;width:100%;margin-top:10px;'></textarea><br>";
    str += "<input id='face1' type='button' class='btn btn-default' value='插入表情'/><input id='send1' type='button' class='btn btn-default' value='发表'/></form>";
    $(target).parent().parent().parent().append(str);
    //TODO  绑定表情
    $("#face1").SinaEmotion($("#emotion1"));
    //TODO 获取当前点击对象所在第几楼
    var nums = $(target).parent().siblings().length;
    var response_row =null;
    if(nums==2){
        response_row =$(target).parent().siblings()[1].innerHTML.slice(0,1);
    }else{
        response_row =$(target).parent().parent().parent().parent().siblings("p").children(".floor").html().slice(0,1);
    }
    //TODO  为“发表”按钮绑定发表评论函数
    $("#send1").click(function out(){
        var inputText =$("#emotion1").val();
        var pram = GetRequest();
        // TODO 判断用户是否登录
        if(getCookie('PHPSESSID')&&getCookie('login_id')){
            if (inputText == "") {
                return;
            }
            $.post('php/runton_insert_response2.php',{"text":inputText,"user_id":getCookie('login_id'),"tid":pram['tid'],"start_row":response_row},function(data){
                if (data == 'succ') {
                    //TODO 绘制评论到页面，并情况评论框
                    drawComment(pram);
                    $("#emotion1").val("");
                }else{
                    alert("评论失败。");
                }
            });
        }else{
            alert("您还没有登录，请先登录");
        }
    })
});
/**********************************************************************************************/
/*********************************TODO 文章主体部分**********************************************/
/**********************************************************************************************/

$("#article_context").on("click","p.recommend a",function(e){
    e.preventDefault();
    var target= e.target;
    var str =String(target.text);
    var pram = GetRequest();
    var vote ="";
    if(str.indexOf("赞")!=-1){
        vote="upvote";
        //发送数据 并修改元素内容+1
        $.get("php/runton_art_stat_update2.php",{"tid":pram['tid'],"vote":vote},function(result){
            if(result=='succ'){
                var num =str.match(/[0-9]+/)[0];
                num++;
                target.innerHTML="<span class='glyphicon glyphicon-thumbs-up'></span>赞("+num+")";
            }
        });
    }else if(str.indexOf("贬")!=-1){
        vote="devalue";
        //发送数据 并修改元素内容+1
        $.get("php/runton_art_stat_update2.php",{"tid":pram['tid'],"vote":vote},function(result){
            if(result=='succ'){
                var num =str.match(/[0-9]+/)[0];
                num++;
                target.innerHTML="<span class='glyphicon glyphicon-thumbs-down'></span>贬("+num+")";
            }
        });
    }
});

/*********************************TODO 文章分享模块 **********************************************/
window._bd_share_config={
    "common":{
        "bdSnsKey":{},
        "bdText":"",
        "bdMini":"2",
        "bdMiniList":false,
        "bdPic":"",
        "bdStyle":"0",
        "bdSize":"24"
    },
    "share":{},
    "image":{
        "viewList":["qzone","tsina","tqq","renren","weixin"],
        "viewText":"",
        "viewSize":"16"
    },
    "selectShare":{
        "bdContainerClass":null,
        "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
    }
};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

