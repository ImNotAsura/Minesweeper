import { init } from "./gameLogic";
import { difficulty, gameBoard } from "./constants";

document.getElementById("difficulty").addEventListener("change", (event) => {
	handleDifficultyChange(event);
});

document.getElementById("settings-form").addEventListener("submit", (event) => {
	handleFormSubmit(event);
});

const handleDifficultyChange = (event) => {
	gameBoard.selectedDifficulty = event.target.value;
	const { rows, cols, numMines } = getDifficultyValues(
		gameBoard.selectedDifficulty,
	);
	renderForm(rows, cols, numMines);
};

const handleFormSubmit = (event) => {
	event.preventDefault();

	const form = event.target;
	gameBoard.rows = form.rows.value;
	gameBoard.cols = form.cols.value;
	gameBoard.numMines = form.numMines.value;

	init();
};

const renderForm = (rows, cols, numMines) => {
	const rowsInput = document.getElementById("rows");
	const colsInput = document.getElementById("cols");
	const numMinesInput = document.getElementById("numMines");

	rowsInput.value = rows;
	colsInput.value = cols;
	numMinesInput.value = numMines;
};

const getDifficultyValues = (selectedDifficulty) => {
	return difficulty[selectedDifficulty];
};
