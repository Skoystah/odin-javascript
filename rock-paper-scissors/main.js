CHOICES = ['rock', 'paper', 'scissors'];


function getComputerChoice() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function getHumanChoice() {
    let choice = -1;
    while (choice < 0 || choice > 3) {
        choice = parseInt(prompt(`Choose your move:\n
        1) rock\n
        2) paper\n
        3) scissors\n`));
    }
    return CHOICES[choice - 1]
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log(`A draw! ${humanChoice} vs ${computerChoice}`);
        return null;
    }
    else if (humanChoice === 'rock' && computerChoice === 'scissors' ||
        humanChoice === 'paper' && computerChoice === 'rock' ||
        humanChoice === 'scissors' && computerChoice === 'paper') {
        console.log(`You win! ${humanChoice} vs ${computerChoice}`);
        return "human";
    } else {
        console.log(`You lose :( ${humanChoice} vs ${computerChoice}`);
        return "computer";
    }
}

function playGame() {

    let humanScore = 0;
    let computerScore = 0;


    for (let i = 0; i < 5; i++) {
        let winner = playRound(getHumanChoice(), getComputerChoice());
        if (!winner) {
            continue;
        }
        if (winner === "human") {
            humanScore++;
        } else {
            computerScore++;
        }
    }

    console.log(`Score: you have ${humanScore} vs computer ${computerScore}`);
    if (humanScore > computerScore) {
        console.log('You win!');
    } else if (humanScore < computerScore) {
        console.log('The computer wins :(');
    } else {
        console.log('It\'s a draw.');
    }
}

playGame();

