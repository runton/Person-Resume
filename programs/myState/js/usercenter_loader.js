/**
 * Created by Administrator on 2016/12/29.
 */
require.config({
    paths:{
        'jquery':"http://cdn.bootcss.com/jquery/1.11.3/jquery.min",
        "UEconfig":"ueditor_php/ueditor.config",
        "UEall":"ueditor_php/ueditor.all",
        "UElanguage":"ueditor_php/lang/zh-cn/zh-cn",
        "bootstrap":"bootstrap-3.3.6/js/bootstrap.min",
        "query":"js/query.min",
        "paging":"js/paging.min",
        "common":"js/common.min",
        "runton_usercenter":"js/runton_usercenter"
    },
    shim:{
        "jquery":{
            export:'jquery'
        },
        "query":{
            export:'query'
        },
        "paging":{
            export:'Paging'
        }
    }
});

require(["jquery","UEconfig","UEall","UElanguage"],function($){
    require(["query"],function(query){
        console.log("query加载成功！");

        require(["paging"],function(Paging){
            console.log("--Paging加载成功！");
        });
    });

    require(["bootstrap"],function(bootstrap){
        console.log("bootstrap加载成功！");
    });

    require(["common"],function(common){
        console.log("common加载成功！");
    });

    require(["runton_usercenter"],function(runton_usercenter){
        console.log("runton_usercenter加载成功！");
    });




});