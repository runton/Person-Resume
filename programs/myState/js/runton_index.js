/**
 *  TODO 在页面加载时向服务器发送请求
 */
$(document).ready(function(){
    //TODO 页脚加载最新的四条文章记录
    loadLastArticle();
    loadLastComment();
    loadLastMember();
});
/**
 * TODO  用户选择搜索引擎时  表单active 指向相应页面 同时搜索引擎对应图标显示。
 * TODO  搜索按钮绑定提交表单行为
 */
$("#search input").click(function(e){
   var target = e.target;
    var key =$("#searchkey").val();

    if(target.value=="baidu"){
        $(".searchImg img").attr("src","imgs/5644a4015f681b192f43d02e95bee21d.png");
        $("#searchkey").attr("name","wd");
        $("#search").attr('action','//www.baidu.com/s');
    }else if(target.value=="bing"){
        $(".searchImg img").attr("src","imgs/201611814427514.jpg");
        $("#searchkey").attr("name","q");
        $("#search").attr("action","//cn.bing.com/search");
    }else if(target.value=="google"){
        $(".searchImg img").attr("src","imgs/14526720044.jpg");
        $("#searchkey").attr("name","q");
        $("#search").attr("action","//www.google.com.hk/");
    }
});

//  TODO  首页搜索框动态样式。
$("#searchkey").focus(function(){
    $(this).siblings("span").children("button").css("backgroundColor","#0078CA");
});
$("#searchkey").blur(function(){
    $(this).siblings("span").children("button").css("backgroundColor","#B0B0B0");
    $(this).siblings("span").children("button").css("border-color","#B0B0B0");
});

$("#search button").click(function(){
    var search = document.getElementById('search');
    search.submit();
});

$(function(){
    $('.mid-link .link li').hover(function(){
        $(this).children('.stateBox').stop(true,true).delay(100).animate({'bottom':-90,opacity:0.8},300);
    },function(){
        $(this).children('.stateBox').stop(true,true).animate({'bottom':-168,opacity:0},200);
    });
});

/**
 * TODO  搜索引擎的suggestion 功能。
 */
var searchInput = $("#searchkey");
var suggestionDiv = document.getElementById("suggestion_div");
var suggestionsUl = document.getElementById("suggestions_ul");
var suggestionLi = null;

var suggestion = ["abcde","华南理工大学","abcd","华南师范大学","abcdefg","华南农业大学","abcdefgh","广东工业大学","广东外语外贸大学","计算机科学与技术","广东财经大学","计算机学院","广州医科大学","计算机","广州大学"];//模拟的数据源
suggestion.sort(); // 按字母排序，使显示结果更友好

//动态生成下拉列表
function setSuggestions(suggestions) {// 动态生成suggestion下拉框
    clearSuggestions(); // 每输入一个字符就先清除原先的提示
    suggestionDiv.className = "show";
    for (var i = 0; i < the_suggestions.length; i++) {// 将匹配的提示结果逐一显示给用户
        suggestionLi = document.createElement("li");
        suggestionsUl.appendChild(suggestionLi);
        suggestionLi.appendChild(document.createTextNode(suggestions[i]));
        mouseEvent();// 对每个<li>触发鼠标事件
    }
}
function clearSuggestions(){
    //每输入一个字符就先清除原先的提示
}

function mouseEvent(){
    suggestionLi.onmouseover = function() {
        this.className = "mouseOver"; // 鼠标经过时高亮
        inputField.value = this.firstChild.nodeValue;// 同时将当前的选中值赋值给百度输入框
    }
    suggestionLi.onmouseout = function() {
        this.className = "mouseOut"; // 离开时恢复原样
    }
    suggestionLi.onclick = function() {// 用户点击某个匹配项时清除提示框
        clearSuggestions();
    }
}

//键盘事件 向上切换li

//TODO 百度搜索suggestion功能
