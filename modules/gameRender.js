import { gameBoard } from "./constants";

import {
	getElapsedTimeInSeconds,
	startTimer,
	stopTimer,
	formatTime,
	storeTimerInLocalStorage,
} from "./timer";

import { populateBoard, minefield } from "./populateBoard";

const board = document.querySelector("#board");
const bombCounter = document.querySelector("#bombs-count");
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const endScreen = document.querySelector("#end-screen");

/* Gameboard */
function init() {
	renderBoard();
	populateBoard();
	startTimer();

	startScreen.style.display = "none";
	gameScreen.style.display = "block";
}

const renderBoard = () => {
	board.innerHTML = "";
	board.style.setProperty("--rows", gameBoard.rows);
	board.style.setProperty("--cols", gameBoard.cols);
	gameBoard.bombsLeft = gameBoard.numMines;
	bombCounter.textContent = gameBoard.bombsLeft;

	for (let i = 0; i < gameBoard.rows; i++) {
		for (let j = 0; j < gameBoard.cols; j++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");
			cell.setAttribute("data-row", i);
			cell.setAttribute("data-col", j);

			cell.addEventListener("click", () => {
				handleCellClick(i, j);
			});

			cell.addEventListener("contextmenu", (event) => {
				event.preventDefault();
				handleRightClick(i, j);
			});

			board.appendChild(cell);
		}
	}
};

/* Event handlers for Board */
const handleCellClick = (row, col) => {
	const cell = minefield[row][col];

	if (cell.revealed || cell.flagged) {
		return;
	}

	cell.revealed = true;
	renderCell(cell);

	if (cell.mine) {
		renderEndPage(false);
	} else {
		if (cell.adjMines === 0) {
			floodFill(row, col);
		}
		checkWin();
	}
};

const handleRightClick = (row, col) => {
	const cell = minefield[row][col];

	if (cell.revealed) {
		floodFill(row, col);
	} else {
		cell.flagged = !cell.flagged;

		if (cell.flagged) {
			gameBoard.bombsLeft--;
		} else {
			gameBoard.bombsLeft++;
		}

		bombCounter.textContent = gameBoard.bombsLeft;
	}

	renderCell(cell);
	checkWin();
};

/* Mid-Game rendering & checkWin */
const renderCell = (cell) => {
	const cellElement = document.querySelector(
		`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`,
	);

	cellElement.classList.remove("revealed", "flagged");

	if (cell.revealed) {
		cellElement.classList.add("revealed");
		if (cell.mine) {
			cellElement.innerHTML = "B";
		} else {
			cellElement.innerHTML = cell.adjMines === 0 ? "" : cell.adjMines;
		}
	} else if (cell.flagged) {
		cellElement.classList.add("flagged");
		//* Place a flag
		cellElement.innerHTML = "?";
	}
};

const floodFill = (row, col) => {
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (i >= 0 && i < gameBoard.rows && j >= 0 && j < gameBoard.cols) {
				const cell = minefield[i][j];
				if (!cell.revealed && !cell.flagged) {
					cell.revealed = true;
					renderCell(cell);
					if (cell.mine) {
						renderEndPage(false);
						return;
					}
					if (cell.adjMines === 0) {
						floodFill(i, j);
					}
				}
			}
		}
	}
};

const checkWin = () => {
	let allNonMinesRevealed = true;

	for (let i = 0; i < gameBoard.rows; i++) {
		for (let j = 0; j < gameBoard.cols; j++) {
			const cell = minefield[i][j];
			if (!cell.mine && !cell.revealed) {
				allNonMinesRevealed = false;
				break;
			}
		}
	}

	if (allNonMinesRevealed) {
		renderEndPage(true);
		// gameState = "win";
	}
};

/* End Game Render */
const renderEndPage = (isWin) => {
	stopTimer();
	const elapsedTime = getElapsedTimeInSeconds();
	if (isWin) {
		storeTimerInLocalStorage(gameBoard.selectedDifficulty, elapsedTime);
	} else {
		for (let i = 0; i < gameBoard.rows; i++) {
			for (let j = 0; j < gameBoard.cols; j++) {
				const cell = minefield[i][j];
				if (cell.mine) {
					cell.revealed = true;
					renderCell(cell);
				}
			}
		}
	}
	const fastestTime = localStorage.getItem(gameBoard.selectedDifficulty);

	const endGame = document.querySelector(isWin ? "#win-game" : "#lose-game");
	endGame.innerHTML = "";

	let endGameContent = `
    <div>
      <p>GAME OVER. YOU ${isWin ? "WIN" : "LOSE"}</p>
  `;

	if (isWin) {
		endGameContent += `
      <p>Time Taken: ${formatTime(elapsedTime)}</p>
      <p>Fastest Time: ${formatTime(parseFloat(fastestTime) || elapsedTime)}</p>
      <button id="reset-highscore-button">Reset Highscore</button>
    `;
	}

	endGameContent += `
    </div>
    <div>
      <button id="restart-button">Restart</button>
      <button id="home-button">Home</button>
    </div>
  `;

	endGame.innerHTML = endGameContent;

	const resetHighscoreButton = document.getElementById(
		"reset-highscore-button",
	);
	if (resetHighscoreButton) {
		resetHighscoreButton.addEventListener("click", () => {
			localStorage.removeItem(gameBoard.selectedDifficulty);
		});
	}

	const restartButton = document.getElementById("restart-button");
	restartButton.addEventListener("click", () => {
		endGame.innerHTML = "";
		endScreen.style.display = "none";
		endScreen.classList.remove("win", "lose");
		init();
	});

	const homeButton = document.getElementById("home-button");
	homeButton.addEventListener("click", () => {
		location.reload();
	});

	endScreen.style.display = "flex";
	endScreen.classList.add(isWin ? "win" : "lose");
};

export { init };
