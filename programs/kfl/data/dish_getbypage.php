<?php
header('Content-Type:application/json');
require_once('kaifanla_fns.php');

$output =Array();

$count = 5;

@$start = @$_REQUEST['start'];
if(empty($start))
{
    $start = 0;
}

$conn = db_connect();
$sql = 'SET NAMES UTF8';
mysqli_query($conn,$sql);

$sql = "SELECT did,name,price,img_sm,material FROM kf_dish LIMIT $start,$count";
$result = mysqli_query($conn,$sql);

while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);

?>