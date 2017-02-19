<?php 
	session_start();
	date_default_timezone_set('prc');

	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');
	
	//获得需要插入blog表中的字段数据
	$user_id = (int)$_COOKIE['login_id'];
	$tid = (int)$_REQUEST['tid'];
	$title = $_REQUEST['title'];
	$authorname = $_REQUEST['author'];
	$label = $_REQUEST['labels'];
	$type=(int)$_REQUEST['type'];
	$loadUrl=$_REQUEST['loadUrl'];
	$decoration=$_REQUEST['decoration'];
	$htmlText = $_REQUEST['editorValue'];
	$alterTime =date('Y-m-d H:i:s',time());
	$state = (int)$_REQUEST['state'];


	//建立数据库连接
	$conn = db_connect();

	$sql = "SET NAMES UTF8";
	$conn->query($sql);

	
	if($user_id){
		//更新数据库表blog 修改其中的数据
		$sql = "update  blog set title='$title',authorname='$authorname',label= '$label',type=$type,loadUrl='$loadUrl', decoration='$decoration', htmlText='$htmlText',alter_time='$alterTime',state=$state where tid=$tid";
		$result = $conn->query($sql);
	}else{
		$result=null;
	}
	//判断数据插入操作执行影响的行数
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}
?>