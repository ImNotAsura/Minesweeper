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
	console.log(row, col);
	const cell = minefield[row][col];
	cell.revealed = true;
	console.log(minefield);
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

			cell.addEventListener("mousedown", (event) => {
				if (event.button === 2) {
					event.preventDefault();
					handleRightClick(i, j);
					renderBoard();
				}
			});

			board.appendChild(cell);
		}
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

const placeMines = () => {};

function init() {
	initBoard();
	renderBoard();
}

init();
