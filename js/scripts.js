function Tile(x, y, bombProbability) {
    this.x = x;
    this.y = y;
    this.hasBomb = Math.random() <= bombProbability;
    this.adjacentBombs = 0;
}

function clickTile(id) {
    var element = document.getElementById(id);
    console.log(element);
    element.style.backgroundColor = 'gainsboro';
    element.style.border = 'solid 3px gainsboro';
    element.firstChild.firstChild.style.visibility = 'visible';
    console.log(element.firstChild.firstChild.innerHTML);
    if(element.firstChild.firstChild.innerHTML === '•') {
        element.style.backgroundColor = 'red';
        element.style.border = 'solid 3px red';
    }
}

function Board(x, y) {
    var tileArray = new Array(x);
    for (var i = 0; i < x; i++) {
        tileArray[i] = new Array(y);
        for(var j = 0; j < y; j++) {
            tileArray[i][j] = new Tile(i, j, 0.2);
        }
    }

    var boardWidth = x - 1;
    var boardHeight = y - 1;

    calcAdjacentBombs(tileArray);

    function calcAdjacentBombs(board) {
        for(var j = 0; j <= boardHeight; j++) {
            for(var i = 0; i <= boardWidth; i++) {
                if(i > 0 && board[i-1][j].hasBomb)
                    board[i][j].adjacentBombs++;
                if(i > 0 && j > 0) {
                    if(board[i-1][j-1].hasBomb)
                        board[i][j].adjacentBombs++;
                }
                if(i > 0 && j < boardHeight) {
                    if(board[i-1][j+1].hasBomb)
                        board[i][j].adjacentBombs++;
                }
                if(i < boardWidth && board[i+1][j].hasBomb)
                    board[i][j].adjacentBombs++;
                if(i < boardWidth && j > 0) {
                    if(board[i+1][j-1].hasBomb)
                        board[i][j].adjacentBombs++;
                }
                if(i < boardWidth && j < boardHeight) {
                    if(board[i+1][j+1].hasBomb)
                        board[i][j].adjacentBombs++;
                }
                if(j > 0 && board[i][j-1].hasBomb) {
                    board[i][j].adjacentBombs++;
                }
                if(j < boardHeight && board[i][j+1].hasBomb) {
                    board[i][j].adjacentBombs++;
                }
            }
        }
    }

    function drawBoard() {
        var board = "<table>";
        var textToPrint = function() {
            if(tileArray[i][j].hasBomb) {
                return '•';
            }
            else {
                return tileArray[i][j].adjacentBombs;
            }
        };
        for(var j = 0; j <= boardWidth; j++) {
            board += "<tr>";
            for(var i = 0; i <= boardHeight; i++) {
                board += "<td class='tile' id='tile" + i + '-' + j + "' style='width: 32px; height: 32px' onclick='clickTile(this.id)'>" +
                    "<button><i class='buttonText'>" + textToPrint() + "</i></button></td>";
            }
            board += "</tr>";
        }
        board += "</table>";
        document.getElementById('mineField').innerHTML = board;


    }

    drawBoard();
}


var myBoard = new Board(5, 5);