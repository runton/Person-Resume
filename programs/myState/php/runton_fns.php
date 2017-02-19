<?php
	//随生成一个不重复的值 用于作为会话id
	function rememberkey(){
		return "rt".ceil(rand(1,999)*(1111)).date("U");
	}

	//封装数据库连接
	function db_connect(){
		return  new mysqli("localhost","root","","runton");
	}
	// 岁随机产生一个唯一的二级回复编号
	function randNum(){
		return ceil(rand(1,9)*10000).date("U");
	}
	// 防范SQL注入攻击
	function stripslashes_array(&$array)
	{
    	while(list($key,$var) = each($array))
    	{
			if ($key != 'argc' && $key != 'argv' && (strtoupper($key) != $key || ''.intval($key) == "$key"))
			{
				if (is_string($var)) {
					$array[$key] = stripslashes($var);
				}
				if (is_array($var)){
					$array[$key] = stripslashes_array($var);
				}
			}
		}
		return $array;
    }
?>