const DEFAULT_COLOR = "black-white";
const DEFAULT_GRIDSIZE = 50;
const MIN_GRIDSIZE = 100;
const MAX_GRIDSIZE = 100;
const OPACITY_INCREMENT = 0.1;

function setup() {
    const newDrawingButton = document.querySelector("#new-drawing-button")
    newDrawingButton.addEventListener("click", newDrawing);
    drawGrid(DEFAULT_GRIDSIZE, DEFAULT_COLOR);
}

function newDrawing() {
    let gridSize = parseInt(prompt("Enter new drawing size (default = 50x50):"));
    while (gridSize < MIN_GRIDSIZE || gridSize > MAX_GRIDSIZE) {
        if (gridSize === null || isNaN(gridSize)) {
            gridSize = DEFAULT_GRIDSIZE;
        } else {
            gridSize = parseInt(prompt("Grid size must be between 1 and 100. \nEnter drawing size (x by x):"));
        }
    }

    drawGrid(gridSize, getColorChoice());
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
    return color ? color : DEFAULT_COLOR;
}

function hoverSquare(event) {
    if (event.target.className === "square") {
        console.log(`square ${event.target.dataset.coordinate}`);
        colorSquare(event.target);
    }
}

function colorSquare(square) {
    const currentOpacity = parseFloat(window.getComputedStyle(square).opacity);
    console.log("Current opacity", currentOpacity);
    if (currentOpacity < 1) {
        square.style.opacity = currentOpacity + OPACITY_INCREMENT;
    }

    const gridContainer = document.querySelector(".grid-container");
    if (gridContainer.dataset.drawingColor === "random") {
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

function cleanGrid(gridContainer) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function drawGrid(gridSize, drawingColor) {
    const gridContainer = document.querySelector(".grid-container");
    cleanGrid(gridContainer);

    setHover(gridContainer);
    gridContainer.dataset.drawingColor = drawingColor;

    const squareSize = getSquareSize(gridContainer, gridSize);
    console.log(squareSize);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const div = document.createElement("div");
            div.className = "square";
            div.dataset.coordinate = [i, j];
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
