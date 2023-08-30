import { difficulty } from "./modules/constants";

const settingsForm = document.getElementById("settings-form");

const renderLabels = () => {
	const inputFields = [
		{ label: "Rows:", id: "rows", value: "9" },
		{ label: "Columns:", id: "cols", value: "9" },
		{ label: "Number of Mines:", id: "numMines", value: "12" },
	];

	for (const field of inputFields) {
		const label = document.createElement("label");
		label.setAttribute("for", field.id);
		label.textContent = field.label + " ";
		settingsForm.appendChild(label);

		const input = document.createElement("input");
		input.setAttribute("type", "number");
		input.setAttribute("id", field.id);
		input.setAttribute("name", field.id);
		input.setAttribute("value", field.value);
		input.setAttribute("required", "");
		settingsForm.appendChild(input);

		settingsForm.appendChild(document.createElement("br"));
		settingsForm.appendChild(document.createElement("br"));
	}
};

const renderSelect = () => {
	const difficultySelect = document.querySelector("#difficulty");
	const difficulties = Object.keys(difficulty);

	difficulties.forEach((difficulty) => {
		const option = document.createElement("option");
		option.value = difficulty;
		option.textContent =
			difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
		difficultySelect.appendChild(option);
	});
};

const renderStartButton = () => {
	const startButton = document.createElement("button");
	startButton.setAttribute("type", "submit");
	startButton.textContent = "Start Game";
	settingsForm.appendChild(startButton);
};

function renderInit() {
	renderLabels();
	renderSelect();
	renderStartButton();
}

renderInit();
