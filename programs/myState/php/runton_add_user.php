<?php
	header("Content-Type:text/html");
	require_once("runton_fns.php");
	date_default_timezone_set('PRC');

	$username=$_REQUEST['username'];
	$password =$_REQUEST['password'];
	$sex =$_REQUEST['sex'];
	$birth =$_REQUEST['birth'];
	$email =$_REQUEST['email'];
	$tel =$_REQUEST['tel'];
	$create_time =date('Y-m-d H:m:s',time());

	$conn = db_connect();
	$sql ="SET NAMES UTF8";
	$conn->query($sql);

	$sql ="insert into users values(null,'$username','$password','imgs/userImg/20131014171810879_ZG9YJ8V_03.png',null,'$sex','$birth','$email','$tel',null,null,'$create_time')";
	$result =$conn->query($sql);

	if($result&&$conn->affected_rows){
		echo "succ";
	}else{
		echo "fail";
	}
?>