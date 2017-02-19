<?php
	//实现删除用户指定的文章的操作
	header("Content-Type:text/html;charset=utf8");
	date_default_timezone_set('PRC');
	require_once('runton_fns.php');
	session_start();
	
	//获取需要更新的数据
	$user_id=$_REQUEST['user_id'];
	$tid=$_REQUEST['tid'];
	$title = $_REQUEST['title'];
	$authorname = $_REQUEST['author'];
	$label = $_REQUEST['label'];
	$type = $_REQUEST['type'];
	$loadUrl = $_REQUEST['loadUrl'];
	$decoration = $_REQUEST['decoration'];
	$htmlText = $_REQUEST['htmlText'];
	$alter_time = $_REQUEST['alter_time'];
	$state = $_REQUEST['state'];
	
	$conn = db_connect();
	$sql = "SET NAMES UTF8";

	$conn->query($sql);

	//更新数据库
	$sql ="update blog set title=$title,authorname=$authorname,label=$label,type=$type,loadUrl=$loadUrl,decoration=$decoration,htmlText=$htmlText,alter_time=$alter_time,state=$state where tid=$tid";
	$result = $conn->query($sql);

	
	//检查执行返回结果是否为空
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}

?>