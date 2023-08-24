/*----- constants -----*/
//* Fixed constants for now, will allow for user input in the future
const rows = 8;
const cols = 8;
const numMines = 10;

/*----- state variables -----*/

/*----- cached elements -----*/
const board = document.querySelector("#board");

/*----- event listeners -----*/

/*----- render functions -----*/
const renderBoard = () => {
	board.innerHTML = "";

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const cell = document.createElement("div");

			board.appendChild(cell);
		}
	}
};

/*----- game logic functions -----*/
const initBoard = () => {
	//* Initialise the minefield and place mines
	placeMines();
};

const placeMines = () => {};

function init() {
	initBoard();
	renderBoard();
}

init();
