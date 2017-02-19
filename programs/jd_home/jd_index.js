/*封装$*/
window.$=HTMLElement.prototype.$=
  function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:
            elems.length==1?elems[0]:elems;
}
HTMLElement.prototype.bind=
  document.bind=function(eName,fn,capture){
  //this->elem
  this.addEventListener(eName,fn,capture);
}
HTMLElement.prototype.css=
  function(prop,value){//this->elem
    if(value===undefined){
      var style=getComputedStyle(this)
      return style[prop];
    }else{
      this.style[prop]=value;
    }
}
/*广告图片数组*/
var imgs=[
 {"i":0,"src":"images/index/banner_01.jpg"},
 {"i":1,"src":"images/index/banner_02.jpg"},
 {"i":2,"src":"images/index/banner_03.jpg"},
 {"i":3,"src":"images/index/banner_04.jpg"},
 {"i":4,"src":"images/index/banner_05.jpg"},
];
var adv={
  LIWIDTH:0,//保存每个li的宽度
  DISTANCE:0,//总距离
  DURATION:1000,//总时间
  STEPS:200,//总步数
  interval:0,//步频
  step:0,//步长
  timer:null,//定时器序号
  moved:0,//本次动画已经移动的步数
  WAIT:3000,
  canAuto:true, 
  init:function(){
    //获得id为slider的宽，转为浮点数，保存在LIWIDTH
    this.LIWIDTH=parseFloat(
      $("#slider").css("width")
    );
    this.updateView();
    //计算interval: DURATION/STEPS
    this.interval=this.DURATION/this.STEPS;
    //为id为idxs的ul绑定鼠标进入事件
    $("#idxs").bind("mouseover",
      function(e){
        var target=e.target;//获得target
        //如果target是li且target的class不是hover
        if(target.nodeName=="LI"
            &&target.className!="hover"){
          //找到id为idxs下的class为hover的li，获取其内容保存在start中
          var start=
            $("#idxs>.hover").innerHTML
          //获得target的内容保存在end中
          var end=target.innerHTML;
          this.move(end-start);
        }
      }.bind(this)//提前绑定this
    );
	//自动启动自动轮播
	this.autoMove();
	//为id为slider的div绑定鼠标进入事件
	$("#slider").bind("mouseover",function(){
			//将canAuto改为false
			this.canAuto = false;
		}.bind(this));
	//为id为slider的div绑定鼠标移出事件
	$("#slider").bind("mouseout",function(){
			//将canAuto改为true
			this.canAuto = true;
		}.bind(this));
  },
  autoMove:function(){
	//启动一次性定时器，将序号保存在timer中
		//任务move，提前绑定this，和n为1
		//等待时间为WAIT
		this.timer = setTimeout(
			function(){
				if(this.canAuto){
					this.move(1);
				}else{
					this.autoMove();
				}
			}.bind(this),
		this.WAIT);
  },
  move:function(n){//启动动画
    //放置动画叠加
    clearInterval(this.timer);
    this.timer=null;
    //清除imgs的left
    $("#imgs").css("left","");
    //n: 左移的li个数
    //计算DISTANCE: LIWIDTH*n
    this.DISTANCE=n*this.LIWIDTH;
    //计算step: DISTANCE/STEPS
    this.step=this.DISTANCE/this.STEPS;
    if(n<0){//如果右移
      //删除imgs结尾的n个元素，再拼上imgs剩余元素，结果保存回imgs中
      imgs=imgs.splice(imgs.length-(-n),-n)
               .concat(imgs);
      this.updateView();//更新界面
      //修改id为imgs的ul的left为n*LIWIDTH
      $("#imgs").css(
        "left",n*this.LIWIDTH+"px");
      //启动周期性定时器
      this.timer=setInterval(
        this.moveStep.bind(this),
        this.interval
      );
    }else{//否则,左移:
      this.timer=setInterval(
        //任务: moveStep 提前绑定this  
        this.moveStep.bind(this,function(){
          //删除imgs开头的n个元素，再拼接回数组imgs结尾，将结果再保存回imgs
          imgs=imgs.concat(imgs.splice(0,n));
          this.updateView();//更新界面
          //设置id为imgs的ul的left为""
          $("#imgs").css("left","");
        }.bind(this)),
        this.interval//间隔:interval
      );
    }
  },
  moveStep:function(callback){//移动一步
    //callback: 接收一个函数，等到动画结束才执行——回调函数
    //获取id为imgs的ul的left，转为浮点数，-step，再修改回id为imgs的ul的left
    $("#imgs").css("left",
      parseFloat($("#imgs").css("left"))
      -this.step+"px"  
    );
    this.moved++;//将moved+1
    //如果moved等于STEPS
    if(this.moved==this.STEPS){
      //停止定时器
      clearInterval(this.timer);
      this.timer=null;//timer置为空
      this.moved=0;//moved置为0
      //如果callback不是undefined就执行
      callback&&callback();
      //清除imgs的left
      $("#imgs").css("left","");
	  //在用户点击结束之后，调用自动轮播
		this.autoMove();
    }
	
  },
  updateView:function(){//根据数组更新界面
    //清除id为imgs的ul的内容
    $("#imgs").innerHTML="";
    //清除id为idxs的ul的内容
    $("#idxs").innerHTML="";
    var fragImgs=//创建fragImgs
      document.createDocumentFragment();
    var fragIdxs=//创建fragIdxs
      document.createDocumentFragment();
    //遍历imgs中每个img
    for(var i=0;i<imgs.length;i++){
      //创建li
      var li=document.createElement("li");
      var img=new Image();//新建img
      //设置img的src为当前元素的src属性
      img.src=imgs[i].src;
      //将img追加到li下
      li.appendChild(img);
      //将li追加到fragImgs下
      fragImgs.appendChild(li);
      li=document.createElement("li");//创建li
      //如果i等于imgs中第0个元素的i属性
      if(i==imgs[0].i){
        //设置li的class为hover
        li.className="hover";
      }
      //设置其内容为i+1
      li.innerHTML=i+1;
      //将li追加到fragIdxs下
      fragIdxs.appendChild(li);
    }
    //将fragImgs追加到id为imgs的ul下
    $("#imgs").appendChild(fragImgs);
    //将fragIdxs追加到id为idxs的ul下
    $("#idxs").appendChild(fragIdxs);
    //设置id为imgs的ul的宽为imgs的元素个数*LIWIDTH
    $("#imgs").css(
      "width",this.LIWIDTH*imgs.length+"px");
  }
}
adv.init();

//1. 左移：先移动，再改数组，更新界面
//2. 右移：先改数组，更新界面，再移动