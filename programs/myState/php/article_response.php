<?php
	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');

	$tid = $_REQUEST['tid'];

	//$user_id =$_REQUEST['user_id'];
	//$response_text = $_REQUEST['comment_text'];

	//链接数据库
	$conn = db_connect();

	$sql="SET NAMES UTF8";
	$conn->query($sql);

	//编写查询语句 获得用户图片、用户名 回复内容、回复发表时间 
	$sql ="select users.user_pic , users.username , response1.text,response_id,createTime from response1,users where response1.tid=$tid and users.user_id=response1.user_id";
	
	$result1 = $conn->query($sql);

	//定义一个空数组 用于保存返回结果集。
	$arr =array();
	if(!$result1){
		echo "[]";
	}
	//根据结果集生产html 用户回复文本 返回给客户端。
	$floor=1;
	while($row1=$result1->fetch_assoc()){
		
		echo "<div class='media'>";
		echo "<a href='' class='pull-left'>";
		echo "<img class='media-object img-responsive' src='".$row1['user_pic']."' alt=''/>";
		echo "</a><div class='media-body'>";
		echo "<p><a href=''>$row1[username]：</a></p>";
        echo "<p>$row1[text]</p>"; 
		if($row1['response_id']){
			$sql ="select users.user_pic , users.username , response2.text,createTime from response2 ,users where response2.response_id=$row1[response_id] and response2.user_id = users.user_id";
			$result2 = $conn->query($sql);
			//获得记录集行数
			$num = $result2->num_rows;
			echo "<p><span><a href='#'>回复($num)</a></span><span>$row1[createTime]</span><span class='floor'>$floor 楼</span></p>";
			while($row2=$result2->fetch_assoc()){
				echo "<div class='media'>";
				echo "<a href='#' class='pull-left'>";
				echo "<img class='media-object img-responsive' src='".$row2['user_pic']."' alt=''/>";
				echo "</a><div class='media-body'>";
				echo "<p><a href='#'>$row2[username]：</a></p>";
				echo "<p>$row2[text]</p>"; 
				echo "<p><span><a href='#'>回复</a></span><span>$row2[createTime]</span></p>";
				echo "</div></div>"; 
			}
		}else{
			echo "<p><span><a href='#'>回复(0)</a></span><span>$row1[createTime]</span><span>$floor 楼</span></p>";
		}
		echo "</div></div>";                
		$floor++;
	}
?>