<?php
session_start();
$gameID = $_COOKIE["gameID"];
print_r($_COOKIE);
$score = $_POST['score'];
$level = $_POST['level'];

echo "gameID=".$gameID;


$con = mysqli_connect('cfchung.vergil.u.washington.edu','root','qazpoils#','GOAL', 50001);
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"GOAL");

$sql = "UPDATE GAME SET ENDTIME = now(), SCORE = '$score', LEVEL = '$level' WHERE ID = '$gameID'";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>