<?php
	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');
	session_start();

	//获得文章标签
	$label = $_REQUEST['label'];

	//连接数据库
	$conn = db_connect();

	//设置字符编码
	$sql = "SET NAMES UTF8";
	$conn->query($sql);

	//编写查询语句 根据文章标签获得文章详细信息
	$sql ="select tid,user_id,title,authorname,label,type,decoration,create_time from blog where label like '%$label%'";
	$result = $conn->query($sql);

	//判断查询是否成功
	if(!$result||($conn->affected_rows)==0){
		echo 'fail';
	}
	
	//处理数据，将数据拼接到html标签中返回给客户
	while($row=$result->fetch_assoc()){
		
		//根据文章的上传用户id 获得用户的图像和用户名称
		$sql = "select user_pic,username from users where user_id =$row[user_id]";
		$result1 = $conn->query($sql);
		$sql = "select count(*) AS resNum from response1 where tid =$row[tid]";
		$result2 = $conn->query($sql);
		
		//判断查询是否成功
		if(!$result||($conn->affected_rows)==0){
			echo 'fail';
			exit;
		}

		echo "<div class='media'><span class='pull-left'>";
		//根据文章的类型，加载不同的图片
		if($row['type']=='0'){
			echo "<img class='media-object' src='imgs/1473234438240.gif' alt=''/>";
		}else{
			echo "<img class='media-object' src='imgs/1473234397502.gif' alt=''/>";
		}
		echo "</span><div class='media-body'><h4 class='media-heading' data-tid='".$row['tid']."'>".$row['title']."</h4>";
		echo "<p>".$row['decoration']."</p></div><hr/>";
		echo "<div class='media-item'>";

		$row1=$result1->fetch_assoc();
		$row2=$result2->fetch_assoc();
		echo "<img class='img-responsive' src='".$row1['user_pic']."' alt=''/><span>".$row1['username']."</span>";
		echo "<p><span>".$row['create_time']."</span><span>|</span><span>".$row2['resNum']." 回复</span></span></p></div></div>";
	}
?>