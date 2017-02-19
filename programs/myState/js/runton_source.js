/*****************************************************************************************/
/****************************************TODO 资源列表页 ***********************************/
/*****************************************************************************************/
/********************************************函数*****************************************/
function diffData(data,type){

    if(type==0){//全部
        return data;
    }
    var temp =new Array();
    for(var i=0;i<data.length;i++){

        if(data[i].type=='0'&&type==1){ //教程
            temp.push(data[i]);
        }else if(data[i].type=='1'&&type==2){ //文档
            temp.push(data[i]);
        }else if(data[i].type=='2'&&type==3){//软件
            temp.push(data[i]);
        }else if(data[i].type=='3'&&type==4){//案例
            temp.push(data[i]);
        }else if(data[i].type=='4'&&type==5){//插件
            temp.push(data[i]);
        }else if(data[i].type=='5'&&type==6){//模板
            temp.push(data[i]);
        }else if(data[i].type=='6'&&type==7){//其他
            temp.push(data[i]);
        }
    }
    return temp;
}

/***********************end*****************************/
/********************************************************/
//  TODO 在页面加载时需要执行的操作
$(document).ready(function() {
    //向服务器发送请求，获取资源信息
    var sourceData ='';
    $.post("php/runton_get_source.php",function(data){
        //将返回的html文本追加到
        sourceData = data;
        //判断url地址后是否带type参数值
        var prams = GetRequest();
        if(prams['type']!=undefined){
            loadSource(sourceData,prams['type']);
            if(prams['type']==1){
                tabToggle("section .col-md-9 .source-tabs ul li",1);
                tabContentToggle("#refer");
            }else if(prams['type']==2){
                tabToggle("section .col-md-9 .source-tabs ul li",2);
                tabContentToggle("#doc");
            }else if(prams['type']==3){
                tabToggle("section .col-md-9 .source-tabs ul li",3);
                tabContentToggle("#soft");
            }else if(prams['type']==4){
                tabToggle("section .col-md-9 .source-tabs ul li",4);
                tabContentToggle("#example");
            }else if(prams['type']==5){
                tabToggle("section .col-md-9 .source-tabs ul li",5);
                tabContentToggle("#pulguns");
            }else if(prams['type']==6){
                tabToggle("section .col-md-9 .source-tabs ul li",6);
                tabContentToggle("#models");
            }else if(prams['type']==7){
                tabToggle("section .col-md-9 .source-tabs ul li",7);
                tabContentToggle("#other");
            }
        }else{
            //默认加载全部资源
            loadSource(sourceData,0);
        }

        //为页面顶部标签绑定单击事件，加载相应类型的资源。
        $(".source-tabs").on('click','ul li a',function(event){
            var target = event.target;
            if(target.innerHTML=="教程"){
                loadSource(sourceData,1);
            }else if(target.innerHTML=="文档"){
                loadSource(sourceData,2);
            }else if(target.innerHTML=="软件") {
                loadSource(sourceData, 3);
            }else if(target.innerHTML=="案例") {
                loadSource(sourceData, 4);
            }else if(target.innerHTML=="插件") {
                loadSource(sourceData, 5);
            }else if(target.innerHTML=="模板") {
                loadSource(sourceData, 6);
            }else if(target.innerHTML=="其他") {
                loadSource(sourceData, 7);
            }
        });
        //TODO 点击右侧资源类型按钮，根据点击的对象，加载相应类型到页面中。
        sourceToggle(sourceData);
    });

    //加载页脚信息
    loadLastArticle();
    loadLastComment();
    loadLastMember();
    //TODO  在section col-md-3 ul.word上绑定点击事件 根据关键词搜索指定文章。搜索热点
    hotWordToggle();

});

//TODO 为资源分享表单 中的“提交”按钮绑定单击事件，向服务器提交数据。
$(".sourceShare form").submit(function(e){
    if(!getCookie("login_id")){
        alert("您还没有登录，无法发表资源。");
        return;
    }
    //e.preventDefault();
    var sourceData = $(".sourceShare form").serialize();
    $.get("php/runton_insert_source.php",sourceData,function(data){
        console.log(data);
    })
});

//TODO 为资源分享表单 中的“清空”按钮绑定单击事件，向服务器提交数据。
$("#cancel").click(function(e){
    e.preventDefault();
    $(".sourceShare form *[name]").val("");
});