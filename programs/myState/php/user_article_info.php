<?php
	header("Content-Type:application/json;charset=utf9");
	require_once('runton_fns.php');

	//获得用户id
	$user_id = $_REQUEST['user_id'];

	//连接数据库
	$conn = db_connect();

	//设置字符编码
	$sql = "SET NAMES UTF8";
	$conn->query($sql);

	//编辑查询语句
	$sql ="select * from blog where blog.user_id = $user_id";
	$result = $conn->query($sql);
	
	$info =array();
	//判断查询是否成功
	if($result&&$conn->affected_rows){
		//将查询结果以json数据格式返回给客户端
		$row = $result->fetch_assoc();
		$info[] = $row;
		echo json_encode($info);
	}else{
		echo '[]';
	}
?>