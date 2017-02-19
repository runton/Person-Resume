<?php 
	session_start();
	date_default_timezone_set('prc');

	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');
	
	//获得需要插入blog表中的字段数据
	$user_id = (int)$_COOKIE['login_id'];
	$title = $_REQUEST['title'];
	$authorname = $_REQUEST['author'];
	$label = $_REQUEST['labels'];
	$type=(int)$_REQUEST['type'];
	$loadUrl=$_REQUEST['loadUrl'];
	$decoration=$_REQUEST['decoration'];
	$htmlText = $_REQUEST['editorValue'];
	$createTime =date('Y-m-d H:i:s',time());
	$state = (int)$_REQUEST['state'];


	//建立数据库连接
	$conn = db_connect();

	$sql = "SET NAMES UTF8";
	$conn->query($sql);

	//修改数据库表blog 向其中插入数据
	$sql = "insert into blog values(null,$user_id,'$title','$authorname','$label',$type,'$loadUrl','$decoration','$htmlText','$createTime',null,$state)";
	$result = $conn->query($sql);
	

	//判断数据插入操作执行影响的行数
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}
?>