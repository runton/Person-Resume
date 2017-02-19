/**
 * Created by Administrator on 2016/12/29.
 */
require.config({
    paths:{
        'jquery':"http://cdn.bootcss.com/jquery/1.11.3/jquery.min"
    },
    shim:{
        'jquery':{
            export:'jquery'
        }
    }
});

require(['jquery'],function($){
    $("#title").css({"color":"red"});
});