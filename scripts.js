// Player via Factory Design Pattern
function createPlayer(name, marker) {
    // private variables (includes parameters)
    // public methods
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
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
    return { getBoard };
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
    const getTicTacToeBoard = () => ticTacToeBoard;
    const getHumanPlayer = () => humanPlayer;
    const getComputerPlayer = () => computerPlayer;
    const getActivePlayer = () => activePlayer;
    return {
        getTicTacToeBoard,
        getHumanPlayer,
        getComputerPlayer,
        getActivePlayer
    }
})();

console.log(gameController.getTicTacToeBoard().getBoard());
console.log(`${gameController.getHumanPlayer().getName()}: ${gameController.getHumanPlayer().getMarker()}`);
console.log(`${gameController.getComputerPlayer().getName()}: ${gameController.getComputerPlayer().getMarker()}`);