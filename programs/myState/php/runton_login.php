<?php
	require_once('runton_fns.php');
	header("Content-Type:application/json");

	//$_GET = stripslashes_array($_GET);
    $_POST = stripslashes_array($_POST);

	$username =$_POST['username'];
	$passwd =$_POST['password'];
	$output =array();
	//检查变量值是否为空
	if(!$username||!$passwd){
		$output['reason'] = "用户名或密码不能为空。";
	}
	//建立数据库连接
	$conn = db_connect();

	$sql = "select * from users where username='$username' and passwd = '$passwd'";
	$result = $conn->query($sql);
	if($result){
		$row = $result->fetch_assoc();
		if(!$row){
			$output['reason'] = "用户名或密码不正确。";
		}else{
			$output['msg'] ="succ";
			$output['login_id'] =$row['user_id'];
			//建立会话id
			$id=rememberkey();
			session_id($id);
			session_start();
			
		}
	}
	echo json_encode($output);
?>