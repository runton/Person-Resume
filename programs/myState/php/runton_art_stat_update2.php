<?php
	session_start();
	header("Content-Type:text/html;charset=utf8");
	require_once('runton_fns.php');

	$tid=(int)$_REQUEST['tid'];
	$vote =$_REQUEST['vote'];

	$conn = db_connect();
	$sql = "SET NAMES UTF8";
	
	$conn->query($sql);

	if($vote=="upvote"){
		$sql = "update art_stat set upvote = upvote + 1 where tid=$tid";
	}else if($vote=="devalue"){
		$sql = "update art_stat set devalue = devalue + 1 where tid=$tid";
	}

	$result = $conn->query($sql);

	//判断数据插入操作执行影响的行数
	if($result&&$conn->affected_rows){
		echo 'succ';
	}else{
		echo 'fail';
	}
?>