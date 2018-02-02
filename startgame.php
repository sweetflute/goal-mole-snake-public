<?php
session_start();

$gameType = $_POST['gameType'];//0:mole, 1:snake
$groupID = $_POST['groupID'];//0:control, 1: 1-SG, 2: 2-SG, 3: 1-UG, 4: 2-UG
$round = $_POST['round'];//1:base game, 0: further game
$goal1 = $_POST['goal1'];//-1: no goal set
$goal2 = $_POST['goal2'];//-1: no goal set
$userID = session_ID();
$gameID = $userID."_".mt_rand();
$user_game_ID = mt_rand();

setcookie("gameID", $gameID, time()+3600);

$con = mysqli_connect('cfchung.vergil.u.washington.edu','root','qazpoils#','GOAL', 50001);
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"GOAL");

$sql_game = "INSERT INTO GAME (ID, GAMETYPE, GROUPID, ROUND, GOAL1, GOAL2, STARTTIME) 
			VALUES ('$gameID', '$gameType', '$groupID', '$round', '$goal1', '$goal2', now())";

if (!mysqli_query($con, $sql_game))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added to GAME";


$sql_user_game = "INSERT INTO USER_GAME (ID, USER_ID, GAME_ID, STARTTIME) 
			VALUES ('$user_game_ID', '$userID', '$gameID', now())";

if (!mysqli_query($con, $sql_user_game))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added to USER_GAME";

mysqli_close($con);
?>