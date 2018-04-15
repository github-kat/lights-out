var N = 5;
var vector = [];
var offsets = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];
var moves = 0;

var lightsOutMatrix = [[1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1]];

var pseudoinverse = [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1], [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1], [0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0], [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0], [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1], [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0], [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0]];

// All the vectors in the nullspace of the Lights Out matrix, or that flip all the tiles.
var nullOrFlipAllVectors = [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[1, 0, 1, 0, 1], [1, 0, 1, 0, 1], [0, 0, 0, 0, 0], [1, 0, 1, 0, 1], [1, 0, 1, 0, 1]], [[0, 1, 1, 1, 0], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [0, 1, 1, 1, 0]], [[1, 1, 0, 1, 1], [0, 0, 0, 0, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0], [1, 1, 0, 1, 1]]
                           /*,[[0, 1, 1, 0, 1], [0, 1, 1, 1, 0], [0, 0, 1, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 0, 0]], [[1, 1, 0, 0, 0], [1, 1, 0, 1, 1], [0, 0, 1, 1, 1], [0, 1, 1, 1, 0], [0, 1, 1, 0, 1]], [[0, 0, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 1, 0, 0], [0, 1, 1, 1, 0], [1, 0, 1, 1, 0]], [[1, 0, 1, 1, 0], [0, 1, 1, 1, 0], [1, 1, 1, 0, 0], [1, 1, 0, 1, 1], [0, 0, 0, 1, 1]]*/ ];

function init() {
    for (var y = 0; y < N; y++) {
        vector[y] = [];
        for (var x = 0; x < N; x++) {
            vector[y][x] = 0;
        }
    }
}

function isInRange(value) {
    return value >= 0 && value < N;
}

function flip(x, y) {
    if (vector[y][x] === 1) {
        vector[y][x] = 0;
    } else {
        vector[y][x] = 1;
    }
}

function touch(x, y) {
    offsets.forEach(function (offset) {
        var xi = x + offset[0], yi = y + offset[1];
        if (isInRange(xi) && isInRange(yi)) {
            flip(xi, yi);
        }
    });
}

function markStats(x, y, win_index) {
    moves++;
    $('#win' + win_index  + 'col' + x + 'row' + y).addClass('marked');
}

function markHint(x, y) {
  $('#row' + y  + 'col' + x).addClass('marked');
  $('.marked').on("click", function(){
  	$(this).removeClass('marked');
  });
}

// Tricky point: vector is actually a square array, but we treat it as a column vector in multiplying.
// Also, this is done mod 2.
function multiply(matrix, vector) {
    var n = vector.length;

    var result = [];
    for (var y = 0; y < n; y++) {
        result[y] = [];
        for (var x = 0; x < n; x++) {
            result[y][x] = 0;
        }
    }
    for (var i = 0; i < n * n; i++) {
        var x = i % n, y = Math.floor(i / n);
        for (var j = 0; j < n * n; j++) {
            result[y][x] += matrix[i][j] * vector[Math.floor(j / n)][j % n];
            result[y][x] %= 2;
        }
    }
    return result;
}

function add(vector1, vector2) {
    var result = [];
    for (var y = 0; y < N; y++) {
        result[y] = [];
        for (var x = 0; x < N; x++) {
            result[y][x] = (vector1[y][x] + vector2[y][x]) % 2;
        }
    }
    return result;
}

function totalOnes(vector) {
    var result = 0;
    for (var y = 0; y < N; y++) {
        for (var x = 0; x < N; x++) {
            result += vector[y][x];
        }
    }
    return result;
}

function equal(vector1, vector2) {
    for (var y = 0; y < N; y++) {
        for (var x = 0; x < N; x++) {
            if (vector1[y][x] !== vector2[y][x]) {
                return false;
            }
        }
    }
    return true;
}

function isSolvable(vector) {
    return equal(multiply(lightsOutMatrix, multiply(pseudoinverse, vector)), vector);
}

function getAllSolutions(vector) {
    // Multiply by solution matrix
    var solVector = multiply(pseudoinverse, vector);
    return nullOrFlipAllVectors.map(function (v) { return add(v, solVector); });
}

init();

function initializeCellsArray() {
		var col;
		var row;
		vector = new Array();

		for (col = 0; col < 5; col++)
		{
				vector[col] = new Array();
				for (row = 0; row < 5; row++)
						vector[col][row] = 0;
		}
}

function showSolution(init_states, win_index, moves) {

  initializeCellsArray();

  $(init_states).each(function(index, value){
    vector[Math.floor(index/5)][index%5] = value;
  });

  var minSol = getAllSolutions(vector)
        .map(function (v) { return { vector: v, total: totalOnes(v) }; })
        .reduce(function (prev, curr) { return prev.total < curr.total ? prev : curr });

  var fewest_moves = 0;
    for (var y = 0; y < N; y++) {
        for (var x = 0; x < N; x++) {
            if (minSol.vector[y][x] === 1) {
                fewest_moves++;
                markStats(x, y, win_index);
            }
        }
    }

    if (fewest_moves < moves) {
      $('#solution' + win_index  + 'moves').html(fewest_moves);
    }
}
