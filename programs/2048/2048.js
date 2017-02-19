function setCookie(name,value){
  var now=new Date();
  now.setMonth(now.getMonth()+1);
  document.cookie=name+"="+value
         +";expires="+now.toGMTString();
}
//getCookie:根据cookie名返回变量的值
function getCookie(name){
  var cookies=
    document.cookie.split("; ");
  for(var i=0;i<cookies.length;i++){
    if(cookies[i].startsWith(name)){
      return cookies[i].split("=")[1]
    }
  }
}
var game={
  data:null,//二维数组，保存游戏的数据
  RN:4,//总行数
  CN:4,//总列数
  score:0,//保存当前得分
  top:0,//保存最高分
  state:1,//保存游戏状态:0结束 1运行
  RUNNING:1,
  GAMEOVER:0,
  CSIZE:100,//保存格子的大小
  MARGIN:16,//保存格子的间距
  //生成所有格子div的html代码
  init:function(){
    //r从0~RN-1，同时声明空数组arr
    for(var r=0,arr=[];r<this.RN;r++){
      //c从0~CN-1
      for(var c=0;c<this.CN;c++){
        //向arr中压入r+c
        arr.push(""+r+c);
      }
    }//(遍历结束)
    
    //将arr按'" class="grid"></div><div id="g'拼接成字符串，保存到变量html中
    var html=arr.join(
      '" class="grid"></div><div id="g'
    );
    //在html前拼'<div id="g'，后拼'" class="grid"></div>'，再存回html中
    html='<div id="g'+html
        +'" class="grid"></div>'
    //替换html中所有/g(\d{2})|grid/,为
    var htmlc=html.replace(
      /g(\d{2})|grid/g,
      function(kword,$1){
        //return 如果kword是grid，就替换为cell，否则替换为c+$1
        return kword=="grid"?
                    "cell":"c"+$1;
      }//，将结果保存到htmlc中
    );
    //找到id为gridPanel的div，保存在panel中
    var panel=
    document.getElementById("gridPanel");
    //设置panel的内容为html+htmlc;
    panel.innerHTML=html+htmlc;
    //计算width: CN*(CSIZE+MARGIN)+MARGIN
    var width=
      this.CN*(this.CSIZE+this.MARGIN)
      +this.MARGIN;
    //计算height:RN*(CSIZE+MARGIN)+MARGIN
    var height=
      this.RN*(this.CSIZE+this.MARGIN)
      +this.MARGIN;
    //设置panel的style的宽为width+px
    panel.style.width=width+"px";
    //设置panel的style的高为height+px
    panel.style.height=height+"px";
  },
//强调:自己的方法用自己的属性，必须+this.
  start:function(){//启动游戏
    //从cookie中读取最高分,保存在top中
    this.top=getCookie("top")||0;
    this.init();//初始化游戏界面的格子
    this.score=0;//score清零
    //状态重置为RUNNING
    this.state=this.RUNNING;
    this.data=[];//初始化data为[];
    //r从0开始，到<RN结束，每次增1
    for(var r=0;r<this.RN;r++){
      //设置data中r行为[];
      this.data[r]=[];
      //c从0开始，到<CN结束，每次增1
      for(var c=0;c<this.CN;c++){
        //设置data中r行c列为0
        this.data[r][c]=0
      }
    }//(循环结束)
    this.randomNum();
    this.randomNum();
    this.updateView();
    //debugger;
    //console.log(this.data.join("\n"));
    //响应键盘事件
    document.onkeydown=function(e){
      //事件处理函数中的this，默认指.前的对象: this->document
      //e事件对象:
      switch(e.keyCode){//判断e.keyCode
        case 37://如果是37
          this.moveLeft(); break;
        case 38://如果是38
          this.moveUp(); break;
        case 39://如果是39
          this.moveRight(); break;
        case 40://如果是40
          this.moveDown(); break;
      }
    }.bind(this);//this->game
  },
  //将data中的数据更新到页面的div中
  updateView:function(){
    for(var r=0;r<this.RN;r++){//遍历data
      for(var c=0;c<this.CN;c++){
        var div=
          document.getElementById(
            "c"+r+c
          );
        //如果当前元素不是0
        if(this.data[r][c]!=0){
          //设置div的内容为当前元素的值
          div.innerHTML=this.data[r][c];
         //设置div的className为"cell n"+?
          div.className=
            "cell n"+this.data[r][c];
        }else{//否则
          //清楚div的内容
          div.innerHTML="";
          //设置div的className为"cell"
          div.className="cell";
        }
      }
    }
    //找到id为score的元素，设置其内容为score
    document.getElementById("score")
            .innerHTML=this.score;
    //找到id为top的元素，设置其内容为top
    document.getElementById("top")
            .innerHTML=this.top;
    //如果游戏的状态是GAMEOVER
    if(this.state==this.GAMEOVER){
      //找到id为gameOver的元素，设置其显示
      document.getElementById("gameOver")
              .style.display="block";
      //找到id为fScore的元素，设置其内容为score
      document.getElementById("fScore")
              .innerHTML=this.score;
      //如果score>top,就将score放入cookie
      if(this.score>this.top){
        setCookie("top",this.score);
      }
    }else{//否则
      //找到id为gameOver的元素，设置其隐藏
      document.getElementById("gameOver")
              .style.display="none";
    }
  },
  //在空位置生成一个随机的2或4
  randomNum:function(){
    while(true){//循环:
    //在0~RN-1之间生成一个随机的整数行号r
      var r=
       Math.floor(Math.random()*this.RN);
    //在0~CN-1之间生成一个随机的整数列号c
      var c=
       Math.floor(Math.random()*this.CN);
    //如果data中r行c列等于0
      if(this.data[r][c]==0){
      //将data中r行c列赋值为
        //随机生成一个小数<0.5?2:4
        this.data[r][c]=
          Math.random()<0.5?2:4;
        break;//退出循环
      }
    }
  },
  isGameOver:function(){//判断游戏结束
    //遍历data中每个元素
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        //如果当前元素是0
        if(this.data[r][c]==0){
          return false;//就返回false
        }
        //如果c<CN-1且当前元素等于右侧元素
        if(c<this.CN-1
          &&this.data[r][c]
            ==this.data[r][c+1]){
          return false;//就返回false
        }
        //如果r<RN-1且当前元素等于下方元素
        if(r<this.RN-1
          &&this.data[r][c]
            ==this.data[r+1][c]){
          return false;//就返回false
        }
      }
    }//(遍历结束)
    return true;//返回true
  },
  moveLeft:function(){//左移所有行
    //为data数组拍照，保存在before中
    var before=String(this.data);
    //遍历data中每一行
    for(var r=0;r<this.RN;r++){
      this.moveLeftInRow(r);//左移第r行
    }//(遍历结束)
    //为data数组拍照，保存在after中
    var after=String(this.data);
    //如果before不等于after时
    if(before!=after){
      this.randomNum();//随机生成一个数
      //如果游戏结束
      if(this.isGameOver()){
        //就修改游戏状态为GAMEOVER
        this.state=this.GAMEOVER;
      }
      this.updateView();//更新界面
    }
  },
  moveLeftInRow:function(r){//左移第r行
    //c从0开始，到<CN-1结束，每次增1
    for(var c=0;c<this.CN-1;c++){
      //查找c位置右侧下一个不为0的位置nextc
      var nextc=this.getNextInRow(r,c);
      //如果nextc是-1，就退出循环
      if(nextc==-1){break;}
      else{//否则
        //如果data中r行c列是0
        if(this.data[r][c]==0){
          //将c位置的值改为nextc位置的值
          this.data[r][c]=
            this.data[r][nextc];
          //将nextc位置的值归0
          this.data[r][nextc]=0;
          c--;//c留在原地
        }else if(this.data[r][c]==
                 this.data[r][nextc]){
        //否则，如果data中r行c列等于nextc列的值
          //将c位置的值*2,值累加到score
          this.score+=
            (this.data[r][c]*=2);
          //将nextc位置的值归零
          this.data[r][nextc]=0;
        }
      }
    }
  },
 //查找data中r行c列右侧下一个不为0的位置
  getNextInRow:function(r,c){
    //nextc从c+1开始，nextc到<RN结束
    for(var nextc=c+1;
        nextc<this.CN;
        nextc++){
      //如果data中r行nextc列不是0
      if(this.data[r][nextc]!=0){
        return nextc;//返回nextc
      }
    }//(遍历结束)
    return -1;//返回-1
  },
  moveRight:function(){//右移所有行
    //为data拍照，保存在变量before中
    var before=String(this.data);
    //遍历data中每一行
    for(var r=0;r<this.RN;r++){
      this.moveRightInRow(r);//右移第r行
    }//(遍历结束)
    //为data拍照，保存在变量after中
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      //随机生成数，更新界面
      this.randomNum();
      //如果游戏结束
      if(this.isGameOver()){
        //就修改游戏状态为GAMEOVER
        this.state=this.GAMEOVER;
      }
      this.updateView();
    }
  },
  moveRightInRow:function(r){//右移第r行
    //c从CN-1开始，到>0结束，每次递减1
    for(var c=this.CN-1;c>0;c--){
      //查找c位置左侧前一个不为0的位置prevc
      var prevc=this.getPrevInRow(r,c);
      //如果prevc等于-1，就退出循环
      if(prevc==-1){break;}
      else{//否则
        //如果c位置的值为0
        if(this.data[r][c]==0){
          //将prevc位置的值保存到c位置
          this.data[r][c]=
            this.data[r][prevc];
          //将prevc位置置为0
          this.data[r][prevc]=0;
          c++;//c留在原地
        }else if(this.data[r][c]==
                  this.data[r][prevc]){
        //否则，如果c位置的值等于prevc位置的值
          //将c位置的值*2
          this.score+=
            (this.data[r][c]*=2);
          //将prevc位置置为0
          this.data[r][prevc]=0;
        }
      }
    }
  },
  getPrevInRow:function(r,c){//查找r行c位置前一个不为0的位置
    //prevc从c-1开始,prevc到>=0结束,每次递减1
    for(var prevc=c-1;prevc>=0;prevc--){
      //如果prevc位置的值不是0
      if(this.data[r][prevc]!=0){
        return prevc;//返回prevc
      }
    }//(遍历结束)
    return -1;//返回-1    
  },
  moveUp:function(){//上移所有列
    //为data数组拍照，保存在before中
    var before=String(this.data);
    //c从0开始，到<CN结束
    for(var c=0;c<this.CN;c++){
      this.moveUpInCol(c);//上移第c列
    }//(遍历结束)
    //为data数组拍照，保存在after中
    var after=String(this.data);
    //如果before不等于after时
    if(before!=after){
      //随机生成一个数，更新界面
      this.randomNum();
      //如果游戏结束
      if(this.isGameOver()){
        //就修改游戏状态为GAMEOVER
        this.state=this.GAMEOVER;
      }
      this.updateView();
    }
  },
  moveUpInCol:function(c){//上移第c列
    //r从0开始，到<RN-1结束，每次增1
    for(var r=0;r<this.RN-1;r++){
      //查找r位置下方下一个不为0的位置nextr
      var nextr=this.getNextInCol(r,c);
      //如果nextr是-1，就退出循环
      if(nextr==-1){break;}
      else{//否则
        //如果data中r行c列是0
        if(this.data[r][c]==0){
          //将r位置的值改为nextr位置的值
          this.data[r][c]=
            this.data[nextr][c];
          //将nextr位置的值归0
          this.data[nextr][c]=0;
          r--;//r留在原地
        }else if(this.data[r][c]==
                   this.data[nextr][c]){
        //否则，如果data中r行c列等于nextr列的值
          //将r位置的值*2
          this.score+=
            (this.data[r][c]*=2);
          //将nextr位置的值归零
          this.data[nextr][c]=0;
        }
      }
    }
  },
  getNextInCol:function(r,c){//查找r行c列下方下一个不为0的位置
    //nextr从r+1开始，nextr到<RN结束,每次递增1
    for(var nextr=r+1;nextr<this.RN;nextr++){
      //如果data中nextr行c列不是0
      if(this.data[nextr][c]!=0){
        return nextr;//返回nextr
      }
    }//(遍历结束)
    return -1;//返回-1
  },
  moveDown:function(){//下移所有列
    //为data拍照，保存在变量before中
    var before=String(this.data);
    //遍历data中每一列
    for(var c=0;c<this.CN;c++){
      this.moveDownInCol(c);//下移第c行
    }//(遍历结束)
    //为data拍照，保存在变量after中
    var after=String(this.data);
    //如果before不等于after
    if(before!=after){
      //随机生成数，更新界面
      this.randomNum();
      //如果游戏结束
      if(this.isGameOver()){
        //就修改游戏状态为GAMEOVER
        this.state=this.GAMEOVER;
      }
      this.updateView();
    }
  },
  moveDownInCol:function(c){//下移第c列
    //r从RN-1开始，到>0结束，每次递减1
    for(var r=this.RN-1;r>0;r--){
      //查找r位置上方前一个不为0的位置prevr
      var prevr=this.getPrevInCol(r,c);
      //如果prevr等于-1，就退出循环
      if(prevr==-1){break;}
      else{//否则
        //如果r位置的值为0
        if(this.data[r][c]==0){
          //将prevr位置的值保存到r位置
          this.data[r][c]=
            this.data[prevr][c]
          //将prevr位置置为0
          this.data[prevr][c]=0;
          r++;//r留在原地
        }else if(this.data[r][c]==
                  this.data[prevr][c]){
        //否则，如果r位置的值等于prevr位置的值
          //将r位置的值*2
          this.score+=
            (this.data[r][c]*=2);
          //将prevr位置置为0
          this.data[prevr][c]=0;
        }
      }
    }
  },
  getPrevInCol:function(r,c){//查找r行c列上方前一个不为0的位置
    //prevr从r-1开始,prevr到>=0结束,每次递减1
    for(var prevr=r-1;prevr>=0;prevr--){
      //如果prevr位置的值不是0
      if(this.data[prevr][c]!=0){
        return prevr;//返回prevr
      }
    }//(遍历结束)
    return -1;//返回-1 
  }
}
//当页面加载后，自动调用game的start方法
window.onload=function(){game.start();}