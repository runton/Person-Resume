<?php
	session_start();
	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');

	$tid=(int)$_REQUEST['tid'];

	$conn = db_connect();
	$sql = "SET NAMES UTF8";
	
	$conn->query($sql);

	$sql ="select * from art_stat where tid=$tid";
	$result = $conn->query($sql);

	if($result&&$conn->affected_rows){
		$sql = "update art_stat set read_num = read_num + 1 where tid=$tid";
	}else{
		$sql ="insert into art_stat values($tid,0,0,0)";
	}

	$result = $conn->query($sql);

	//判断数据插入操作执行影响的行数
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}
?>