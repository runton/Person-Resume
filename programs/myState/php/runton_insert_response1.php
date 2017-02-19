<?php
	header("Content-Type:text/html;charset=utf8");
	date_default_timezone_set('PRC');
	require_once('runton_fns.php');
	session_start();

	$user_id=(int)$_REQUEST['user_id'];
	$tid=(int)$_REQUEST['tid'];
	$text=$_REQUEST['text'];
	$response_id =randNum();
	$create_time =date('Y-m-d H:i:s',time());

	$conn = db_connect();
	$sql = "SET NAMES UTF8";

	$conn->query($sql);
	
	//数据库
	$sql ="insert into `response1` values(null,$user_id,$tid,'$text','$response_id','$create_time')";
	$result = $conn->query($sql);	
	
	
	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}

?>