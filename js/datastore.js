function initialize()
{

  var groupID = $.cookie("groupID");

  var visit = $.cookie("visit");
  if(visit == null)
    visit = 1;
  else
    visit ++;

  // groupID= Math.floor(Math.random()*10)%5;
  groupID= Math.floor(Math.random()*10)%3;
  if (groupID == 1)
    groupID = 3
  if (groupID == 2)
    groupID = 4

  // randomNo = Math.floor(Math.random()*10)%3;
  // if(randomNo == 0)
  //   groupID = 4;
  // else
  //   groupID = randomNo;
  

  $.cookie('groupID', groupID, {expires: 365});
  $.cookie('visit', visit, {expires: 365});


  // alert(groupID);

  var userAgentStr = navigator.userAgent;
  var device = userAgentStr.slice(userAgentStr.indexOf("(") + 1, userAgentStr.indexOf(";"));
  // alert(device);
  
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
      // document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
      }
    }
  xmlhttp.open("POST","initialize.php",true);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send("visit=" + visit + "&groupID=" + groupID + "&device=" + device);
}

function recordStartTime(gameType, groupID, round, goal1, goal2)
  {
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
      // document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
      }
    }
  xmlhttp.open("POST","startgame.php",true);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send("gameType=" + gameType  + "&groupID=" + groupID + "&round=" + round + "&goal1=" + goal1 + "&goal2=" + goal2);
}

function recordEndTime(score, level)
{
  // alert(score + "/" + level);
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("POST","endgame.php",true);
xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send("score=" + score + "&level=" + level);
}

function endSession()
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("POST","endsession.php",true);
xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send();
}

function submitSurvey(age, gender, scoreE, scoreA, scoreC, scoreN, scoreI)
{
  // alert("age=" + age + "&gender=" + gender + "&scoreE=" + scoreE + "&scoreA=" + scoreA + "&scoreC=" + scoreC + "&scoreN=" + scoreN + "&scoreI=" + scoreI)

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("POST","submitsurvey.php",true);
xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send("age=" + age + "&gender=" + gender + "&scoreE=" + scoreE + "&scoreA=" + scoreA + "&scoreC=" + scoreC + "&scoreN=" + scoreN + "&scoreI=" + scoreI);
}


function enterRaffle(email)
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("POST","enterraffle.php",true);
xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send("email=" + email);
}