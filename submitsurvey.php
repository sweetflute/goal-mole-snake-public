<?php
session_start();
$userID = session_ID();
// $userID = "d03fecfb5d01eacdf1a2cb834a0895d4";

$age = $_POST['age'];
$gender = $_POST['gender'];
$scoreE = $_POST['scoreE'];
$scoreA = $_POST['scoreA'];
$scoreC = $_POST['scoreC'];
$scoreN = $_POST['scoreN'];
$scoreI = $_POST['scoreI'];


$con = mysqli_connect('cfchung.vergil.u.washington.edu','root','qazpoils#','GOAL', 50001);
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"GOAL");

$sql = "UPDATE USER SET AGE = '$age', GENDER = '$gender', SCOREE = '$scoreE', SCOREA = '$scoreA', SCOREC = '$scoreC', SCOREN = '$scoreN', SCOREI = '$scoreI' WHERE ID = '$userID'";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>