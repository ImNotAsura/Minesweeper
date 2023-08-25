/*----- constants -----*/
//* Fixed constants for now, will allow for user input in the future
const rows = 8;
const cols = 8;
const numMines = 10;

/*----- state variables -----*/
let minefield = [];

/*----- cached elements -----*/
const board = document.querySelector("#board");

/*----- event listeners -----*/
const handleCellClick = (row, col) => {
	const cell = minefield[row][col];

	if (!cell.revealed && !cell.flagged) {
		cell.revealed = true;
		renderCell(cell);

		if (cell.mine) {
			renderLosePage();
		} else {
			checkWin();
		}
	}
};

const handleRightClick = (row, col) => {
	const cell = minefield[row][col];
	cell.flagged = true;
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
	console.log(cellElement);
	console.log(cell.mine);

	if (cell.revealed) {
		cellElement.classList.add("revealed");
		if (cell.mine) {
			cellElement.innerHTML = "B";
		} else {
			cellElement.innerHTML = "O";
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
	console.log("You lose");
};

/*----- game logic functions -----*/
const initBoard = () => {
	//* Initialise the minefield and place mines
	for (let i = 0; i < rows; i++) {
		minefield[i] = [];
		for (let j = 0; j < cols; j++) {
			minefield[i][j] = {
				mine: false,
				revealed: false,
				flagged: false,
				row: i,
				col: j,
			};
		}
	}
	console.log(minefield);
	placeMines();
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

init();
