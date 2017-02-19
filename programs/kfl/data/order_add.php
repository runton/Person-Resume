<?php
header("Content-Type:application/json;charset=utf8");
require_once('kaifanla_fns.php');

$output =Array();

$user_name = $_REQUEST['user_name'];
$phone = $_REQUEST['phone'];
$addr = $_REQUEST['addr'];
$sex = $_REQUEST['sex'];
$did = $_REQUEST['did'];
$order_time = time()*1000;

if(empty($user_name) || empty($phone)
|| empty($addr) || empty($did) || empty($sex))
{
    echo '[]';
    return;
}

$conn = db_connect();
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "INSERT INTO kf_order VALUES(NULL,'$phone','$user_name','$sex','$order_time','$addr','$did')";
$result = mysqli_query($conn,$sql);

$arr =Array();

if($result)
{
  $arr['msg'] = 'succ';
  $arr['oid'] =  mysqli_insert_id($conn);
}
else
{
   $arr['msg'] = 'err';
   $arr['reason'] = "SQL语句执行失败:$sql";
}

$output[] = $arr;

echo json_encode($output);

?>


