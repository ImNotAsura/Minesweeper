/*----- constants -----*/

import { renderInit } from "./modules/form";
import { startTimer, stopTimer } from "./modules/timer";

/*----- state variables -----*/

let minefield = [];
let rows = 0;
let cols = 0;
let numMines = 0;
let bombsLeft = 0;
// let gameState = "";

/*----- cached elements -----*/
const board = document.querySelector("#board");
const endScreen = document.querySelector("#end-screen");
const bombCounter = document.querySelector("#bombs-count");

/*----- event listeners -----*/
document.getElementById("difficulty").addEventListener("change", (event) => {
	handleDifficultyChange(event);
});

document.getElementById("settings-form").addEventListener("submit", (event) => {
	handleFormSubmit(event);
});

/*----- event handlers -----*/
const handleDifficultyChange = (event) => {
	const selectedDifficulty = event.target.value;
	//* Object destructuring - To grab the values of the following properties
	const { rows, cols, numMines } = getDifficultyValues(selectedDifficulty);
	renderForm(rows, cols, numMines);
};

const handleFormSubmit = (event) => {
	event.preventDefault();

	const form = event.target;
	rows = form.rows.value;
	cols = form.cols.value;
	numMines = form.numMines.value;

	init();
};

const handleCellClick = (row, col) => {
	const cell = minefield[row][col];

	if (cell.revealed || cell.flagged) {
		return;
	}

	cell.revealed = true;
	renderCell(cell);

	if (cell.mine) {
		renderLosePage();
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
			bombsLeft--;
		} else {
			bombsLeft++;
		}

		bombCounter.textContent = bombsLeft;
	}

	renderCell(cell);
	checkWin();
};

/*----- render functions -----*/

const renderForm = (rows, cols, numMines) => {
	const rowsInput = document.getElementById("rows");
	const colsInput = document.getElementById("cols");
	const numMinesInput = document.getElementById("numMines");

	rowsInput.value = rows;
	colsInput.value = cols;
	numMinesInput.value = numMines;
};

const renderBoard = () => {
	board.innerHTML = "";
	board.style.setProperty("--rows", rows);
	board.style.setProperty("--cols", cols);
	bombsLeft = numMines;
	bombCounter.textContent = bombsLeft;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
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

const renderWinPage = () => {
	const winGame = document.querySelector("#win-game");
	winGame.innerHTML = "GAME OVER. YOU WIN";
	endScreen.style.display = "flex";
	stopTimer();
};

const renderLosePage = () => {
	//* Reveal all mine positions?
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = minefield[i][j];
			if (cell.mine) {
				cell.revealed = true;
				renderCell(cell);
			}
		}
	}

	const loseGame = document.querySelector("#lose-game");
	loseGame.innerHTML = "GAME OVER. YOU LOSE";
	endScreen.style.display = "flex";
	stopTimer();

	// gameState = "lose";
};

/*----- helper functions -----*/
const getDifficultyValues = (selectedDifficulty) => {
	const difficulty = {
		easy: { rows: 9, cols: 9, numMines: 10 },
		medium: { rows: 14, cols: 14, numMines: 30 },
		hard: { rows: 19, cols: 19, numMines: 60 },
		custom: { rows: 0, cols: 0, numMines: 0 },
	};

	return difficulty[selectedDifficulty];
};

const countAdjMines = (row, col) => {
	let count = 0;
	for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, rows - 1); i++) {
		for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, cols - 1); j++) {
			if (minefield[i][j].mine) {
				count++;
			}
		}
	}
	return count;
};

/*----- game logic functions -----*/
const initBoard = () => {
	//* Initialise the minefield, place mines & calculateAdjMines
	for (let i = 0; i < rows; i++) {
		minefield[i] = [];
		for (let j = 0; j < cols; j++) {
			minefield[i][j] = {
				mine: false,
				revealed: false,
				flagged: false,
				adjMines: 0,
				row: i,
				col: j,
			};
		}
	}
	placeMines();
	calculateAdjMines();
	console.log(minefield);
};

const placeMines = () => {
	let placedMines = 0;
	while (placedMines < numMines) {
		const row = Math.floor(Math.random() * rows);
		const col = Math.floor(Math.random() * cols);
		if (!minefield[row][col].mine) {
			minefield[row][col].mine = true;
			placedMines++;
		}
	}
};

const calculateAdjMines = () => {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = minefield[i][j];
			if (!cell.mine) {
				cell.adjMines = countAdjMines(i, j);
			}
		}
	}
};

const floodFill = (row, col) => {
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (i >= 0 && i < rows && j >= 0 && j < cols) {
				const cell = minefield[i][j];
				if (!cell.revealed && !cell.flagged) {
					cell.revealed = true;
					renderCell(cell);
					if (cell.mine) {
						renderLosePage();
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

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = minefield[i][j];
			//* If the cell does not have a mine and is not revealed, game continues
			if (!cell.mine && !cell.revealed) {
				allNonMinesRevealed = false;
				break;
			}
		}
	}

	if (allNonMinesRevealed) {
		renderWinPage();
		// gameState = "win";
	}
};

function init() {
	initBoard();
	renderBoard();
	startTimer();

	const startScreen = document.querySelector("#start-screen");
	const gameScreen = document.querySelector("#game-screen");

	startScreen.style.display = "none";
	gameScreen.style.display = "block";
}

renderInit();
