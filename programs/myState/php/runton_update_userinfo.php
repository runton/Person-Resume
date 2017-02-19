<?php
	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');
	session_start();

	$user_id =(int)$_COOKIE['login_id'];
	$userImg = $_REQUEST['userImg'];
	$name = $_REQUEST['name'];
	$sex =$_REQUEST['sex'];
	$birth =$_REQUEST['birthday'];
	$email =$_REQUEST['email'];
	$tel =$_REQUEST['tel'];
	$question=$_REQUEST['question'];
	$answer=$_REQUEST['answer'];

	$conn = db_connect();
	$sql ="SET NAMES UTF8";
	$conn->query($sql);

	$sql ="update  users set user_pic ='$userImg',name='$name',sex = '$sex',birth='$birth',email='$email', tel='$tel',question='$question',answer='$answer' where user_id=$user_id";
	$result =$conn->query($sql);
	
	if($result&&$conn->affected_rows){
		echo "succ";
	}else{
		echo "fail";
	}
?>