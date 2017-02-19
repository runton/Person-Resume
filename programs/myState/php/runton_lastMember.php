<?php
	header("Content-Type:application/json;charset=utf8");
	require_once('runton_fns.php');
	session_start();
	
	$conn = db_connect();
	$sql = "SET NAMES UTF8";

	$conn->query($sql);
	
	//数据库连接
	$sql ="select * from users order by user_id desc limit 0,8";
	$result = $conn->query($sql);

	$arr =array();
	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		while($row = $result->fetch_assoc()){
			$arr[] =$row;
		};
		echo json_encode($arr);
	}else{
		echo '[]';
	}

?>