import { gameBoard } from "./constants";

let minefield = [];

const mineFieldProperties = () => {
	for (let i = 0; i < gameBoard.rows; i++) {
		minefield[i] = [];
		for (let j = 0; j < gameBoard.cols; j++) {
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
};

const placeMines = () => {
	let placedMines = 0;
	while (placedMines < gameBoard.numMines) {
		const row = Math.floor(Math.random() * gameBoard.rows);
		const col = Math.floor(Math.random() * gameBoard.cols);
		if (!minefield[row][col].mine) {
			minefield[row][col].mine = true;
			placedMines++;
		}
	}
};

const calculateAdjMines = () => {
	for (let i = 0; i < gameBoard.rows; i++) {
		for (let j = 0; j < gameBoard.cols; j++) {
			const cell = minefield[i][j];
			if (!cell.mine) {
				cell.adjMines = countAdjMines(i, j);
			}
		}
	}
};

const countAdjMines = (row, col) => {
	let count = 0;
	for (
		let i = Math.max(0, row - 1);
		i <= Math.min(row + 1, gameBoard.rows - 1);
		i++
	) {
		for (
			let j = Math.max(0, col - 1);
			j <= Math.min(col + 1, gameBoard.cols - 1);
			j++
		) {
			if (minefield[i][j].mine) {
				count++;
			}
		}
	}
	return count;
};

const populateBoard = () => {
	mineFieldProperties();
	placeMines();
	calculateAdjMines();
};

export { populateBoard, minefield };
