
const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
const humanVsHumanButton = document.getElementById('humanVsHuman');
const humanVsAIButton = document.getElementById('humanVsAI');

let isXTurn = true;
let isAI = false;
let boardState = Array(9).fill(null);

const checkWinner = () => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes(null) ? null : 'Tie';
};

const handleClick = (e) => {
    if (checkWinner() || (isAI && !isXTurn)) return;

    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (boardState[index]) return;

    boardState[index] = isXTurn ? 'X' : 'O';
    cell.textContent = boardState[index];

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            gameStatus.textContent = "It's a Tie!";
        } else {
            gameStatus.textContent = `${winner} Wins!`;
        }
        return;
    }

    isXTurn = !isXTurn;
    gameStatus.textContent = isXTurn ? "Player X's Turn" : (isAI ? "AI's Turn" : "Player O's Turn");

    if (isAI && !isXTurn) {
        setTimeout(aiMove, 500); 
    }
};

const aiMove = () => {
    if (isXTurn || checkWinner()) return;

    let emptyCells = boardState.map((state, index) => state === null ? index : null).filter(index => index !== null);
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    boardState[move] = 'O';
    cells[move].textContent = 'O';

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            gameStatus.textContent = "It's a Tie!";
        } else {
            gameStatus.textContent = `${winner} Wins!`;
        }
        return;
    }

    isXTurn = !isXTurn;
    gameStatus.textContent = "Player X's Turn";
};

const startHumanVsHuman = () => {
    isAI = false;
    restartGame();
};

const startHumanVsAI = () => {
    isAI = true;
    restartGame();
};

const restartGame = () => {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    isXTurn = true;
    gameStatus.textContent = "Player X's Turn";
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
humanVsHumanButton.addEventListener('click', startHumanVsHuman);
humanVsAIButton.addEventListener('click', startHumanVsAI);
