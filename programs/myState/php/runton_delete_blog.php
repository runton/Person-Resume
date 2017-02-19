<?php
	//实现删除用户指定的文章的操作
	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');
	session_start();

	$user_id=$_REQUEST['user_id'];
	$tid=$_REQUEST['tid'];
	
	$conn = db_connect();
	
	//数据库内连接
	$sql ="delete table blog where tid=$tid";
	$result = $conn->query($sql);

	
	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}

?>