const DEFAULT_COLOR = "black-white";
const DEFAULT_GRIDSIZE = 50;
const MIN_GRIDSIZE = 1;
const MAX_GRIDSIZE = 100;
const OPACITY_INCREMENT = 0.1;

let currentGridSize = DEFAULT_GRIDSIZE;
let currentColor = DEFAULT_COLOR;

function setup() {
    const newDrawingButton = document.querySelector("#new-drawing-button")
    newDrawingButton.addEventListener("click", newDrawing);

    const resetButton = document.querySelector("#reset-button")
    resetButton.addEventListener("click", drawGrid);

    const colorButtons = document.querySelectorAll("[name=color-choice]");
    colorButtons.forEach(button => button.addEventListener("change", getColorChoice));

    drawGrid();
}

function newDrawing() {
    let gridSize;

    while (true) {
        gridSize = prompt(`Please enter a size between ${MIN_GRIDSIZE} and ${MAX_GRIDSIZE}`);

        if (gridSize === null) {
            gridSize = DEFAULT_GRIDSIZE;
            break
        }

        if (isNaN(gridSize)) {
            continue
        } else {
            gridSize = parseInt(gridSize);
            if (gridSize >= MIN_GRIDSIZE && gridSize <= MAX_GRIDSIZE) {
                break
            }
        }
    }
    currentGridSize = gridSize;
    getColorChoice()

    drawGrid();
}

function getColorChoice() {
    const colorChoice = document.querySelectorAll("[name=color-choice]");
    let color;
    for (const choice of colorChoice) {
        if (choice.checked) {
            color = choice.value;
            break;
        }
    }
    currentColor = color ? color : DEFAULT_COLOR;
    console.log(`Setting color to ${currentColor}`);
}

function hoverSquare(event) {
    if (event.target.className === "square") {
        colorSquare(event.target);
    }
}

function colorSquare(square) {
    const currentOpacity = parseFloat(window.getComputedStyle(square).opacity);
    if (currentOpacity < 1) {
        square.style.opacity = currentOpacity + OPACITY_INCREMENT;
    }

    if (currentColor === "random") {
        square.style.backgroundColor = getRandomColor();
    } else {
        square.style.backgroundColor = "black";
    }
}

function getRandomColor() {
    const red = Math.ceil(Math.random() * 255);
    const green = Math.ceil(Math.random() * 255);
    const blue = Math.ceil(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

function getSquareSize(grid, gridSize) {
    const re = /\d+/;
    const gridWidth = parseInt(window.getComputedStyle(grid).width.match(re)[0]);
    if (!gridWidth) {
        console.warn("Cannot read grid width");
        return;
    }

    return Math.floor(gridWidth / gridSize);
}

function cleanGrid() {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function drawGrid() {
    const gridContainer = document.querySelector(".grid-container");
    cleanGrid();

    setHover(gridContainer);

    const squareSize = getSquareSize(gridContainer, currentGridSize);
    console.log(squareSize);
    for (let i = 0; i < currentGridSize; i++) {
        for (let j = 0; j < currentGridSize; j++) {
            const div = document.createElement("div");
            div.className = "square";
            div.style.width = `${squareSize}px`;
            div.style.height = `${squareSize}px`;
            div.style.opacity = 0;
            gridContainer.appendChild(div);
        }
    }
}

function setHover(node) {
    node.addEventListener('mouseover', hoverSquare);
}

setup();
