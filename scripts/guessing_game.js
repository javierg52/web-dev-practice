//Game values
let target = rollNumber(100);
let turnNumber = 1;

//Game elements
const numberInput = document.getElementById("guessed-number");
const result = document.getElementById("guess-result");
const previousGuesses = document.getElementById("previous-guesses");
const restartButton = document.getElementById("restart");

let previousGuessesArr = [];

numberInput.focus();

document.getElementById("submission").addEventListener("click", () => {

    let guess = +numberInput.value;
    if(isNaN(guess)) {
        displayResult(result, "Wrong! Please enter a number", "failure");
    } else {
        if (guess <= 0 || guess > 100) {
            displayResult(result, "Invalid number. Please guess a number between 0 and 100.", "failure");
        } else {
            previousGuessesArr.push(guess);
            displayPreviousGuesses(previousGuesses);
            if(guess === target) {
                displayResult(result, "That's correct!", "success");
                endGame();
            } else if (guess > target) {
                displayResult(result, "Incorrect number! You guessed too high. Try again.", "failure");
            } else if (guess < target) {
                displayResult(result, "Incorrect number! You guessed too low. Try again.", "failure");
            }
        }
    }
    turnNumber++;
    numberInput.value = "";

    if(turnNumber >= 10) {
        displayResult(result, "Game over! You have run out of turns!", "failure");
        endGame();
    }
});

document.getElementById("restart").addEventListener("click", () => {
    target = rollNumber(100);
    numberInput.disabled = false;
    document.getElementById("submission").disabled = false;
    previousGuessesArr = [];
    turnNumber = 1;

    previousGuesses.classList.remove("show");
    previousGuesses.classList.add("hidden");

    result.classList.remove("show");
    result.classList.add("hidden");
    
    restartButton.classList.remove("show");
    restartButton.classList.add("hidden");
    numberInput.focus();
});

function rollNumber(max) {
    return Math.floor(Math.random()*max)+1;
}

function displayResult(element, message, result) {
    element.textContent = message;
    element.classList.remove("failure", "success");
    element.classList.add(result, "show");
}

function displayPreviousGuesses(element) {
    element.textContent = "Previous guesses: " + previousGuessesArr;

    if(!element.classList.contains("show")) {
        element.classList.add("show");
    }
}

function endGame() {
    numberInput.disabled = true;
    document.getElementById("submission").disabled = true;
    restartButton.classList.remove("hidden");
    restartButton.classList.add("show");
}