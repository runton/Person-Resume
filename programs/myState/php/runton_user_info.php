<?php
	header("Content-Type:application/json;charset=utf8");
	require_once('runton_fns.php');
	session_start();

	$user_id=(int)$_REQUEST['user_id'];
	
	$conn = db_connect();
	$sql = "SET NAMES UTF8";

	$conn->query($sql);
	
	//数据库连接
	$sql ="select * from users where user_id=$user_id";
	$result = $conn->query($sql);

	$arr =array();
	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		$row = $result->fetch_assoc();
		$arr[] =$row;
		echo json_encode($arr[0]);
	}else{
		echo '[]';
	}

?>