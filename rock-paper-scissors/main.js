CHOICES = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function getHumanChoice(input) {
    switch (input) {
        case "player-choice-rock":
            return "rock";
        case "player-choice-paper":
            return "paper";
        case "player-choice-scissors":
            return "scissors";
    }
}

function playRound(humanChoice, computerChoice) {
    const gameLogs = document.querySelector("#game-log");
    const roundResult = document.createElement("p");
    let result;
    let color;

    if (humanChoice === computerChoice) {
        result = `A draw! ${humanChoice} vs ${computerChoice}`
    }
    else if (humanChoice === 'rock' && computerChoice === 'scissors' ||
        humanChoice === 'paper' && computerChoice === 'rock' ||
        humanChoice === 'scissors' && computerChoice === 'paper') {
        result = `You win! ${humanChoice} vs ${computerChoice}`
        color = "green";
        humanScore += 1;
    } else {
        result = `You lose :( ${humanChoice} vs ${computerChoice}`
        color = "red";
        computerScore += 1;
    }
    roundResult.textContent = result;
    roundResult.style.color = color;
    gameLogs.appendChild(roundResult);
}

function playMove(e) {
    if (humanScore >= 5 || computerScore >= 5) {
        resetGame();
    }
    playRound(getHumanChoice(e.target.id),
        getComputerChoice()
    );
    displayScore();
    checkWinner();
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    const gameLogs = document.querySelector("#game-log");
    while (gameLogs.firstChild) {
        gameLogs.removeChild(gameLogs.firstChild);
    }
}

function displayScore() {
    const gameScore = document.querySelector("#game-score");
    gameScore.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;
}

function checkWinner() {
    const gameLogs = document.querySelector("#game-log");
    const gameFinalResult = document.createElement("p");

    if (humanScore === 5) {
        gameFinalResult.textContent = "Congratulations, you have won!"
        gameFinalResult.style.fontWeight = "bold";
        gameFinalResult.style.color = "green";
    } else if (computerScore === 5) {
        gameFinalResult.textContent = "Sorry, you lose :'("
        gameFinalResult.style.fontWeight = "bold";
        gameFinalResult.style.color = "red";
    } else {
        return;
    }

    gameLogs.appendChild(gameFinalResult);
}

// DOM

const buttons = document.querySelectorAll(".player-choice button");
buttons.forEach(button => button.addEventListener("click", playMove));


// UI
let humanScore = 0;
let computerScore = 0;

displayScore();

