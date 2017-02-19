<?php
	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');
	session_start();

	$user_id=(int)$_REQUEST['user_id'];
	$start_row=(int)$_REQUEST['start_row']-1;
	$tid=$_REQUEST['tid'];
	$text=$_REQUEST['text'];
	date_default_timezone_set('PRC');
	$create_time =date('Y-m-d h:m:s',time());

	$conn = db_connect();
	$sql = "SET NAMES UTF8";

	$conn->query($sql);
	
	//获得二级回复的ID值
	$sql ="select response_id from response1 where tid='$tid' limit $start_row,1 ";
	$result = $conn->query($sql);

	$row = $result->fetch_assoc();
	$response_id=$row['response_id'];
	
	//数据库内连接
	$sql ="insert into response2 values(null,'$response_id',$user_id,'$text','$create_time')";
	$result = $conn->query($sql);

	
	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}

?>