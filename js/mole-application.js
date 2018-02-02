var round = 1;
//----------------------------------
//*** Event when jqm init **********
//----------------------------------
$(document).on("mobileinit", function() {
	
});

//-----------------------------------
//*** Event in page Step 2 **********
//-----------------------------------
$(document).on("pagecreate", "#step2", function(event) {
	
	$("#step2ContinueBtn").on("click", function(){
		// alert("initialize");
		initialize();
		$("#player").attr("src", "");

	});
	
});

$(document).on("pageshow", "#step2", function(event) {
});

//-----------------------------------
//*** Event in page Step 3 **********
//-----------------------------------
$(document).on("pagecreate", "#step3", function(event) {
	
	$("#step3InitStartBtn").on("click", function(){
		timer = utils.setTimer(renderMole, speed);
		flag = 1;//start as clicked
		$("#step3InitPopup").popup("close");
		var groupID = $.cookie("groupID");
		recordStartTime(0, parseInt(groupID), round, -1, -1);
	});
	
});

$(document).on("pageshow", "#step3", function(event) {
	initGame("step3");
	$("#step3InitPopup").popup("open");
});

function showStep3Result(score, level) {
	$("#step3Result").html(score);
	$("#step3ResultPopup").popup("open");

	recordEndTime(score, level);

	var groupID = $.cookie("groupID");
	if(groupID == 1){
		$("#systemGoal1_1").html(score + 13);
	}else if (groupID == 2){
		$("#systemGoal2_1").html(score + 7);
		$("#systemGoal2_2").html(score + 13);
	}
}

//-----------------------------------
//*** Event in page Step 4 **********
//-----------------------------------
$(document).on("pagecreate", "#step4", function(event) {

	$.validator.addMethod("myGreaterThan", function(value, element) {
        return parseInt($("#goal2_2").val()) > parseInt($("#goal2_1").val());
    }, "main goal must larger than backup goal");

	var groupID = $.cookie("groupID");

	$("#step4InitStartBtn" + groupID).on("click", function(){
		timer = utils.setTimer(renderMole, speed);
		flag = 1;//start as clicked

		var goal1 = -1;
		var goal2 = -1;
		switch(parseInt(groupID)){
			case 0:
				break;
			case 1:
				goal2 = $("#systemGoal1_1").html();
				
				$("#prevGoal1").html("Goal: " + goal2);				
				break;
			case 2:
				goal1 = $("#systemGoal2_1").html();
				goal2 = $("#systemGoal2_2").html();

				$("#prevGoal1").html("Main Goal: " + goal2);
				$("#prevGoal2").html("Backup Goal: " + goal1);
				break;
		}
		
		round ++;
		recordStartTime(0, parseInt(groupID), round, goal1, goal2);
		$("#step4InitPopup" + groupID).popup("close");

	});
	
	$("#step4ReplayBtn").on("click", function(){
		$("#step4ResultPopup").popup("close");
		setTimeout( function(){
			score = parseInt($("#step4Score").html());


			$("#step4Game").remove();

			$("#step4LevelHolder" ).after( "<ul id=\"step4Game\"></ul>" );
			$("#step4Score").html("0");
			$("#step4LevelHolder").html("Level: <span id=\"step4Level\">1</span><span id=\"step4Levelup\"><strong></strong></span>");
			
			if(parseInt(groupID) == 0){
				initGame("step4");
				timer = utils.setTimer(renderMole, speed);
				flag = 1;//start as clicked
				round ++;
				recordStartTime(0, parseInt(groupID), round, -1, -1);
			}else{
				switch(parseInt(groupID)){
					case 1:
						var sgoal1 = $("#systemGoal1_1").html();
						if(score >= parseInt(sgoal1)){
							$("#systemGoal1_1").html(score + 10);
						}else{
							$("#systemGoal1_1").html(sgoal1);
						}
						break;
					case 2:
						var sgoal2_1 = $("#systemGoal2_1").html();
						var sgoal2_2 = $("#systemGoal2_2").html();
						if(score >= parseInt(sgoal2_2)){
	    					$("#sgLabel2_2").html("Now, try to reach <span id=\"systemGoal2_2\">" + (score + 10) + "</span> points.");
							$("#sgLabel2_1").html("Or, at least get <span id=\"systemGoal2_1\">" + (score + 5) + "</span> points.");

							// $("#systemGoal2_1").html(score + 5);
							// $("#systemGoal2_2").html(score + 10);
						}else if(score >= parseInt(sgoal2_1)){
							$("#sgLabel2_2").html("Now, keep trying for your main goal: <span id=\"systemGoal2_2\">" + sgoal2_2 + "</span> points.");
							$("#sgLabel2_1").html("You've already met your backup goal (<span id=\"systemGoal2_1\">" + sgoal2_1 + "</span> points)!");

							// $("#systemGoal2_1").html(score);
							// $("#systemGoal2_2").html(sgoal2_2);
						}else{
							$("#sgLabel2_2").html("Keep trying until you reach <span id=\"systemGoal2_2\">" + sgoal2_2 + "</span> points.");
							$("#sgLabel2_1").html("Or at least get <span id=\"systemGoal2_1\">" + sgoal2_1 + "</span> points!");
						}
						break;
					case 3:
						if(score >= parseInt($("#goal1_1").val())){
							$("#goalInput").show();
							$("#labelGoal1_1").html("My new goal is to play until I reach ");
						}else{
							$("#goalInput").hide();
							$("#labelGoal1_1").html("Remember, you set a goal to score " + $("#goal1_1").val() + " points.");
						}
						break;
					case 4:
						var ugoal1 = $("#goal2_1").val();
						var ugoal2 = $("#goal2_2").val();

						if(score >= ugoal2){
							$("#goalInput1").show();
							$("#goalInput2").show();

							$("#labelGoal2_2").html("My new goal is to play until I score ");
							$("#labelGoal2_1").html("If that is too hard, I want to score at least ");
						}else if(score >= ugoal1){
							$("#goalInput1").hide();
							$("#goalInput2").hide();

							$("#labelGoal2_2").html("Remember, you set a main goal to score " + ugoal2 + " points.");
							$("#labelGoal2_1").html("You've already met your backup goal (" + ugoal1+ " points)!");
						}else{
							$("#goalInput1").hide();
							$("#goalInput2").hide();

							$("#labelGoal2_2").html("Remember, you set a main goal to play until you reach " + ugoal2 + " points.");
							$("#labelGoal2_1").html("Or, as a backup, at least " + ugoal1 + " points.");	
						}
						break;
				}

				initGame("step4");
				$("#step4InitPopup" + groupID).popup("open");
			}
		}, 100 );
	});

});

$(document).on("pageshow", "#step4", function(event) {
	var groupID = $.cookie("groupID");
	// alert("hello"+groupID);
	initGame("step4");
	$("#step4InitPopup" + groupID).popup("open");
	
	$("#step4InitPopup3Form").validate({
		rules:{
    		goal1_1: {
      			required: true,
     			number: true,
     			min: 1
    		},
    	},
        errorPlacement: function(error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function(form) {
            
            timer = utils.setTimer(renderMole, speed);
            flag = 1;//start as clicked

            var goal1 = -1;
            var goal2 = -1;
            
            goal2 = $("#goal1_1").val();
            $("#prevGoal1").html("Goal: " + goal2);

            round ++;
            recordStartTime(0, parseInt(groupID), round, goal1, goal2);

            $("#step4InitPopup3").popup("close");
            
            return false;
        }
    });
    
    $("#step4InitPopup4Form").validate({
    	rules:{
    		goal2_1: {
      			required: true,
     			number: true,
     			min: 1
    		},
    		goal2_2: {
      			required: true,
     			number: true,
     			min: 1
    		}
    	},
        errorPlacement: function(error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function(form) {
            
            timer = utils.setTimer(renderMole, speed);
            flag = 1;//start as clicked

            var goal1 = -1;
            var goal2 = -1;
            
            goal1 = $("#goal2_1").val();
            goal2 = $("#goal2_2").val();

            $("#prevGoal1").html("Main Goal: " + goal2);
			$("#prevGoal2").html("Backup Goal: " + goal1);
            
            round++;
            recordStartTime(0, parseInt(groupID), round, goal1, goal2);

            $("#step4InitPopup4").popup("close");
            
            return false;
        }
    });
});

function showStep4Result(score, level) {
	var groupID = $.cookie("groupID");

	switch(parseInt(groupID)){
		case 0:
			$("#step4Result").html("You got " + score + " points.");
			break;
		case 1:
			if(score >= parseInt($("#systemGoal1_1").html())){
				exPoints = score - parseInt($("#systemGoal1_1").html());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your goal (" + score + " points)!");
			}
			else
				$("#step4Result").html("You got " + score + " points, " + (parseInt($("#systemGoal1_1").html()) -  score) + " short of your goal." );
			break;
		case 2:
			if(score >= parseInt($("#systemGoal2_2").html())){
				exPoints = score - parseInt($("#systemGoal2_2").html());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your main goal (" + score + " points)!");
			}
			else if(score >= parseInt($("#systemGoal2_1").html()))
				$("#step4Result").html("You were " + (parseInt($("#systemGoal2_2").html()) - score) + " points short of your main goal, but you met your backup goal with " + score + " points!");
			else
				$("#step4Result").html("You got " + score + " points, " +(parseInt($("#systemGoal2_2").html()) - score) + " short of your main goal and " + (parseInt($("#systemGoal2_1").html()) - score)+ " short of your backup goal.");
			break;
		case 3:
			if(score >= parseInt($("#goal1_1").val())){
				exPoints = score - parseInt($("#goal1_1").val());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your goal (" + score + " points)!");
			}
			else
				$("#step4Result").html("You got " + score + " points, " + (parseInt($("#goal1_1").val()) - score) + " short of your goal.");
			break;
		case 4:
			if(score >= parseInt($("#goal2_2").val())){
				exPoints = score - parseInt($("#goal2_2").val());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your main goal (" + score + " points)!");
			}
			else if(score >= parseInt($("#goal2_1").val()))
				$("#step4Result").html("You were " + (parseInt($("#goal2_2").val()) - score) + " points short of your main goal, but you met your backup goal with " + score + " points!");
			else
				$("#step4Result").html("You got " + score + " points, " + (parseInt($("#goal2_2").val()) - score) + " short of your main goal and " + (parseInt($("#goal2_1").val()) - score) + " short of your backup goal.");
			break;
	}
	// $("#step4Result").html(score);
	$("#step4ResultPopup").popup("open");
	recordEndTime(score, level);
	endSession();

}

//-----------------------------------
//*** Event in page Step 5 **********
//-----------------------------------
// $(document).on("pagecreate", "#step5", function(event) {
	
// 	$("#step5 label[for^='radioIPip']").each(function(index) {
// 	    switch(index % 6) {
// 			case 0:
//                 $(this).attr("title", "1=Very Inaccurate");
// 				break;
// 			case 1:
// 			    $(this).attr("title", "2=Moderately Inaccurate");
// 				break;
// 			case 2:
// 			    $(this).attr("title", "3=Neither Inaccurate nor Accurate");
// 				break;
// 			case 3:
// 			    $(this).attr("title", "4=Moderately Accurate");
// 				break;
// 			case 4:
// 			    $(this).attr("title", "5=Very Accurate");
// 				break;
// 			case 5:
// 				break;	
// 		}
//     });
	
// 	$("#step5").tooltip();
// });

// $(document).on("pageshow", "#step5", function(event) {
// 	$("#step5Form").validate({
// 		rules:{
//     		age: {
//       			required: true,
//      			number: true
//     		},
//     	},
//         errorPlacement: function(error, element) {
//             if (element.attr("name") === "age") {
// 				error.insertAfter($(element).parent());
// 			}
// 			else {
// 				error.insertAfter(element);
// 			}
//         },
//         submitHandler: function(form) {
            
//             //Submit data
//             //== age ==
//             var age = parseInt($("#age").val());

//             //== gender ==
//             var genderValue = $('input[name=radioGender]:radio:checked').val();
//             var gender = -1;
//             if(genderValue == "male"){
//                 gender = 0;
//             }else if (genderValue == "female"){
//                 gender = 1;
//             }else{
//                 gender = 2;
//             }

//             //== Mini IPIP ==
//             var scoreE = parseInt($('input[name=radioIPip1]:radio:checked').val()) + 
//                         (6-parseInt($('input[name=radioIPip6]:radio:checked').val())) + 
//                         parseInt($('input[name=radioIPip11]:radio:checked').val()) + 
//                         (6 - parseInt($('input[name=radioIPip16]:radio:checked').val()));
//             var scoreA = parseInt($('input[name=radioIPip2]:radio:checked').val()) + 
//                         (6-parseInt($('input[name=radioIPip7]:radio:checked').val())) + 
//                         parseInt($('input[name=radioIPip12]:radio:checked').val()) + 
//                         (6 - parseInt($('input[name=radioIPip17]:radio:checked').val()));
//             var scoreC = parseInt($('input[name=radioIPip3]:radio:checked').val()) + 
//                         (6-parseInt($('input[name=radioIPip8]:radio:checked').val())) + 
//                         parseInt($('input[name=radioIPip13]:radio:checked').val()) + 
//                         (6 - parseInt($('input[name=radioIPip18]:radio:checked').val()));
//             var scoreN = parseInt($('input[name=radioIPip4]:radio:checked').val()) + 
//                         (6-parseInt($('input[name=radioIPip9]:radio:checked').val())) + 
//                         parseInt($('input[name=radioIPip14]:radio:checked').val()) + 
//                         (6 - parseInt($('input[name=radioIPip19]:radio:checked').val()));
//             var scoreI = parseInt($('input[name=radioIPip5]:radio:checked').val()) + 
//                         (6-parseInt($('input[name=radioIPip10]:radio:checked').val())) + 
//                         parseInt($('input[name=radioIPip15]:radio:checked').val()) + 
//                         (6 - parseInt($('input[name=radioIPip20]:radio:checked').val()));

//             // alert("age:" + age + ":::gender:" + gender + ":::scoreE:" + scoreE + ":::scoreA:" + ":::socreC:" + scoreC + ":::scoreN:" + scoreN + ":::scoreI:" + scoreI)

//             submitSurvey(age, gender, scoreE, scoreA, scoreC, scoreN, scoreI);
            
//             $.mobile.changePage("#step6");
            
//             return false;
//         }
//     });
// });

//-----------------------------------
//*** Event in page Step 6 **********
//-----------------------------------
// $(document).on("pagecreate", "#step6", function(event) {
	
// });

// $(document).on("pageshow", "#step6", function(event) {
// 	$("#step6Form").validate({
//         errorPlacement: function(error, element) {
//             if (element.attr("name") === "email") {
// 				error.insertAfter($(element).parent());
// 			}
// 			else {
// 				error.insertAfter(element);
// 			}
//         },
//         submitHandler: function(form) {
//             enterRaffle($("#email").val());
//             $("#step6ExitPopup").popup("open");
//             return false;
//         }
//     });
// });

//-----------------------------------
//*** Event in all pages **********
//-----------------------------------

$(window).on("beforeunload", function (e) {
	endSession();

  // var confirmationMessage = "";

  // (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
  // return confirmationMessage;                                //Webkit, Safari, Chrome etc.
});

$(document).keydown(function(e) {
	var element = e.target.nodeName.toLowerCase();
	if (element != 'input' && element != 'textarea') {
	    if (e.keyCode === 8) {
	        return false;
	    }
	}
});


