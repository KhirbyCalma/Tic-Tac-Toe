// Player via Factory Design Pattern
function createPlayer(name, marker) {
    // private variables (includes parameters)
    // public methods
    const getName = () => name;
    const getMarker = () => marker;
    const toString = () => `${name}: ${marker}`
    return { getName, getMarker, toString };
}

// Tic-Tac-Toe Board via Factory Design Pattern
function createBoard() {
    // private variables
    const rows = 3;
    const columns = 3;
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(null);
        }
    }
    // public methods
    const getBoard = () => board;
    const placePlayer = (row, column, player) => {
        board[row][column] = player;
    }
    const checkPlayerInCell = (row, column, player) => {
        return board[row][column] === player;
    }
    const getAvailableCells = () => {
        let availableCellArray = [];
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                if (board[row][column] === null) {
                    availableCellArray.push([row, column]);
                }
            }
        }
        return availableCellArray;
    }
    const checkWinner = (player) => {
        return (
            (checkPlayerInCell(0, 0, player) && checkPlayerInCell(0, 1, player) && checkPlayerInCell(0, 2, player)) ||
            (checkPlayerInCell(1, 0, player) && checkPlayerInCell(1, 1, player) && checkPlayerInCell(1, 2, player)) ||
            (checkPlayerInCell(2, 0, player) && checkPlayerInCell(2, 1, player) && checkPlayerInCell(2, 2, player)) ||
            (checkPlayerInCell(0, 0, player) && checkPlayerInCell(1, 0, player) && checkPlayerInCell(2, 0, player)) ||
            (checkPlayerInCell(0, 1, player) && checkPlayerInCell(1, 1, player) && checkPlayerInCell(2, 1, player)) ||
            (checkPlayerInCell(0, 2, player) && checkPlayerInCell(1, 2, player) && checkPlayerInCell(2, 2, player)) ||
            (checkPlayerInCell(0, 0, player) && checkPlayerInCell(1, 1, player) && checkPlayerInCell(2, 2, player)) ||
            (checkPlayerInCell(2, 0, player) && checkPlayerInCell(1, 1, player) && checkPlayerInCell(0, 2, player)) 
        );
    } 
    const toString = () => {
        let boardString = "";
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                if (column !== columns - 1) {
                    boardString += (board[row][column] !== null ? board[row][column].getMarker() : " ") + "|";
                } else {
                    boardString += (board[row][column] !== null ? board[row][column].getMarker() : " ");
                }

            }
            boardString += "\n";
        }
        return boardString;
    }
    return { getBoard, placePlayer, checkPlayerInCell, getAvailableCells, checkWinner, toString };
}


/* 
    TicTacToe Game Controller via Singleton Design Pattern (factory design pattern in IIFE module pattern)
    - requiring two players and the tic-tac-toe board to start
*/
const gameController = (function (
    ticTacToeBoard = createBoard(),
    humanPlayer = createPlayer("You", "X"), 
    computerPlayer = createPlayer("Computer", "O") 
) {
    // private variables and methods
    let activePlayer = humanPlayer; // start with human player first

    const switchActivePlayer = () => {
        activePlayer = (activePlayer === humanPlayer) ? computerPlayer : humanPlayer; 
    }

    // public methods
    const playRound = () => {
        while (ticTacToeBoard.getAvailableCells().length >= 1) {
            if (activePlayer == humanPlayer) {
                console.log("HUMAN START");
                console.log(ticTacToeBoard.toString());
                let rowChoice = +prompt("Row?");
                let columnChoice = +prompt("Column?");
                while (!arrayInArray(ticTacToeBoard.getAvailableCells(), [rowChoice, columnChoice])) {
                    rowChoice = +prompt("Diff. Row?");
                    columnChoice = +prompt("Diff. Column?");
                }
                ticTacToeBoard.placePlayer(rowChoice, columnChoice, activePlayer);
                console.log(ticTacToeBoard.toString());
                console.log("HUMAN END");
            } else {
                console.log("COMPUTER START");
                const computerAvailableCellArray = ticTacToeBoard.getAvailableCells();
                const [computerRowChoice, computerColumnChoice] = computerAvailableCellArray[Math.floor(Math.random() * computerAvailableCellArray.length)];
                ticTacToeBoard.placePlayer(computerRowChoice, computerColumnChoice, activePlayer);
                console.log(ticTacToeBoard.toString());
                console.log("COMPUTER END");
            }
            if (ticTacToeBoard.checkWinner(activePlayer)) {
                console.log(`${activePlayer.getName()} won!`);
                break;
            }
            // tie
            else if (ticTacToeBoard.getAvailableCells().length === 0) {
                console.log(`It is a tie.`);
                break;
            }
            // go back to human for upcoming turn
            switchActivePlayer();
        }
        console.log(ticTacToeBoard.toString());
    }
    const getTicTacToeBoard = () => ticTacToeBoard;
    const getHumanPlayer = () => humanPlayer;
    const getComputerPlayer = () => computerPlayer;
    const getActivePlayer = () => activePlayer;
    return {
        playRound,
        getTicTacToeBoard,
        getHumanPlayer,
        getComputerPlayer,
        getActivePlayer
    }
})();

gameController.playRound();

function arrayInArray(outerArray, innerArray) {
    return outerArray.some(subArray => 
      subArray.length === innerArray.length && 
      subArray.every((value, index) => value === innerArray[index])
    );
  }