let totalSeconds = 0;
let timerInterval;

const startTimer = () => {
	totalSeconds = 0;
	renderTimer();
	timerInterval = setInterval(updateTimer, 1000);
};

const stopTimer = () => {
	clearInterval(timerInterval);
};

const updateTimer = () => {
	totalSeconds++;
	renderTimer();
};

const renderTimer = () => {
	const timerElement = document.querySelector("#timer");
	const formattedTime = formatTime(totalSeconds);
	timerElement.textContent = formattedTime;
};

const formatTime = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const storeTimerInLocalStorage = (difficulty, elapsedTimeInSeconds) => {
	const storedTime = localStorage.getItem(difficulty);
	if (!storedTime || elapsedTimeInSeconds < parseFloat(storedTime)) {
		localStorage.setItem(difficulty, elapsedTimeInSeconds.toString());
	}
};

const getElapsedTimeInSeconds = () => {
	return totalSeconds;
};

export {
	startTimer,
	stopTimer,
	getElapsedTimeInSeconds,
	formatTime,
	storeTimerInLocalStorage,
};
