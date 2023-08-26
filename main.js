/*----- constants -----*/
//* Fixed constants for now, will allow for user input in the future

/*----- state variables -----*/
let minefield = [];
let rows = 8;
let cols = 8;
let numMines = 10;

/*----- cached elements -----*/
const board = document.querySelector("#board");
const settingsForm = document.querySelector("#settings-form");
/*----- event listeners -----*/
const handleCellClick = (row, col) => {
	const cell = minefield[row][col];

	if (!cell.revealed && !cell.flagged) {
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
	}
};

const handleRightClick = (row, col) => {
	const cell = minefield[row][col];

	if (cell.revealed) {
		return;
	}

	if (cell.flagged) {
		cell.flagged = false;
	} else {
		cell.flagged = true;
	}

	renderCell(cell);
};

/*----- render functions -----*/
const renderBoard = () => {
	board.innerHTML = "";

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
	console.log("You Win!");
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
	console.log("You lose");
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

const floodFill = (row, col) => {
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (i >= 0 && i < rows && j >= 0 && j < cols) {
				const cell = minefield[i][j];
				if (!cell.revealed && !cell.flagged) {
					cell.revealed = true;
					renderCell(cell);
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
	}
};

function init() {
	initBoard();
	renderBoard();
}

// settingsForm.addEventListener("submit", (event) => {
// 	event.preventDefault();

// 	const startScreen = document.querySelector("#start-screen");
// 	const gameScreen = document.querySelector("#game-screen");
// 	const form = event.target;
// 	console.log(form);
// 	const difficulty = form.difficulty.value;
// 	console.log(difficulty);

// 	startScreen.style.display = "none";
// 	gameScreen.style.display = "block";
// });

init();
