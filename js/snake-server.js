	//Canvas stuff
var canvas;
var ctx;
var w;
var h;

//Lets save the cell width in a variable for easy control
var cw = 10;
var d;
var food;
var score;
var growthSpurt = 0;
var apples = 1;
var apples_left = apples;
var levelTimer = 0;

var levels = [];
var currentLevel = 0;

//level arrays
var level1 = [];
var level2 = [];
var level3 = [];
var level4 = [];
var level5 = []; 
var level6 = []; 
var level7 = []; 
var level8 = []; 

var step;

//Lets create the snake now
var snake_array; //an array of cells to make up the snake

function initGame(id){
	canvas = $("#" + id + "Game")[0];
	ctx = canvas.getContext("2d");
	w = $("#" + id + "Game").width();
	h = $("#" + id + "Game").height();
	step = id;
	levels = [];
}

function create_level(level)
{
    if (level >= 0 && level < levels.length) {
		    d = "up"; //default direction, reset at the start of each level
        currentLevel = level;
        create_snake();
        create_food(); //Now we can see the food particle
        create_walls(levels[level]); //create the walls for the level
        apples_left = apples;
        levelTimer = 0;
        open_door();
        open_exit();
        close_exit();
        return true;
    }
    return false;
}

function init_levels()
{
    level1.push(
    	//two parallel lines
    	{ x: '11', y: '11' }, 
		{ x: '11', y: '12' }, 
		{ x: '11', y: '13' }, 
		{ x: '11', y: '14' }, 
		{ x: '11', y: '15' }, 
		{ x: '11', y: '16' }, 
		{ x: '11', y: '17' }, 
		{ x: '11', y: '18' }, 
		{ x: '11', y: '19' }, 
		{ x: '11', y: '20' }, 
		{ x: '11', y: '21' }, 
		{ x: '11', y: '22' }, 
		{ x: '11', y: '23' }, 
		{ x: '11', y: '24' }, 
		{ x: '11', y: '25' }, 
		{ x: '11', y: '26' }, 
		{ x: '11', y: '27' }, 
		{ x: '11', y: '28' }, 
		{ x: '11', y: '29' }, 
		{ x: '11', y: '30' }, 
		{ x: '11', y: '31' }, 
		{ x: '11', y: '32' }, 
		{ x: '11', y: '33' }, 

		{ x: '33', y: '11' }, 
		{ x: '33', y: '12' }, 
		{ x: '33', y: '13' }, 
		{ x: '33', y: '14' }, 
		{ x: '33', y: '15' }, 
		{ x: '33', y: '16' }, 
		{ x: '33', y: '17' }, 
		{ x: '33', y: '18' }, 
		{ x: '33', y: '19' }, 
		{ x: '33', y: '20' }, 
		{ x: '33', y: '21' }, 
		{ x: '33', y: '22' }, 
		{ x: '33', y: '23' }, 
		{ x: '33', y: '24' }, 
		{ x: '33', y: '25' }, 
		{ x: '33', y: '26' }, 
		{ x: '33', y: '27' }, 
		{ x: '33', y: '28' }, 
		{ x: '33', y: '29' }, 
		{ x: '33', y: '30' }, 
		{ x: '33', y: '31' }, 
		{ x: '33', y: '32' }, 
		{ x: '33', y: '33' }

	);
    level2.push(
   		//t-pattern
    	//top of t
		{ x: '22', y: '11' }, 
		{ x: '22', y: '12' }, 
		{ x: '22', y: '13' }, 
		{ x: '22', y: '14' }, 
		{ x: '22', y: '15' }, 
		{ x: '22', y: '16' }, 
		{ x: '22', y: '17' }, 
		{ x: '22', y: '18' }, 
		{ x: '22', y: '19' }, 
		{ x: '22', y: '20' }, 
		{ x: '22', y: '21' }, 
		{ x: '22', y: '22' }, 
		{ x: '22', y: '23' }, 
		{ x: '22', y: '24' }, 
		{ x: '22', y: '25' }, 
		{ x: '22', y: '26' }, 
		{ x: '22', y: '27' }, 
		{ x: '22', y: '28' }, 
		{ x: '22', y: '29' }, 
		{ x: '22', y: '30' }, 
		{ x: '22', y: '31' }, 
		{ x: '22', y: '32' }, 
		{ x: '22', y: '33' }, 
		//bottom of t
		{ x: '9', y: '10' }, 
		{ x: '10', y: '10' }, 
		{ x: '11', y: '10' }, 
		{ x: '12', y: '10' }, 
		{ x: '13', y: '10' }, 
		{ x: '14', y: '10' }, 
		{ x: '15', y: '10' }, 
		{ x: '16', y: '10' }, 
		{ x: '17', y: '10' }, 
		{ x: '18', y: '10' }, 
		{ x: '19', y: '10' }, 
		{ x: '20', y: '10' }, 
		{ x: '21', y: '10' }, 
		{ x: '22', y: '10' }, 
		{ x: '23', y: '10' }, 
		{ x: '24', y: '10' }, 
		{ x: '25', y: '10' }, 
		{ x: '26', y: '10' }, 
		{ x: '27', y: '10' }, 
		{ x: '28', y: '10' }, 
		{ x: '29', y: '10' }, 
		{ x: '30', y: '10' }, 
		{ x: '31', y: '10' }, 
		{ x: '32', y: '10' }, 
		{ x: '33', y: '10' }, 
		{ x: '34', y: '10' }
    );

	level3.push(
		// 3 lines
		{ x: '11', y: '20' }, 
		{ x: '11', y: '21' }, 
		{ x: '11', y: '22' }, 
		{ x: '11', y: '23' }, 
		{ x: '11', y: '24' }, 
		{ x: '11', y: '25' }, 
		{ x: '11', y: '26' }, 
		{ x: '11', y: '27' }, 
		{ x: '11', y: '28' }, 
		{ x: '11', y: '29' }, 
		{ x: '11', y: '30' }, 
		{ x: '11', y: '31' }, 
		{ x: '11', y: '32' }, 
		{ x: '11', y: '33' }, 
		{ x: '11', y: '34' }, 
		{ x: '11', y: '35' }, 
		{ x: '11', y: '36' }, 
		{ x: '11', y: '37' }, 
		{ x: '11', y: '38' }, 
		{ x: '11', y: '39' }, 
		{ x: '11', y: '40' }, 
		{ x: '11', y: '41' }, 
		{ x: '11', y: '42' }, 

		{ x: '33', y: '20' }, 
		{ x: '33', y: '21' }, 
		{ x: '33', y: '22' }, 
		{ x: '33', y: '23' }, 
		{ x: '33', y: '24' }, 
		{ x: '33', y: '25' }, 
		{ x: '33', y: '26' }, 
		{ x: '33', y: '27' }, 
		{ x: '33', y: '28' }, 
		{ x: '33', y: '29' }, 
		{ x: '33', y: '30' }, 
		{ x: '33', y: '31' }, 
		{ x: '33', y: '32' }, 
		{ x: '33', y: '33' }, 
		{ x: '33', y: '34' }, 
		{ x: '33', y: '35' }, 
		{ x: '33', y: '36' }, 
		{ x: '33', y: '37' }, 
		{ x: '33', y: '38' }, 
		{ x: '33', y: '39' }, 
		{ x: '33', y: '40' }, 
		{ x: '33', y: '41' }, 
		{ x: '33', y: '42' }, 

		{ x: '11', y: '10' }, 
		{ x: '12', y: '10' }, 
		{ x: '13', y: '10' }, 
		{ x: '14', y: '10' }, 
		{ x: '15', y: '10' }, 
		{ x: '16', y: '10' }, 
		{ x: '17', y: '10' }, 
		{ x: '18', y: '10' }, 
		{ x: '19', y: '10' }, 
		{ x: '20', y: '10' }, 
		{ x: '21', y: '10' }, 
		{ x: '22', y: '10' }, 
		{ x: '23', y: '10' }, 
		{ x: '24', y: '10' }, 
		{ x: '25', y: '10' }, 
		{ x: '26', y: '10' }, 
		{ x: '27', y: '10' }, 
		{ x: '28', y: '10' }, 
		{ x: '29', y: '10' }, 
		{ x: '30', y: '10' }, 
		{ x: '31', y: '10' }, 
		{ x: '32', y: '10' }, 
		{ x: '33', y: '10' }
	);

	level4.push(
		//brackets
		{ x: '11', y: '11' }, 
		{ x: '11', y: '12' }, 
		{ x: '11', y: '13' }, 
		{ x: '11', y: '14' }, 
		{ x: '11', y: '15' }, 
		{ x: '11', y: '16' }, 
		{ x: '11', y: '17' }, 
		{ x: '11', y: '18' }, 
		{ x: '11', y: '19' }, 
		{ x: '11', y: '20' }, 
		{ x: '11', y: '21' }, 
		{ x: '11', y: '22' }, 
		{ x: '11', y: '23' }, 
		{ x: '11', y: '24' }, 
		{ x: '11', y: '25' }, 
		{ x: '11', y: '26' }, 
		{ x: '11', y: '27' }, 
		{ x: '11', y: '28' }, 
		{ x: '11', y: '29' }, 
		{ x: '11', y: '30' }, 
		{ x: '11', y: '31' }, 
		{ x: '11', y: '32' }, 
		{ x: '11', y: '33' }, 

		{ x: '33', y: '11' }, 
		{ x: '33', y: '12' }, 
		{ x: '33', y: '13' }, 
		{ x: '33', y: '14' }, 
		{ x: '33', y: '15' }, 
		{ x: '33', y: '16' }, 
		{ x: '33', y: '17' }, 
		{ x: '33', y: '18' }, 
		{ x: '33', y: '19' }, 
		{ x: '33', y: '20' }, 
		{ x: '33', y: '21' }, 
		{ x: '33', y: '22' }, 
		{ x: '33', y: '23' }, 
		{ x: '33', y: '24' }, 
		{ x: '33', y: '25' }, 
		{ x: '33', y: '26' }, 
		{ x: '33', y: '27' }, 
		{ x: '33', y: '28' }, 
		{ x: '33', y: '29' }, 
		{ x: '33', y: '30' }, 
		{ x: '33', y: '31' }, 
		{ x: '33', y: '32' }, 
		{ x: '33', y: '33' }, 

		{ x: '11', y: '11' }, 
		{ x: '12', y: '11' }, 
		{ x: '13', y: '11' }, 
		{ x: '14', y: '11' }, 
		{ x: '15', y: '11' }, 

		{ x: '29', y: '11' }, 
		{ x: '30', y: '11' }, 
		{ x: '31', y: '11' }, 
		{ x: '32', y: '11' }, 
		{ x: '33', y: '11' }, 

		{ x: '11', y: '33' }, 
		{ x: '12', y: '33' }, 
		{ x: '13', y: '33' }, 
		{ x: '14', y: '33' }, 
		{ x: '15', y: '33' }, 
		
		{ x: '29', y: '33' }, 
		{ x: '30', y: '33' }, 
		{ x: '31', y: '33' }, 
		{ x: '32', y: '33' }, 
		{ x: '33', y: '33' }
	);

	level5.push(
		//modified brackets with center dot
		{ x: '11', y: '11' }, 
		{ x: '11', y: '12' }, 
		{ x: '11', y: '13' }, 
		{ x: '11', y: '14' }, 
		{ x: '11', y: '15' }, 
		{ x: '11', y: '16' }, 
		{ x: '11', y: '17' }, 
		{ x: '11', y: '18' }, 
		{ x: '11', y: '19' }, 
		{ x: '11', y: '20' }, 
		{ x: '11', y: '21' }, 
		{ x: '11', y: '22' }, 
		{ x: '11', y: '23' }, 
		{ x: '11', y: '24' }, 
		{ x: '11', y: '25' }, 
		{ x: '11', y: '26' }, 
		{ x: '11', y: '27' }, 
		{ x: '11', y: '28' }, 
		{ x: '11', y: '29' }, 
		{ x: '11', y: '30' }, 
		{ x: '11', y: '31' }, 
		{ x: '11', y: '32' }, 
		{ x: '11', y: '33' }, 

		{ x: '33', y: '11' }, 
		{ x: '33', y: '12' }, 
		{ x: '33', y: '13' }, 
		{ x: '33', y: '14' }, 
		{ x: '33', y: '15' }, 
		{ x: '33', y: '16' }, 
		{ x: '33', y: '17' }, 
		{ x: '33', y: '18' }, 
		{ x: '33', y: '19' }, 
		{ x: '33', y: '20' }, 
		{ x: '33', y: '21' }, 
		{ x: '33', y: '22' }, 
		{ x: '33', y: '23' }, 
		{ x: '33', y: '24' }, 
		{ x: '33', y: '25' }, 
		{ x: '33', y: '26' }, 
		{ x: '33', y: '27' }, 
		{ x: '33', y: '28' }, 
		{ x: '33', y: '29' }, 
		{ x: '33', y: '30' }, 
		{ x: '33', y: '31' }, 
		{ x: '33', y: '32' }, 
		{ x: '33', y: '33' }, 

		{ x: '11', y: '11' }, 
		{ x: '12', y: '11' }, 
		{ x: '13', y: '11' }, 
		{ x: '14', y: '11' }, 
		{ x: '15', y: '11' }, 
		{ x: '16', y: '11' }, 
		{ x: '17', y: '11' }, 
		{ x: '18', y: '11' }, 
		{ x: '19', y: '11' }, 
		{ x: '20', y: '11' }, 
		{ x: '21', y: '11' }, 
		{ x: '22', y: '11' }, 

		{ x: '22', y: '33' }, 
		{ x: '23', y: '33' }, 
		{ x: '24', y: '33' }, 
		{ x: '25', y: '33' }, 
		{ x: '26', y: '33' }, 
		{ x: '27', y: '33' }, 
		{ x: '28', y: '33' }, 
		{ x: '29', y: '33' }, 
		{ x: '30', y: '33' }, 
		{ x: '31', y: '33' }, 
		{ x: '32', y: '33' }, 
		{ x: '33', y: '33' }, 

		{ x: '22', y: '22' }

	);

	level6.push(
		//double parallel lines
		{ x: '9', y: '11' }, 
		{ x: '9', y: '12' }, 
		{ x: '9', y: '13' }, 
		{ x: '9', y: '14' }, 
		{ x: '9', y: '15' }, 
		{ x: '9', y: '16' }, 
		{ x: '9', y: '17' }, 
		{ x: '9', y: '18' }, 
		{ x: '9', y: '19' }, 
		{ x: '9', y: '20' }, 
		{ x: '9', y: '21' }, 
		{ x: '9', y: '22' }, 
		{ x: '9', y: '23' }, 
		{ x: '9', y: '24' }, 
		{ x: '9', y: '25' }, 
		{ x: '9', y: '26' }, 
		{ x: '9', y: '27' }, 
		{ x: '9', y: '28' }, 
		{ x: '9', y: '29' }, 
		{ x: '9', y: '30' }, 
		{ x: '9', y: '31' }, 
		{ x: '9', y: '32' }, 
		{ x: '9', y: '33' }, 

		{ x: '13', y: '11' }, 
		{ x: '13', y: '12' }, 
		{ x: '13', y: '13' }, 
		{ x: '13', y: '14' }, 
		{ x: '13', y: '15' }, 
		{ x: '13', y: '16' }, 
		{ x: '13', y: '17' }, 
		{ x: '13', y: '18' }, 
		{ x: '13', y: '19' }, 
		{ x: '13', y: '20' }, 
		{ x: '13', y: '21' }, 
		{ x: '13', y: '22' }, 
		{ x: '13', y: '23' }, 
		{ x: '13', y: '24' }, 
		{ x: '13', y: '25' }, 
		{ x: '13', y: '26' }, 
		{ x: '13', y: '27' }, 
		{ x: '13', y: '28' }, 
		{ x: '13', y: '29' }, 
		{ x: '13', y: '30' }, 
		{ x: '13', y: '31' }, 
		{ x: '13', y: '32' }, 
		{ x: '13', y: '33' }, 

		{ x: '31', y: '11' }, 
		{ x: '31', y: '12' }, 
		{ x: '31', y: '13' }, 
		{ x: '31', y: '14' }, 
		{ x: '31', y: '15' }, 
		{ x: '31', y: '16' }, 
		{ x: '31', y: '17' }, 
		{ x: '31', y: '18' }, 
		{ x: '31', y: '19' }, 
		{ x: '31', y: '20' }, 
		{ x: '31', y: '21' }, 
		{ x: '31', y: '22' }, 
		{ x: '31', y: '23' }, 
		{ x: '31', y: '24' }, 
		{ x: '31', y: '25' }, 
		{ x: '31', y: '26' }, 
		{ x: '31', y: '27' }, 
		{ x: '31', y: '28' }, 
		{ x: '31', y: '29' }, 
		{ x: '31', y: '30' }, 
		{ x: '31', y: '31' }, 
		{ x: '31', y: '32' }, 
		{ x: '31', y: '33' }, 

		{ x: '35', y: '11' }, 
		{ x: '35', y: '12' }, 
		{ x: '35', y: '13' }, 
		{ x: '35', y: '14' }, 
		{ x: '35', y: '15' }, 
		{ x: '35', y: '16' }, 
		{ x: '35', y: '17' }, 
		{ x: '35', y: '18' }, 
		{ x: '35', y: '19' }, 
		{ x: '35', y: '20' }, 
		{ x: '35', y: '21' }, 
		{ x: '35', y: '22' }, 
		{ x: '35', y: '23' }, 
		{ x: '35', y: '24' }, 
		{ x: '35', y: '25' }, 
		{ x: '35', y: '26' }, 
		{ x: '35', y: '27' }, 
		{ x: '35', y: '28' }, 
		{ x: '35', y: '29' }, 
		{ x: '35', y: '30' }, 
		{ x: '35', y: '31' }, 
		{ x: '35', y: '32' }, 
		{ x: '35', y: '33' }
	);

	level7.push(
		//double t
		{ x: '9', y: '14' }, 
		{ x: '10', y: '14' }, 
		{ x: '11', y: '14' }, 
		{ x: '12', y: '14' }, 
		{ x: '13', y: '14' }, 
		{ x: '14', y: '14' }, 
		{ x: '15', y: '14' }, 
		{ x: '16', y: '14' }, 
		{ x: '17', y: '14' }, 
		{ x: '18', y: '14' }, 
		{ x: '19', y: '14' }, 
		{ x: '20', y: '14' }, 
		{ x: '24', y: '14' }, 
		{ x: '25', y: '14' }, 
		{ x: '26', y: '14' }, 
		{ x: '27', y: '14' }, 
		{ x: '28', y: '14' }, 
		{ x: '29', y: '14' }, 
		{ x: '30', y: '14' }, 
		{ x: '31', y: '14' }, 
		{ x: '32', y: '14' }, 
		{ x: '33', y: '14' }, 
		{ x: '34', y: '14' }, 

		{ x: '9', y: '10' }, 
		{ x: '10', y: '10' }, 
		{ x: '11', y: '10' }, 
		{ x: '12', y: '10' }, 
		{ x: '13', y: '10' }, 
		{ x: '14', y: '10' }, 
		{ x: '15', y: '10' }, 
		{ x: '16', y: '10' }, 
		{ x: '17', y: '10' }, 
		{ x: '18', y: '10' }, 
		{ x: '19', y: '10' }, 
		{ x: '20', y: '10' }, 
		{ x: '21', y: '10' }, 
		{ x: '22', y: '10' }, 
		{ x: '23', y: '10' }, 
		{ x: '24', y: '10' }, 
		{ x: '25', y: '10' }, 
		{ x: '26', y: '10' }, 
		{ x: '27', y: '10' }, 
		{ x: '28', y: '10' }, 
		{ x: '29', y: '10' }, 
		{ x: '30', y: '10' }, 
		{ x: '31', y: '10' }, 
		{ x: '32', y: '10' }, 
		{ x: '33', y: '10' }, 
		{ x: '34', y: '10' }, 

		{ x: '24', y: '14' }, 
		{ x: '24', y: '15' }, 
		{ x: '24', y: '16' }, 
		{ x: '24', y: '17' }, 
		{ x: '24', y: '18' }, 
		{ x: '24', y: '19' }, 
		{ x: '24', y: '20' }, 
		{ x: '24', y: '21' }, 
		{ x: '24', y: '22' }, 
		{ x: '24', y: '23' }, 
		{ x: '24', y: '24' }, 
		{ x: '24', y: '25' }, 
		{ x: '24', y: '26' }, 
		{ x: '24', y: '27' }, 
		{ x: '24', y: '28' }, 
		{ x: '24', y: '29' }, 
		{ x: '24', y: '30' }, 
		{ x: '24', y: '31' }, 
		{ x: '24', y: '32' }, 
		{ x: '24', y: '33' }, 
		{ x: '24', y: '34' }, 
		{ x: '24', y: '35' }, 
		{ x: '24', y: '36' }, 

		{ x: '20', y: '14' }, 
		{ x: '20', y: '15' }, 
		{ x: '20', y: '16' }, 
		{ x: '20', y: '17' }, 
		{ x: '20', y: '18' }, 
		{ x: '20', y: '19' }, 
		{ x: '20', y: '20' }, 
		{ x: '20', y: '21' }, 
		{ x: '20', y: '22' }, 
		{ x: '20', y: '23' }, 
		{ x: '20', y: '24' }, 
		{ x: '20', y: '25' }, 
		{ x: '20', y: '26' }, 
		{ x: '20', y: '27' }, 
		{ x: '20', y: '28' }, 
		{ x: '20', y: '29' }, 
		{ x: '20', y: '30' }, 
		{ x: '20', y: '31' }, 
		{ x: '20', y: '32' }, 
		{ x: '20', y: '33' }, 
		{ x: '20', y: '34' }, 
		{ x: '20', y: '35' }, 
		{ x: '20', y: '36' }
	);

	level8.push(
		//double 3 lines
		{ x: '11', y: '20' }, 
		{ x: '11', y: '21' }, 
		{ x: '11', y: '22' }, 
		{ x: '11', y: '23' }, 
		{ x: '11', y: '24' }, 
		{ x: '11', y: '25' }, 
		{ x: '11', y: '26' }, 
		{ x: '11', y: '27' }, 
		{ x: '11', y: '28' }, 
		{ x: '11', y: '29' }, 
		{ x: '11', y: '30' }, 
		{ x: '11', y: '31' }, 
		{ x: '11', y: '32' }, 
		{ x: '11', y: '33' }, 
		{ x: '11', y: '34' }, 
		{ x: '11', y: '35' }, 
		{ x: '11', y: '36' }, 
		{ x: '11', y: '37' }, 
		{ x: '11', y: '38' }, 
		{ x: '11', y: '39' }, 
		{ x: '11', y: '40' }, 
		{ x: '11', y: '41' }, 
		{ x: '11', y: '42' }, 

		{ x: '7', y: '20' }, 
		{ x: '7', y: '21' }, 
		{ x: '7', y: '22' }, 
		{ x: '7', y: '23' }, 
		{ x: '7', y: '24' }, 
		{ x: '7', y: '25' }, 
		{ x: '7', y: '26' }, 
		{ x: '7', y: '27' }, 
		{ x: '7', y: '28' }, 
		{ x: '7', y: '29' }, 
		{ x: '7', y: '30' }, 
		{ x: '7', y: '31' }, 
		{ x: '7', y: '32' }, 
		{ x: '7', y: '33' }, 
		{ x: '7', y: '34' }, 
		{ x: '7', y: '35' }, 
		{ x: '7', y: '36' }, 
		{ x: '7', y: '37' }, 
		{ x: '7', y: '38' }, 
		{ x: '7', y: '39' }, 
		{ x: '7', y: '40' }, 
		{ x: '7', y: '41' }, 
		{ x: '7', y: '42' }, 

		{ x: '33', y: '20' }, 
		{ x: '33', y: '21' }, 
		{ x: '33', y: '22' }, 
		{ x: '33', y: '23' }, 
		{ x: '33', y: '24' }, 
		{ x: '33', y: '25' }, 
		{ x: '33', y: '26' }, 
		{ x: '33', y: '27' }, 
		{ x: '33', y: '28' }, 
		{ x: '33', y: '29' }, 
		{ x: '33', y: '30' }, 
		{ x: '33', y: '31' }, 
		{ x: '33', y: '32' }, 
		{ x: '33', y: '33' }, 
		{ x: '33', y: '34' }, 
		{ x: '33', y: '35' }, 
		{ x: '33', y: '36' }, 
		{ x: '33', y: '37' }, 
		{ x: '33', y: '38' }, 
		{ x: '33', y: '39' }, 
		{ x: '33', y: '40' }, 
		{ x: '33', y: '41' }, 
		{ x: '33', y: '42' }, 

		{ x: '37', y: '20' }, 
		{ x: '37', y: '21' }, 
		{ x: '37', y: '22' }, 
		{ x: '37', y: '23' }, 
		{ x: '37', y: '24' }, 
		{ x: '37', y: '25' }, 
		{ x: '37', y: '26' }, 
		{ x: '37', y: '27' }, 
		{ x: '37', y: '28' }, 
		{ x: '37', y: '29' }, 
		{ x: '37', y: '30' }, 
		{ x: '37', y: '31' }, 
		{ x: '37', y: '32' }, 
		{ x: '37', y: '33' }, 
		{ x: '37', y: '34' }, 
		{ x: '37', y: '35' }, 
		{ x: '37', y: '36' }, 
		{ x: '37', y: '37' }, 
		{ x: '37', y: '38' }, 
		{ x: '37', y: '39' }, 
		{ x: '37', y: '40' }, 
		{ x: '37', y: '41' }, 
		{ x: '37', y: '42' }, 

		{ x: '7', y: '10' }, 
		{ x: '8', y: '10' }, 
		{ x: '9', y: '10' }, 
		{ x: '10', y: '10' }, 
		{ x: '11', y: '10' }, 
		{ x: '12', y: '10' }, 
		{ x: '13', y: '10' }, 
		{ x: '14', y: '10' }, 
		{ x: '15', y: '10' }, 
		{ x: '16', y: '10' }, 
		{ x: '17', y: '10' }, 
		{ x: '18', y: '10' }, 
		{ x: '19', y: '10' }, 
		{ x: '20', y: '10' }, 
		{ x: '21', y: '10' }, 
		{ x: '22', y: '10' }, 
		{ x: '23', y: '10' }, 
		{ x: '24', y: '10' }, 
		{ x: '25', y: '10' }, 
		{ x: '26', y: '10' }, 
		{ x: '27', y: '10' }, 
		{ x: '28', y: '10' }, 
		{ x: '29', y: '10' }, 
		{ x: '30', y: '10' }, 
		{ x: '31', y: '10' }, 
		{ x: '32', y: '10' }, 
		{ x: '33', y: '10' }, 
		{ x: '34', y: '10' }, 
		{ x: '35', y: '10' }, 
		{ x: '36', y: '10' }, 
		{ x: '37', y: '10' }, 

		{ x: '7', y: '6' }, 
		{ x: '8', y: '6' }, 
		{ x: '9', y: '6' }, 
		{ x: '10', y: '6' }, 
		{ x: '11', y: '6' }, 
		{ x: '12', y: '6' }, 
		{ x: '13', y: '6' }, 
		{ x: '14', y: '6' }, 
		{ x: '15', y: '6' }, 
		{ x: '16', y: '6' }, 
		{ x: '17', y: '6' }, 
		{ x: '18', y: '6' }, 
		{ x: '19', y: '6' }, 
		{ x: '20', y: '6' }, 
		{ x: '21', y: '6' }, 
		{ x: '22', y: '6' }, 
		{ x: '23', y: '6' }, 
		{ x: '24', y: '6' }, 
		{ x: '25', y: '6' }, 
		{ x: '26', y: '6' }, 
		{ x: '27', y: '6' }, 
		{ x: '28', y: '6' }, 
		{ x: '29', y: '6' }, 
		{ x: '30', y: '6' }, 
		{ x: '31', y: '6' }, 
		{ x: '32', y: '6' }, 
		{ x: '33', y: '6' }, 
		{ x: '34', y: '6' }, 
		{ x: '35', y: '6' }, 
		{ x: '36', y: '6' }, 
		{ x: '37', y: '6' }
	);


    levels.push(level1);
    levels.push(level2);
    levels.push(level3);
    levels.push(level4);
	levels.push(level5);
	levels.push(level6);
	levels.push(level7);
	levels.push(level8);

    //draw a border around the entire level
    for (var level = 0; level < levels.length; level++) {
        for (var i = 0; i < w / cw; i++) {
            //adds a door at the top and bottom
            if (i != (w / cw) / 2) {
                levels[level].push({ x: i, y: 0 });
                levels[level].push({ x: i, y: h / cw - 1 });
            }
        }
        for (var j = 0; j < h / cw; j++) {
            levels[level].push({ x: 0, y: j });
            levels[level].push({ x: w/cw - 1, y: j });
        }
    }
}

function close_exit() {
    levels[currentLevel].push({ x: (w / cw) / 2, y: 0 });
}

function close_door()
{
    levels[currentLevel].push({ x: (w / cw) / 2, y: h / cw - 1 });
}

function open_door() {
    for (var i = 0; i < levels[currentLevel].length; i++) {
        if (levels[currentLevel][i].x == (w / cw) / 2 &&
            levels[currentLevel][i].y == h / cw - 1)
        {
            levels[currentLevel].splice(i, 1);
            break;
        }
    }
}

function open_exit() {
    for (var i = 0; i < levels[currentLevel].length; i++) {
        if (levels[currentLevel][i].x == (w / cw) / 2 &&
            levels[currentLevel][i].y == 0) {
            levels[currentLevel].splice(i, 1);
            break;
        }
    }
}

function open_level_exit() {
	// alert("open!");
	
	var gapCount = 3;
	var gapIndex = 0;
	var gap = [];
	
    for (var i = 0; i < levels[currentLevel].length; i++) {
        if (levels[currentLevel][i].x > (w / cw) / 2 - gapCount &&
            levels[currentLevel][i].x <= (w / cw) / 2 &&
            levels[currentLevel][i].y == 0) {
            
            gap[gapIndex] = i;
            gapIndex++;
            
            //levels[currentLevel].splice(i, 1);
            if(gapIndex == gapCount) break;
        }
    }
    
    for (var i = gap.length; i > 0; i--) {
        levels[currentLevel].splice(gap[i-1], 1);
    }
    
}



function playGame()
{
	init_levels();

    score = 0;

    create_level(0);

    //Lets move the snake now using a timer which will trigger the paint function
    //every 60ms
    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 100);
}

function create_snake()
{
	var length = 5; //Length of the snake
	snake_array = []; //Empty array to start with
	for(var i = length-1; i>=0; i--)
	{
		//This will create a horizontal snake starting from the top left
		snake_array.push({x: (w/cw)/2, y: (h/cw)-1+length-i});
	}
}

//Lets create the food now
function create_food()
{
    apples_left = apples;
	food = [];
	for (var i = 0; i < apples; i++) {
	    var appleX = Math.round(Math.random()*(w-cw)/cw); 
	    var appleY = Math.round(Math.random()*(h-cw)/cw);
	    var apple = { x: appleX, y: appleY };

	    var foundApple = false;
	    for (var wall = 0; wall < levels[currentLevel].length; wall++)
	    {
	        if (levels[currentLevel][wall].x == appleX &&
                levels[currentLevel][wall].y == appleY)
	        {
	            foundApple = true;
	            break;
	        }
	    }
	    if (foundApple) {
	        i--;
	        continue;
	    }
	    food.push(apple);
		//This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns	
	}
}

//create the walls
function create_walls(level)
{
	for(var i = level.length - 1; i >= 0; i--)
	{
		var wa = level[i];
		paint_cell(wa.x, wa.y, "blue");
	}
}

//Lets paint the snake now
function paint()
{
    if (levelTimer >= 0) levelTimer++;
	//To avoid the snake trail we need to paint the BG on every frame
	//Lets paint the canvas now
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	create_walls(levels[currentLevel]);


	//The movement code for the snake to come here.
	//The logic is simple
	//Pop out the tail cell and place it infront of the head cell
	var nx = snake_array[0].x;
	var ny = snake_array[0].y;
	//These were the position of the head cell.
	//We will increment it to get the new head position
	//Lets add proper direction based movement now
	if(d == "right") nx++;
	else if(d == "left") nx--;
	else if(d == "up") ny--;
	else if(d == "down") ny++;
	
	//Lets add the game over clauses now
	//This will restart the game if the snake hits the wall
	//Lets add the code for body collision
	//Now if the head of the snake bumps into its body, the game will restart
	if(check_collision(nx, ny, snake_array)
		|| check_collision(nx, ny, levels[currentLevel]))
	{
	    //restart game
        //any other game over conditions could go here, instead of simply restarting.
		if(step == "step3") showStep3Result(score, currentLevel+1);
        if(step == "step4") showStep4Result(score, currentLevel+1);
        clearInterval(game_loop);
		//Lets organize the code a bit now.
		return;
	}

	if (levelTimer > snake_array.length)
	{
	    levelTimer = -1;
	    close_door();
	}


	if (apples_left == 0)
	{
	    apples_left--;
	    open_level_exit();
	}

	if (ny < -snake_array.length /* level win condition*/)
	{
	    currentLevel ++;
	    if(currentLevel == 1){
	    	clearInterval(game_loop);
	   		game_loop = setInterval(paint, 80);

	    }
	    if(currentLevel >= 8){
	    	if(step == "step3") showStep3Result(score, currentLevel);
        	if(step == "step4") showStep4Result(score, currentLevel);
        	clearInterval(game_loop);
        	return;
	    }
	    create_level(currentLevel);
	    return;
	}

	//Lets write the code to make the snake eat the food
	//The logic is simple
	//If the new head position matches with that of the food,
	//Create a new head instead of moving the tail
	var tail;
	var fAteFood = false;
	for(var i = food.length - 1; i >= 0; i--)
	{
		var f = food[i];
		if(nx == f.x && ny == f.y)
		{
			score++;
			food.splice(i, 1);
			fAteFood = true;
			growthSpurt += 2;
			apples_left--;
		}
		else
		{
			//Lets paint the food
			paint_cell(f.x, f.y, "red");
		}			
	}
	if (!fAteFood && growthSpurt == 0)
	{
		tail = snake_array.pop(); //pops out the last cell
		tail.x = nx; tail.y = ny;
	}
	else
	{
	    var tail = { x: nx, y: ny };
	}

	if (growthSpurt > 0) growthSpurt--;

	//The snake can now eat the food.
	
	snake_array.unshift(tail); //puts back the tail as the first cell
	
	for(var i = 0; i < snake_array.length; i++)
	{
		var c = snake_array[i];
		//Lets paint 10px wide cells
		paint_cell(c.x, c.y, "yellow");
	}
	
	//Lets paint the score
	// var score_text = "Score: " + score;
	// ctx.fillText(score_text, 5, h-5);
	if(step == "step3") updateStep3Score(score, currentLevel+1);
	if(step == "step4") updateStep4Score(score, currentLevel+1);

}

//Lets first create a generic function to paint cells
function paint_cell(x, y, color)
{
	ctx.fillStyle = color;
	ctx.fillRect(x*cw, y*cw, cw, cw);
	ctx.strokeStyle = "black";
	ctx.strokeRect(x*cw, y*cw, cw, cw);
}

function check_collision(x, y, array)
{
	//This function will check if the provided x/y coordinates exist
	//in an array of cells or not
	for(var i = 0; i < array.length; i++)
	{
		if(array[i].x == x && array[i].y == y)
		 return true;
	}
	return false;
}

//Lets add the keyboard controls now
$(document).keydown(function (e) {
    if (snake_array[0].y > 0 &&
        snake_array[0].y < h / cw - 1) {
        var key = e.which;
        //We will add another clause to prevent reverse gear
        if (key == "37" && d != "right") d = "left";
        else if (key == "38" && d != "down") d = "up";
        else if (key == "39" && d != "left") d = "right";
        else if (key == "40" && d != "up") d = "down";
        //The snake is now keyboard controllable
    }
})