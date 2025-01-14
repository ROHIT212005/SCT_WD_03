const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
const twoPlayerButton = document.getElementById('two-player');
const vsComputerButton = document.getElementById('vs-computer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let vsComputer = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initializeBoard() {
    boardElement.innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add('taken');
        checkWinner();
        if (!isGameOver) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
            if (vsComputer && currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function computerMove() {
    const emptyCells = board.map((val, idx) => (val === '' ? idx : null)).filter((val) => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
    cell.click();
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            messageElement.textContent = `Player ${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        isGameOver = true;
        messageElement.textContent = "It's a draw!";
    }
}

restartButton.addEventListener('click', initializeBoard);

twoPlayerButton.addEventListener('click', () => {
    vsComputer = false;
    initializeBoard();
});

vsComputerButton.addEventListener('click', () => {
    vsComputer = true;
    initializeBoard();
});

// Initialize the game
initializeBoard();
