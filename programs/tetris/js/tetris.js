var tetris ={
	OFFSET:15,     // 格子区域相对背景图片的偏移量
	CSIZE:26,    //每个格子的大小
	shape:null,
	nextShape:null,  //用于保存备胎图形
	pg:null,     //保存游戏注界面div
	interval:300,   //时间间隔
	timer:null,
	RN:20,
	CN:10,
	wall:[],
	score:0,  //当前游戏得分
	level:1,
	state:1,
	RUNNING:1,
	GAMEOVER:0,
	PAUSE:2,
	lines:0, //删除的总行数
	SCORES:[0,10,30,70,150],
	start:function(){
		this.score=0;
		this.state=this.RUNNING;
		this.lines=0;
		this.wall = [];
		for (var r=0;r<this.RN ; r++)
		{
			this.wall[r] =new Array(this.CN);
		}
		this.pg = document.querySelector(".playground");
		//实例化一个T图形，保存在shape中
		this.shape =this.randomShape();
		this.nextShape =this.randomShape();
		//调用paintShape，绘制主角图形
		this.paint();   //重绘一切
		//启动周期性定时器，序号保存在timer中
			//任务 moveDown  间隔： interval
		this.timer = setInterval(this.moveDown.bind(this),this.interval);
		
		//为document绑定按键事件
		document.onkeydown=function(e){
			//判断键盘号
			switch(e.keyCode)
			{
			case 37 :   //如果是37：就调用游戏对象的moveLeft
				this.state==this.RUNNING&&this.moveLeft();
				break;
			case 39:  //如果是39：就调用游戏对象的moveRight
				this.state==this.RUNNING&&this.moveRight();
				break;
			case 40:    //如果是40：就调用游戏对象的moveDown
				this.state==this.RUNNING&&this.moveDown();
				break;
			case 32:   //如果是40：就一落到地
				this.state==this.RUNNING&&this.hardDrop();
				break;
			case 38:
				this.state==this.RUNNING&&this.rotateR();break;
			case 90:
				this.state==this.RUNNING&&this.rotateL();break;
			case 83:
				this.state==this.GAMEOVER&&this.start();break;
			case 80:
				//在运行状态下暂停
				this.state==this.RUNNING&&this.pause();break;
			case 67:
				//在暂停状态下继续
				this.state==this.PAUSE&&this.myContinue();break;
			case 81:
				//在暂停状态下退出
				this.state==this.PAUSE&&this.Quit();break;
			}	
		}.bind(this);
		
	},
	Quit:function(){
		window.close();
	},
	myContinue:function(){
		this.state = this.RUNNING;
	},
	pause:function(){
		this.state = this.PAUSE;
		this.paint();
	},
	canRotate:function(){
		//遍历shape中的每个cell
		for (var i=0;i<this.shape.cells.length ;i++ )
		{
			var cell=this.shape.cells[i];
			//如果cell的r<0或>=RN
			//或cell的c<0或>=CN
			//或wall中和cell相同位置有格
			//就返回false
			if(cell.r<0||cell.r>=this.RN||cell.c<0||cell.c>=this.CN||this.wall[cell.r][cell.c]){
				return false;
			}
		}
		//遍历结束
		return true;//返回true
	},
	rotateR:function(){
		this.shape.rotateR();
		//如果不能旋转，再左转回来
		if(!this.canRotate()){
			this.shape.rotateL();
		}else{
			this.paint(); //重绘一切
		}
	},
	rotateL:function(){
		this.shape.rotateL();
		//如果不能旋转，再左转回来
		if(!this.canRotate()){
			this.shape.rotateR();
		}else{
			this.paint(); //重绘一切
		}
	},
	randomShape:function(){
		//在0~2之间生成一个随机数r
		var r =parseInt(Math.random()*3);
		//判断r:
		switch(r){
			case 0://r=0: 返回新的O图形
				return new O();break;
			case 1://r=1:返回新的T图形
				return new T();break;
			case 2://r=2:返回新的L图形
				return new L();
		}
	},
	hardDrop:function(){
		//循环：只要可以下落
		//就调用moveDown
		while(this.canDown()){
			this.moveDown();
		}
	},
	canLeft:function(){
		//遍历shape中的每个cell
		for(var r =0;r<this.shape.cells.length;r++){
			var cell =this.shape.cells[r];
			if(cell.c==0||this.wall[cell.r][cell.c-1]){  //如果当前cell的c是0或者wall中cell左侧有格
				return false; //返回false
			}
		}
		return true;   //返回true	
	},
	canRight:function(){
		//遍历shape中的每个cell
		for(var r =0;r<this.shape.cells.length;r++){
			var cell =this.shape.cells[r];
			//如果当前cell的c是9或者wall中cell右侧有格
			if(cell.c==9||this.wall[cell.r][cell.c+1]){
				return false;  //返回false
			}
		}	
		return true;  //返回true
	},
	moveLeft:function(){
		if(this.canLeft()){
			this.shape.moveLeft();
			this.paint();
		}
	},
	moveRight:function(){
		if(this.canRight()){
			this.shape.moveRight();
			this.paint();
		}
	},
	canDown:function(){ //判断是否可下落
		for (var i=0;i<this.shape.cells.length ;i++ )
		{
			var cell =this.shape.cells[i];
			if (this.shape.cells[i].r ==this.RN-1||this.wall[cell.r+1][cell.c])
			{
				return false;
			}
		}
		return true;
	},
	moveDown:function(){   //让主角图形下落一步
		//如果游戏的状态为RUNNING时，才执行下面操作
		if(this.state==this.RUNNING){
			if (this.canDown())
			{
			//调用shape的moveDown方法
			this.shape.moveDown();
			}else{
				//让shape中的格子落到墙里
				this.landIntoWall();
				//判断并删除满格行
				var ln = this.deleteRows();
				this.lines+=ln;
				this.score += this.SCORES[ln];
				var l =parseInt(this.lines/10)+1;
				if(l>this.level){
					this.level = l;
					if(this.interval>100){
						this.interval -=(this.level-1)*100;
						clearInterval(timer);
						this.timer = setInterval(this.moveDown,this.interval)
					};
				}
				//如果游戏没有结束
				if(!this.isGameOver()){
					//重新实例化主角图形
					this.shape =this.nextShape;
					this.nextShape=this.randomShape();
				}else{
				//否则
					//	停止定时器  清空timer修改游戏状态为GAMEOVER
					clearInterval(this.timer);
					this.timer=null;
					this.state=this.GAMEOVER;
				}
			}
			//重绘主角图形paint()
			this.paint(); //重绘一切
		}
	},
	isGameOver:function(){
		for (var i =0;i<this.nextShape.cells.length ;i++ )
		{
			var cell =this.nextShape.cells[i];
			if (this.wall[cell.r][cell.c])
			{
				return true;
			}
		}
		return false;
	},
	paintState:function(){
		var img =new Image();
		if (this.state==this.GAMEOVER)
		{
			img.src = "img/game-over.png";
		}else if(this.state==this.PAUSE){
			img.src ="img/pause.png";
		}
		this.pg.appendChild(img);
	},
	deleteRows:function(){//遍历并删除所有满格行
		//自底向上遍历wall中的每一行   同时声明ln=0
		for (var r=this.wall.length-1,ln=0;r>=0 ; r--)
		{
			//如果wall中r行为空，就直接退出循环
			//console.log(this.wall[r]);
			//debugger;
			if(this.wall[r].join("")==""){
				
				break;
			}else if(this.isFull(r)){
			//如果r行为满格
				//删除第r行
				this.deleteRow(r);
				//r留在原地
				r++;
				//ln+1
				ln++;
				//如果ln是4，就直接退出循环
				if(ln==4){
					break;
				}
			}
		}
		//遍历结束
		return ln;
	},
	deleteRow:function(r){ //删除第r行
		//i从r开始，自底向上遍历wall中每一行
		for(var i=r;i>=0;i--){
			//将wall中的i-1 行赋值给wall中的第i行
			this.wall[i]=this.wall[i-1];
			//遍历wall中第i行的每个cell
			for(var c =0;c<this.CN;c++){
				if(this.wall[i][c]){
					//将当前cell的r+1
					this.wall[i][c].r++;
				}
			//遍历结束
			}
			//创建CN个空元素的新数组赋值给wall中的i-1行
			this.wall[i-1] = new Array(this.CN);
			//如果wall中i-2行为空
			if(this.wall[i-2].join("")=="")
			{
				break;  //退出循环
			}
		}
	},
	isFull:function(r){  // 判断r行是否满格
		//将wall中r行拍照后，验证是否包含^,或,,或,$,转为!, 返回结果
		return !/^,|,,|,$/.test(String(this.wall[r]));
	},
	landIntoWall:function(){
		//遍历shape中每个cell
		for (var i=0;i<this.shape.cells.length ; i++)
		{
			var cell =this.shape.cells[i];
			 //将wall中和当前cell相同r,c位置的元素赋值为cell
			 this.wall[cell.r][cell.c]=cell;
		}	 
	},
	paint:function(){   //负责重绘一切
		//删除pg下的所有img
		this.pg.innerHTML=this.pg.innerHTML.replace(/<img\s+[^>]*>/g,"");
		this.paintShape(); 
		this.paintWall();
		this.paintScore();
		this.paintNext();
		this.paintState();
	},
	paintNext:function(){
		//
		var frg =document.createDocumentFragment();
		
		for (var i=0;i<this.nextShape.cells.length ;i++ )
		{
			var cell =this.nextShape.cells[i];
			var img =new Image();
			img.src = cell.src;
			img.style.top = (cell.r+1)*this.CSIZE+this.OFFSET+"px";
			img.style.left = (cell.c+11)*this.CSIZE+this.OFFSET+"px";
			frg.appendChild(img);
		}
		this.pg.appendChild(frg);
	},
	paintScore:function(){
		this.pg.querySelector("p:first-child>span").innerHTML=this.score;
		this.pg.querySelector("p:nth-child(2)>span").innerHTML=this.lines;
		this.pg.querySelector("p:nth-child(3)>span").innerHTML=this.level;
	},
	paintWall:function(){
		//创建文档片段
		var frg =document.createDocumentFragment();
		//自底向上遍历墙中的每个cell：r从RN-1开始，到>=0结束，每次-1
		for(var r=this.RN-1;r>=0;r--)
		{
			//如果wall中r行无缝拼接后等于""
			if(this.wall[r].join("")=="")
			{
				break;  //退出循环
			}else {   //否则
				//c从0开始，到CN结束
				for(var c=0;c<this.CN;c++){
					//如果当前格有效，绘制当前格
					var cell = this.wall[r][c];
					if(cell){
						this.paintCell(cell,frg);
					}
				}
			}
		}
		//遍历结束
		//将frg追加到pg中
		this.pg.appendChild(frg);
	},
	paintShape:function(){  //负责绘制主角图形
		//创建一个文档片段
		var frg = document.createDocumentFragment();
		for (var i=0;i<this.shape.cells.length ;i++ )
		{
			var cell = this.shape.cells[i];
			this.paintCell(cell,frg);
		}
		this.pg.appendChild(frg);
	},
	paintCell:function(cell,frg){
		var img = new Image();
		img.src = cell.src;
		img.style.top = cell.r*this.CSIZE+this.OFFSET+"px";
		img.style.left = cell.c*this.CSIZE+this.OFFSET+"px";
		frg.appendChild(img);
	},
}
tetris.start();