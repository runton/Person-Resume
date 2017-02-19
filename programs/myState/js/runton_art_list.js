//  TODO 在页面加载时需要执行的操作
$(document).ready(function() {
    //读取url地址后参数label
    var prams = GetRequest();
    if(prams['label']!=undefined){
        //将文章标签发送给服务器，请求相关文章数据
        $.get("php/runton_label_article.php",{"label":prams['label']},function(data){
            if(data!="fail"){
                $("#all").html("");
                $("#all").append(data);
            }else{
                $("#all").html("");
                $("#all").append("<p>暂无此类内容。。</p>");
            }
        });
    }else{
        //页面加载时向服务器数据库发送请求，获取文章信息
        $.post("php/all_article_info.php",function(data){
            //将数据追加到页面id 为all 的元素后面
            $("#all").append(data);
        });
    }
    //加载最新文章到页脚
    loadLastArticle();
    loadLastComment();
    loadLastMember();

    //TODO 资源类型
    sourceToggle("");
});
//在section col-md-9上绑定事件点击事件 目标对象为div.media
$("section .container .col-md-9").on('click','div.media .media-body h4',function(event){
    var target = event.target;
    //根据点击的目标，获取目标的文章的id 然后将文章id发送个文章详情页
   var tid = $(target).attr("data-tid");
    window.location.href="runton_article.html?tid="+tid;
});

//TODO  在section col-md-3 ul.word上绑定点击事件 根据关键词搜索指定文章。搜索热点
hotWordToggle();