import { init } from "./gameRender";
import { difficulty, gameBoard } from "./constants";
import { formatTime } from "./timer";

//* Render dropdown when choosing difficulty
document.getElementById("difficulty").addEventListener("change", (event) => {
	handleDifficultyChange(event);
});

const handleDifficultyChange = (event) => {
	const selectedDifficultyValues = difficulty[event.target.value];

	renderLabels();
	renderForm(selectedDifficultyValues);
};

const renderLabels = () => {
	const dynamic = document.getElementById("dynamic-content");
	dynamic.innerHTML = "";

	const inputFields = [
		{ label: "Rows:", id: "rows", value: "0" },
		{ label: "Columns:", id: "cols", value: "0" },
		{ label: "Number of Mines:", id: "numMines", value: "0" },
	];

	for (const field of inputFields) {
		const label = document.createElement("label");
		label.setAttribute("for", field.id);
		label.textContent = field.label + " ";
		dynamic.appendChild(label);

		const input = document.createElement("input");
		input.setAttribute("type", "number");
		input.setAttribute("id", field.id);
		input.setAttribute("name", field.id);
		input.setAttribute("value", field.value);
		input.setAttribute("required", "");
		dynamic.appendChild(input);

		dynamic.appendChild(document.createElement("br"));
		dynamic.appendChild(document.createElement("br"));
	}

	const startButton = document.createElement("button");
	startButton.setAttribute("type", "submit");
	startButton.textContent = "Start Game";
	dynamic.appendChild(startButton);

	const fastestTimeSpan = document.createElement("span");
	fastestTimeSpan.id = "fastest-time";
	fastestTimeSpan.style.marginLeft = "10px";
	dynamic.appendChild(fastestTimeSpan);
};

const renderForm = (selectedDifficultyValues) => {
	const rowsInput = document.getElementById("rows");
	const colsInput = document.getElementById("cols");
	const numMinesInput = document.getElementById("numMines");

	rowsInput.value = selectedDifficultyValues.rows;
	colsInput.value = selectedDifficultyValues.cols;
	numMinesInput.value = selectedDifficultyValues.numMines;

	const fastestTimeParagraph = document.getElementById("fastest-time");
	const selectedDifficulty = document.getElementById("difficulty").value;
	const fastestTimeForDifficulty = localStorage.getItem(selectedDifficulty);

	if (fastestTimeForDifficulty) {
		fastestTimeParagraph.textContent = `Fastest Time: ${formatTime(
			parseFloat(fastestTimeForDifficulty),
		)}`;
	} else {
		fastestTimeParagraph.textContent = "No highscore yet!";
	}
};

//* Submit Event - Game Starts
document.getElementById("settings-form").addEventListener("submit", (event) => {
	handleFormSubmit(event);
});

const handleFormSubmit = (event) => {
	event.preventDefault();

	const form = event.target;
	gameBoard.rows = form.rows.value;
	gameBoard.cols = form.cols.value;
	gameBoard.numMines = form.numMines.value;

	init();
};
