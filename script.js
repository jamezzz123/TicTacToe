const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn = false;
const cellElements = document.querySelectorAll('[data-cell]');
const BOARD = document.getElementById("board");
const winngMessageTextElement = document.querySelector("[data-winning-message]")
const winngMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton')
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]

restartButton.addEventListener('click',
    startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {
            once: true
        });
    });
    setBoardHoverClass()
    winngMessageElement.classList.remove('show');

}

function endGame(draw) {
    if (draw) {
        winngMessageTextElement.innerText = 'Draw'
    } else {
        winngMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }

    winngMessageElement.classList.add('show');
}

startGame()


function handleClick(e) {
    let cell = e.target;
    let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true);
    }
    swapTurns();
    setBoardHoverClass()
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    BOARD.classList.remove(X_CLASS);
    BOARD.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        BOARD.classList.add(CIRCLE_CLASS);
    } else {
        BOARD.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    // return cellElements;
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)

        })
    })
}

function isDraw() {

    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    });
}