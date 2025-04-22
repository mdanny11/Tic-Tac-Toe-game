const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// Function to handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell');
    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
}

// Function to check for a winner
function checkWinner() {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombination) {
        const [a, b, c] = combo;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            highlightWinningCombination(combo);
            if (currentPlayer === 'X') {
                scoreX++;
                scoreXDisplay.textContent = scoreX;
            } else {
                scoreO++;
                scoreODisplay.textContent = scoreO;
            }
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
            return;
        }
    }

    if (!gameState.includes('')) {
        gameActive = false;
        setTimeout(() => alert('It\'s a draw!'), 100);
    }
}

// Function to highlight the winning combination
function highlightWinningCombination(combo) {
    combo.forEach(index => {
        cells[index].style.backgroundColor = 'green';
    });
}

// Function to restart the game
function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = currentPlayer;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
}

// Adding event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
// Function to handle cell click
function handleCellClick(event) {
    if (!gameActive) return;

    const cellIndex = event.target.getAttribute('data-cell');
    if (gameState[cellIndex] !== '' || currentPlayer === 'O') return;

    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = 'O';
    currentPlayerDisplay.textContent = currentPlayer;

    if (gameActive) {
        setTimeout(aiMove, 500); // AI move after 500ms
    }
}

// Simple AI move function
function aiMove() {
    let availableCells = gameState
        .map((value, index) => value === '' ? index : null)
        .filter(value => value !== null);

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    checkWinner();
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = currentPlayer;
}
