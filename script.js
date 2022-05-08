const startButton = document.querySelector("#start-btn"),
	nextButton = document.querySelector("#next-btn"),
	questionContainer = document.querySelector("#question-container"),
	questionElement = document.querySelector("#question"),
	answerButtons = document.querySelector("#answer-buttons");
let shuffledQuestions, currentQuestionIndex;
startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
});
function startGame() {
	startButton.classList.add("hide");
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	questionContainer.classList.remove("hide");
	setNextQuestion();
}

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function resetState() {
	nextButton.classList.add("hide");
	document.body.classList.remove("correct", "wrong");
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}
function showQuestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		button.classList.add("btn");
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
		answerButtons.append(button);
	});
}
function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	setStatusClass(document.body, correct);

	Array.from(answerButtons.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		startButton.innerText = "Restart";
		startButton.classList.remove("hide");
	}
}
function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add("correct");
	} else {
		element.classList.add("wrong");
	}
}

function clearStatusClass(element) {
	element.classList.remove("correct", "wrong");
}
const questions = [
	{
		question: "what is 2 + 2?",
		answers: [
			{ text: "4", correct: true },
			{ text: "22", correct: false },
		],
	},
	{
		question: "what is 23 + 2?",
		answers: [
			{ text: "22", correct: false },
			{ text: "6", correct: false },
			{ text: "25", correct: true },
			{ text: "5", correct: false },
		],
	},
	{
		question: "what is 2 * 2?",
		answers: [
			{ text: "22", correct: false },
			{ text: "11", correct: false },
			{ text: "5", correct: false },
			{ text: "4", correct: true },
		],
	},
	{
		question: "what is 2 * 5?",
		answers: [
			{ text: "22", correct: false },
			{ text: "11", correct: false },
			{ text: "10", correct: true },
			{ text: "5", correct: false },
		],
	},
	{
		question: "what is 2 / 2?",
		answers: [
			{ text: "4", correct: false },
			{ text: "22", correct: false },
			{ text: "1", correct: true },
			{ text: "5", correct: false },
		],
	},
];
