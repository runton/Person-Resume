<?php
	header("Content-Type:application/json;charset=utf8");
	require_once('runton_fns.php');
	session_start();

	$conn=db_connect();

	$sql = "SET NAMES UTF8";
	$conn->query($sql);

	$sql = "select * from source limit 0,30";
	$result = $conn->query($sql);

	//检查执行返回结果是否为空
	if(!$result&&!$conn->affected_rows){
		echo '[]';
	}
	
	$source =array();

	while($row=$result->fetch_assoc()){
		//提取每行数据
		$source[] =$row;
	} 

	echo json_encode($source);
?>