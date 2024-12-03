import "scss-reset/reset.css";
import "./style.css";

type GameBoard = Array<string> & { length: 9 };

let currentPlayer = "x";
const gameBoard: GameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restart-btn");

const resetGameBoard = () => {
	for (let i = 0; i < gameBoard.length; i++) {
		gameBoard[i] = "";
	}
};

const restartGame = () => {
	if (!confirm("Вы уверены, что хотите начать игру заново?")) return;
	resetGameBoard();
	gameActive = true;
	currentPlayer = "x";
	updateUI();
};

restartBtn?.addEventListener("click", restartGame);

const isMoveAllowed = (clickedCellIndex: number): boolean => {
	return gameBoard[clickedCellIndex] === "" && gameActive;
};

const changePlayerTurn = () => {
	currentPlayer = currentPlayer === "x" ? "o" : "x";
};

const setMovePlayer = (clickedCellIndex: number) => {
	gameBoard[clickedCellIndex] = currentPlayer;
};

const cellClickedHandler = (event: MouseEvent) => {
	const clickedCell = event.target as HTMLDivElement;
	const clickedCellIndex = parseInt(clickedCell.id) - 1;

	if (!isMoveAllowed(clickedCellIndex)) return;

	setMovePlayer(clickedCellIndex);

	checkForWinOrDraw();

	changePlayerTurn();

	updateUI();
};

cells.forEach((cell) => {
	cell.addEventListener("click", cellClickedHandler);
});

const updateUI = () => {
	for (let i = 0; i < cells.length; i++) cells[i].innerText = gameBoard[i];
};

const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const checkForWinOrDraw = () => {
	let roundWon = false;

	for (let i = 0; i < winConditions.length; i++) {
		const [a, b, c] = winConditions[i];

		if (isWinConditions(a, b, c)) {
			roundWon = true;
			break;
		}
	}

	if (roundWon) {
		alert(`Победитель: ${currentPlayer}!`);
		gameActive = false;
		return;
	}

	let roundDraw = !gameBoard.includes("");
	if (roundDraw) {
		alert("Ничья!");
		gameActive = false;
		return;
	}
};

const isWinConditions = (a: number, b: number, c: number): boolean => {
	return (
		gameBoard[a] !== "" &&
		gameBoard[a] === gameBoard[b] &&
		gameBoard[a] === gameBoard[c]
	);
};
