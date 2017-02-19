<?php
	header("Content-Type:application/json;charset=utf8");
	require_once('runton_fns.php');
	session_start();

	//连接数据库
	$conn = db_connect();

	//设置字符编码
	$sql = "SET NAMES UTF8";
	$conn->query($sql);

	//编写查询语句 根据文章编号获得文章详细信息
	$sql ="select tid,title,create_time from blog order by tid DESC limit 0,4 ";
	$result = $conn->query($sql);
	
	$info = array();

	//判断查询是否成功
	if($result&&$conn->affected_rows){
		//将查询结果以json数据格式返回给客户端
		while($row = $result->fetch_assoc()){
			$info[] = $row;
		}
		echo json_encode($info);
	}else{
		echo '[]';
	}
?>