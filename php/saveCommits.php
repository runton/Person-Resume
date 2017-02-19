<?php
	header("Content-Type:text/html;charset=utf8");
	
	$commits = stripslashes($_POST['commit']);
	$filename = "../".$_POST['commentUrl'];

	if(file_exists($filename) && abs(filesize($filename))>0){ 
		//读取json文件内容
		$json_str =file_get_contents($filename);
		//将json_str内容转换成对象
		$commit_json = json_decode($json_str,true);
	 }else{ 
		 $commit_json = array(); 
	 } 
	$newCommit = '['.$commits.']';

	//将新评论字符串内容转换成对象
	$newCommit = json_decode($newCommit,true);

	//将新评论内容追加到commit_json对象中
	$content = array_merge($commit_json,$newCommit);
	
	if(is_array($content)){
		//往json文件保存评论内容 
		$result=file_put_contents($filename, json_encode($content)); 
		if($result){
			echo true;
		}else{
			echo false;
		}
	}else{
		echo false;
	}