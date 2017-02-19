<?php
	header("Content-Type:text/html");
	require_once("runton_fns.php");

	$username =$_REQUEST['username'];

	$conn = db_connect();

	$sql ="select * from users where username='$username'";
	$result =$conn->query($sql);

	if($result&&$conn->affected_rows){
		echo "exist";
	}else{
		echo "none";
	}
?>