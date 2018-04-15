$( document ).ready(function() {

	muted = true;
	if (page == 'menu') {
		var storage_resetted = localStorage.getItem("lightsOutReset");
		if (storage_resetted != 'true') {
			 resetLocalStorage();
		}
		initWinStats();
	}
  if (page == 'game') {
		initLightsSwitch();
		randomPlay();
		saveInitialStates();
		initializeCellsArray();
		game_start = new Date().getTime();
		muted = false;
  }
});

var sound = new Audio("sounds/lights_tick.mp3");
var muted = true;
var init_states = new Array();
var curr_states = new Array();
var curr_vector = new Array();
var game_moves = 0;
var game_date = '';
var game_won = false;
var game_start = 0;
var hints_used = 'no';
var game_difficulty;
var storage_resetted;

var cells;

/* remove lightsOutWinStats from localStorage */
function resetLocalStorage() {

	localStorage.removeItem('lightsOutWinStats');
	localStorage.setItem("lightsOutReset", true);
}

/* the difficulty level the player chose to play */
function chooseLevel(difficulty) {
	localStorage.setItem("lightsOutDifficulty", difficulty);
}

/* initialize "lightsOutWinStats" in local storage */
function initWinStats() {

	var wins = JSON.parse(localStorage.getItem("lightsOutWinStats"));
	if (wins == undefined) {
		var wins = [];
		localStorage.setItem("lightsOutWinStats", JSON.stringify(wins));
	}

}

/* reset board styles after winning */
function resetStylesAfterWin() {

	$('#grid').removeClass('disabled-grid').addClass('enabled-grid');
}

/* reset moves count to 0 */
function resetMoves() {

	game_moves = 0;
	updateMoves();
}

/* remove hints from squares */
function removeHints() {

	$( ".marked" ).removeClass('marked');
}

/* if the clicked square is not a hint, clear all hints */
function clearHints(square) {

	if (!$(square).hasClass('marked')) {
		removeHints();
	}
}

/* set hints variable to 'yes' if the hint or solution icon was clicked */
$('#hint, #solution').on("click", function(){

	hints_used = 'yes';
});

/* on a square click update moves, hint/solution status, clear hints, and check if won */
$( ".square" ).each(function() {

	$(this).on("click", function(){
		game_moves++;

		if (game_moves >= 10) {
			if ($('#hint').hasClass('disabled')) {
				$('#hint').removeClass('disabled');
				$('#hint').addClass('pulse-count');
				setTimeout(function(){ $('#hint').removeClass('pulse-count'); }, 500);
			}
		}
		if (game_moves >= 15) {
			if ($('#solution').hasClass('disabled')) {
				$('#solution').removeClass('disabled');
				$('#solution').addClass('pulse-count');
				setTimeout(function(){ $('#solution').removeClass('pulse-count'); }, 500);
			}
		}

		updateMoves();
		clearHints(this);
		hasWon();
	});
});

/* update the moves count and play animation */
function updateMoves() {

	$('#movesCount').html(game_moves);
	$('#movesCount').addClass('pulse-count');
	setTimeout(function(){ $('#movesCount').removeClass('pulse-count'); }, 500);
	if( game_moves > 0 ) {
		$('#reset-grid').removeClass('disabled');
	}
}

/* set the onmousedown and on touch event on squares for switching lights */
function initLightsSwitch() {
	$(".square").each(function(index, value){
		var square_id = $(this).attr('id');
		var rowcolsplit = square_id.split(/(\d)/);
		var row = parseInt(rowcolsplit[1]);
		var col = parseInt(rowcolsplit[3]);
		$(this).on('mousedown', function () {
			switchLights(row, col);
		});
	});
}

/* prepare a solvable board for the player */
function randomPlay() {

	game_difficulty = localStorage.getItem("lightsOutDifficulty");
	var clicks_array = [];
	if (game_difficulty == 'easy') {
		clicks_array = [1,2];
	} else if (game_difficulty == 'med') {
		clicks_array = [3,4];
	} else {
		clicks_array = [5,6,7,8,9,10];
	}

	var clicks = clicks_array[Math.floor(Math.random()*clicks_array.length)]; //parseInt(Math.random()*clickNumber) + 1;
  for (i=0; i<clicks; i++) {
		var total = 25;
		var img_num = Math.floor(Math.random()*total);
		var square = $("td[data-windowID='" + img_num +"']");
		$(square[0]).mousedown();
  }
	game_moves = 0;
	hints_used = 'no';

  if ($('.on').size() == 0) {
		console.log('were all off');
		resetStylesAfterWin();
		resetMoves();
	  randomPlay();
  }
}

/* initialize cells array [x][y] */
function initializeCellsArray() {

		var col;
		var row;
		cells = new Array();

		for (col = 0; col < 5; col++)
		{
				cells[col] = new Array();
				for (row = 0; row < 5; row++)
						cells[col][row] = 0;
		}

		$(init_states).each(function(index, value){
			cells[index%5][Math.floor(index/5)] = value;
		});
}

/* save initial states  init_states = [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0]; */
function saveInitialStates() {

	init_states = [];
	$("#grid tr td").each(function(index, value){
		if ($(this).attr('alt') == 'on') {
			init_states[$(this).data('windowid')] = 1;
		}
		else {
			init_states[$(this).data('windowid')] = 0;
		}
	});
}

/* initialize current states of curr_vector[x][y] */
function initializeCurrStates() {

	var col;
	var row;

	for (col = 0; col < 5; col++) {
		curr_vector[col] = new Array();
		for (row = 0; row < 5; row++)
			curr_vector[col][row] = 0;
		}
}

/* update curr_states and curr_vector */
function updateCurrentStates() {

	$("#grid tr td").each(function(index, value){
		if ($(this).attr('alt') == 'on') {
			curr_states[$(this).data('windowid')] = 1;
		}
		else {
			curr_states[$(this).data('windowid')] = 0;
		}
	});

	$(curr_states).each(function(index, value){
		curr_vector[Math.floor(index/5)][index%5] = value;
	});
}

/* show a hint to the solution */
function showHint() {

	removeHints();
	initializeCurrStates();
	updateCurrentStates();

	var minSol = getAllSolutions(curr_vector)
        .map(function (v) { return { curr_vector: v, total: totalOnes(v) }; })
        .reduce(function (prev, curr) { return prev.total < curr.total ? prev : curr });

    for (var y = 0; y < N; y++) {
        for (var x = 0; x < N; x++) {
            if (minSol.curr_vector[y][x] === 1) {
                markHint(x, y);
								return;
            }
        }
    }
}

/* show a solution to the grid */
function displaySolution() {

	removeHints();
	initializeCurrStates();
	updateCurrentStates();

	var minSol = getAllSolutions(curr_vector)
        .map(function (v) { return { curr_vector: v, total: totalOnes(v) }; })
        .reduce(function (prev, curr) { return prev.total < curr.total ? prev : curr });

    for (var y = 0; y < N; y++) {
        for (var x = 0; x < N; x++) {
            if (minSol.curr_vector[y][x] === 1) {
                markHint(x, y);
            }
        }
    }
}

/* prepare new table */
function newTable () {

	//hideNewTableIcon();
	$('#hint').addClass('disabled');
	$('#solution').addClass('disabled');
	$('#reset-grid').addClass('disabled');
	removeHints();
	game_won = false;
	resetStylesAfterWin();
	allLightsOff();
	randomPlay();
	saveInitialStates();
	resetMoves();
	game_start = new Date().getTime();
	DeactivateConfetti();
}

/* reset the grid to initial square states */
function resetGrid() {

	$('#reset-grid').addClass('disabled');

	removeHints();
	game_moves = 0;
	$('#hint').addClass('disabled');
	$('#solution').addClass('disabled');
	updateMoves();
	if (!game_won) {
		$(init_states).each(function(index1, value1){
			if (value1 == 0) {
				$("td[data-windowID='" + index1 +"']").removeClass('on').addClass('off');
				$("td[data-windowID='" + index1 +"']").attr('alt', 'off');
			}
			else {
				$("td[data-windowID='" + index1 +"']").removeClass('off').addClass('on');
				$("td[data-windowID='" + index1 +"']").attr('alt', 'on');
			}
		});
		resetStylesAfterWin();
	}
}

/* turn all lights off */
function allLightsOff() {

	$('#grid tr td').removeClass('on').addClass('off');
	$('#grid tr td').attr('alt', 'off');
}

/* switch light of given square */
function switchLight(row_i, col_i) {

  var square = $('#row' + row_i + 'col' + col_i);
  var state = $(square).attr('alt');
  if (state == 'off') {
		$(square).removeClass('off');
		$(square).addClass('on');
		$(square).attr('alt', 'on');
  }
  else {
		$(square).removeClass('on');
		$(square).addClass('off');
		$(square).attr('alt', 'off');
		if ($(square).size() > 0) {
		}
  }
}

/* switch all affected lights on square click */
function switchLights(row_i, col_i) {

	playsound();
  if ($('#row' + row_i + 'col' + col_i)) { // itself
      switchLight(row_i, col_i);
  }
  if ($('#row' + (row_i - 1) + 'col' + col_i)) { // up
      switchLight(row_i - 1, col_i);
  }
  if ($('#row' + row_i + 'col' + (col_i + 1))) { // right
      switchLight(row_i, col_i + 1);
  }
  if ($('#row' + row_i + 'col' + (col_i - 1))) { // left
      switchLight(row_i, col_i - 1);
  }
  if ($('#row' + (row_i + 1) + 'col' + col_i)) { //down
      switchLight(row_i + 1, col_i);
  }
}

/* when the player has won make some style updates and save score */
function hasWon() {

	if ($('.on').size() > 0) {
		return;
	}

	$('#hint').addClass('disabled');
	$('#solution').addClass('disabled');
  $('#reset-grid').addClass('disabled');
	game_won = true;

	//disable grid clicking
	$('#grid').removeClass('enabled-grid').addClass('disabled-grid');

	//date
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output =   (day<10 ? '0' : '') + day+ '/' + (month<10 ? '0' : '') + month + '/' + d.getFullYear();
	game_date = output;

	//time
	game_end = new Date().getTime();
	var game_time_ms = game_end - game_start;
	var seconds = 1 * 1000;
	var minutes = seconds * 60;
	var hours = minutes * 60;
	var days = hours * 24;
	var years = days * 365;
	var game_seconds = Math.round(game_time_ms / seconds) + 's';

	//add win
	var win = {moves: game_moves,time: game_seconds, date: game_date, hints: hints_used, grid: init_states, level: game_difficulty};
	var wins = JSON.parse(localStorage.getItem("lightsOutWinStats"));
	wins.push(win);
	localStorage.setItem("lightsOutWinStats", JSON.stringify(wins));
	RestartConfetti();
	//setTimeout(function(){ displayNewTableIcon(); }, 2000);
	setTimeout(function(){ DeactivateConfetti(); }, 3000);
}

function displayNewTableIcon() {
	/*$('.play-again-parent').css('display', 'block');
	$("#canvas").on("click", function() {
	  newTable();
		alert("hello");
	});*/
}

function hideNewTableIcon() {
	//$('.play-again-parent').css('display', 'none');

}

/* clear win stats */
function clearWinStats() {

  localStorage.setItem('lightsOutWinStats', '[]');
	$('#wins_table').empty();
}

/* play a sound when the user clicks on a square */
function playsound() {

	if (!muted) {
  	sound.play();
	}
}

/* toggle sound icon when clicked */
$('#sound').click(function(){

  $(this).find('span').toggleClass('fa-volume-up fa-volume-off');

	if ($(this).find('span').hasClass('fa-volume-up')) {
		muted = false;
	} else {
		muted = true;
	}
});
