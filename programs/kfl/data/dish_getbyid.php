<?php

header("Content-Type:application/json");
require_once('kaifanla_fns.php');

$output = Array();

@$id = @$_REQUEST['id'];
if(empty($id))
{
    echo '[]';
    return;
}

$conn = db_connect();
$sql = 'SET NAMES UTF8';
mysqli_query($conn,$sql);

$sql = "SELECT did,name,price,img_lg,material,detail FROM kf_dish WHERE did=$id";
$result = mysqli_query($conn,$sql);

$row = mysqli_fetch_assoc($result);
if(empty($row))
{
    echo '[]';
}
else
{
    $output[] = $row;
    echo json_encode($output);
}
?>