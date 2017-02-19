<?php
	header("Content-Type:text/html");
	require_once('runton_fns.php');
	session_start();

	//获得用户提交数据
	@$user_id =(int)$_COOKIE['login_id'];
	if(!$user_id){
		echo  'fail';
		exit;
	}
	$title = $_REQUEST['title'];
	$type = $_REQUEST['type'];
	$descoration = $_REQUEST['descoration'];
	$link = $_REQUEST['link'];
	date_default_timezone_set('PRC');
	$create_time = date("Y-m-d H:m:s",time());
	$state =0;
	
	$conn=db_connect();

	$sql = "SET NAMES UTF8";
	$conn->query($sql);

	$sql = "insert into source values(null,$user_id,'$title','$type','$descoration','$link','$create_time',$state)";
	$result = $conn->query($sql);

	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}
?>