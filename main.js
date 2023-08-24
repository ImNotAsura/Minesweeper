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
		console.log(minefield);
		renderCell(cell);

		if (cell.mine) {
			//* Game Over
		} else {
			checkWin();
		}
	}
};

const handleRightClick = (row, col) => {
	console.log(row, col);
};

/*----- render functions -----*/
const renderBoard = () => {
	board.innerHTML = "";

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");

			cell.addEventListener("click", () => {
				handleCellClick(i, j);
				renderBoard();
			});

			cell.addEventListener("contextmenu", (event) => {
				event.preventDefault();
				handleRightClick(i, j);
				renderBoard();
			});

			board.appendChild(cell);
		}
	}
};

const renderCell = (cell) => {
	//* Reveal numbers
	if (cell.flagged) {
		//* Place a flag
	}
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

const checkWin = () => {};

function init() {
	initBoard();
	renderBoard();
}

init();
