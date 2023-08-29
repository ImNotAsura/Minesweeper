let seconds = 0;
let minutes = 0;
let timerInterval;

const startTimer = () => {
	renderTimer();
	timerInterval = setInterval(updateTimer, 1000);
};

const stopTimer = () => {
	clearInterval(timerInterval);
};

const updateTimer = () => {
	seconds++;
	if (seconds >= 60) {
		seconds = 0;
		minutes++;
	}
	renderTimer();
};

const renderTimer = () => {
	const timerElement = document.querySelector("#timer");
	const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	timerElement.textContent = formattedTime;
};

export { startTimer, stopTimer };
