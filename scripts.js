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
    const toString = () => {
        let boardString = "";
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                if (column !== columns - 1) {
                    boardString += board[row][column] + "|";
                } else {
                    boardString += board[row][column];
                }

            }
            boardString += "\n";
        }
        return boardString;
    }
    return { getBoard, placePlayer, getAvailableCells, toString };
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
        // now human turn
        console.log(ticTacToeBoard.toString());
        const rowChoice = prompt("Row?");
        const columnChoice = prompt("Column?");
        ticTacToeBoard.placePlayer(rowChoice - 1, columnChoice - 1, activePlayer);
        // now computer turn
        switchActivePlayer();
        const computerAvailableCellArray = ticTacToeBoard.getAvailableCells();
        const [computerRowChoice, computerColumnChoice] = computerAvailableCellArray[Math.floor(Math.random() * computerAvailableCellArray.length)];
        ticTacToeBoard.placePlayer(computerRowChoice, computerColumnChoice, activePlayer);
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

