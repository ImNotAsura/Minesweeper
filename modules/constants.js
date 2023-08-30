const difficulty = {
	easy: { rows: 9, cols: 9, numMines: 12 },
	medium: { rows: 13, cols: 13, numMines: 30 },
	hard: { rows: 17, cols: 17, numMines: 60 },
	custom: { rows: 0, cols: 0, numMines: 0 },
};

const gameBoard = {
	rows: 0,
	cols: 0,
	numMines: 0,
	bombsLeft: 0,
	selectedDifficulty: null,
};

export { difficulty, gameBoard };
