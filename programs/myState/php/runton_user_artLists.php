<?php
	header("Content-Type:application/json;charset=utf8");
	require_once('runton_fns.php');
	session_start();
	
	$user_id=$_POST['login_id'];
	
	$conn = db_connect();
	$sql = "SET NAMES UTF8";

	$conn->query($sql);
	
	//查询用户所有的文章
	$sql ="select * from blog where user_id=$user_id";
	$result = $conn->query($sql);
	
	$user_articles =array();
	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		while($row = $result->fetch_assoc()){
			$user_articles[] =$row;
		};
		echo json_encode($user_articles);
	}else{
		echo '[]';
	}
?>