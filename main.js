import { difficulty } from "./modules/constants";

const renderSelect = () => {
	const difficultySelect = document.querySelector("#difficulty");

	difficultySelect.innerHTML = "";

	const defaultOption = document.createElement("option");
	defaultOption.value = "";
	defaultOption.textContent = "Please select";
	difficultySelect.appendChild(defaultOption);

	const difficulties = Object.keys(difficulty);

	difficulties.forEach((difficulty) => {
		const option = document.createElement("option");
		option.value = difficulty;
		option.textContent =
			difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
		difficultySelect.appendChild(option);
	});
};

renderSelect();
