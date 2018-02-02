// Things to do:
// Starting the game is based on user's cick of "Start Game" --> has to do w/ the utils function in the game (I haven't been successful in returning the utils function itself)
// The game ends when the user misses a move --> not sure how this is possible because the game is based on user clicks, not node movement (this component is in the setUpEvents function of the game)
// The green node is removed when the game ends (it still remains at game over which allows the user to gain an additional point)
// Still need "next" buttons that won't be clickable until the game ends --> haven't been constructed yet
/*
document.observe("dom:loaded", function() {
	//$("startbutton").onclick = whacAMole.init;
	// $("startbutton").onclick = startGame;
	$("quitbutton").onclick = quitGame;
	initGame();
});
*/
//Whac-a-mole game

var CONGRATULATIONS = 'Well done you are The Whac a Mole champion!',
    HEIGHT = 4,
    WIDTH = 4,
    LEVELUP = 100,
    initialize,
    levelHolder,
    level,
    li,
    liElements = [],
    prevMole,
    prepGame,
    prepStage,
    renderMole,
    renderStage,
    setUpEvents,
    scoreHolder,
    score,
    stage,
    span,
    speed = 1100,
    startMole,
    timer,
    step,
    utils = {
        id: function (id) {
            return document.getElementById(id);
        },
        getNodeAsInt: function (parent) {
            // alert(parent);
            return parent.firstChild.nodeValue - 0;
        },
        setFirstChildValue: function (parentElem, value) {
            parentElem.firstChild.nodeValue = value;
        },
        setTimer: function (func, ms) {
            return setInterval(func, ms);
        }
    };

initGame = function (id) {
    liElements = [];
	step = id;
    speed = 1100;
    prepStage(id);
    renderStage();
    prepGame(id);
    setUpEvents();
    // startGame();
};
prepStage = function (id) {
    span = document.createElement('span');
    li = document.createElement('li');
	li.id = "stage";
    // stage = document.getElementsByTagName('ul')[1];
    stage = document.getElementById(id+"Game");
    // $("#"+id+"Game").unbind("click", false);

};

renderStage = function () {
    for (var i = 0; i < (HEIGHT * WIDTH); i++) {
        var cloneLi = li.cloneNode(false),
            cloneSpan = span.cloneNode(false);

        cloneLi.appendChild(cloneSpan);
        stage.appendChild(cloneLi);
        liElements.push(cloneLi);
    }
};

prepGame = function (id) {
    levelHolder = utils.id(id+'Level');
    level = utils.getNodeAsInt(levelHolder);
    // alert("prepGame:" + level);
    scoreHolder = utils.id(id+'Score');
    score = utils.getNodeAsInt(scoreHolder);
};

var flag = 0;//no-click
setUpEvents = function () {
    stage.addEventListener('click', function(e) {
        if (e.target && 'span' === e.target.nodeName.toLowerCase()) {
            // alert(e.target.parentNode.className);
            if ('mole' === e.target.parentNode.className ) {//if click on the right one
                score += 1;
                utils.setFirstChildValue(scoreHolder, score);
                e.target.parentNode.className = '';
                flag = 1;//clicked

                if (0 === score%10) {
                    if (1000 === score) {
                        scoreHolder.parentNode.innerHTML = CONGRATULATIONS;
                    } else {
                        $("#step3Levelup").html("*** LEVEL UP ***");
                        $("#step4Levelup").html("*** LEVEL UP ***");
                        flag = 1;
                        speed -= LEVELUP;
                        clearInterval(timer);
                        timer = utils.setTimer(renderMole, speed);
                        level++;
                        utils.setFirstChildValue(levelHolder, level);
                    }
                }else if(1 === score%10){
                    $("#step3Levelup").html("");
                    $("#step4Levelup").html("");
                }
            } else {//if cilck on the wrong one
				//score == 0;
                flag = 1;
				clearInterval(timer);
                if (undefined !== prevMole)
                    prevMole.className = '';
				// alert("Game over!");
				levelHolder.parentNode.innerHTML = "Game Over";
                // alert("clickwrong:");

                if(step == "step3") showStep3Result(score, level);
                if(step == "step4") showStep4Result(score, level);


                // saveEndTime();
			}
        }
    }, false);
};


renderMole = function (id) {
    if (flag != 1){//if no click before next render, game over
        clearInterval(timer);
        if (undefined !== prevMole)
            prevMole.className = '';
        //alert("Game over!\nCongratulations, you got " + score + " points!");
        levelHolder.parentNode.innerHTML = "Game Over";
        flag = 1;//set it as clicked when finished

        //saveEndTime();
        // alert("noclick:");

        if(step == "step3") showStep3Result(score, level);
        if(step == "step4") showStep4Result(score, level);
    }else{
        if (undefined !== prevMole)
		  prevMole.className = '';
		prevMole = liElements[Math.floor((Math.random()*(HEIGHT * WIDTH))+1)-1];
		prevMole.className = 'mole';
        flag = 0;// reset it as unclicked
    }
};

function saveEndTime(){
    endGame();
}



