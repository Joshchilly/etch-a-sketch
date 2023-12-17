const body = document.querySelector('body');
const grid = document.querySelector('.grid');
const buttons = document.querySelectorAll('button');
const smallButton = document.querySelector('.small');
const mediumButton = document.querySelector('.medium');
const bigButton = document.querySelector('.big');
const inputBox = document.querySelector('#custom-size-input');
const updateButton = document.querySelector('.update');
const classicButton = document.querySelector('.classic');
const randomButton = document.querySelector('.random');
const rainbowButton = document.querySelector('.rainbow');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');
let mouseIsDown = false, inputBoxClicked = false, classicOn = true, randomOn = false, rainbowOn = false, eraserOn = false;
let squares = null, randomColor = null, rainbowColor = null, currentTimeout = null;
let small = 4, medium = 16, big = 256;

buildGrid(medium);

function buildGrid(squaresPerSide) {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    /* 650px is grid width/height, dividing by squaresPerSide and setting the result to width/height of each square
       makes sure that the grid is entirely and exactly filed up by all the squares */
    let newWidthAndHeight = 650 / squaresPerSide;
    for (i = 0; i < (squaresPerSide ** 2); i++) {
        const square = document.createElement('div');
        square.style.width = `${newWidthAndHeight}px`;
        square.style.height = `${newWidthAndHeight}px`;
        square.classList.add('square');
        grid.appendChild(square);
    }

    configureGrid();
}

function configureGrid() {
    squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            mouseIsDown = true;
            eraserOn == false ? ink(square) : square.style.backgroundColor = '#D8D8D8';
        });

        square.addEventListener('mousemove', () => {
            if (mouseIsDown) {
                eraserOn == false ? ink(square) : square.style.backgroundColor = '#D8D8D8';
            }
        });
    });
}

function ink(square) {
    if (rainbowOn) {
        const styles = window.getComputedStyle(square);
        if (styles.getPropertyValue('background-color') == 'rgb(216, 216, 216)') {
            rainbowColor = Math.floor(Math.random() * 16777215).toString(16);
            square.style.backgroundColor = `#${rainbowColor}`;
        }

        return;
    }

    square.style.backgroundColor = (randomOn == true) ? `#${randomColor}` : 'rgb(85, 82, 82)';
}

grid.addEventListener('mouseup', () => {
    mouseIsDown = false;
});

grid.addEventListener('mouseleave', () => {
    mouseIsDown = false;
});

buttons.forEach((button) => {
    button.addEventListener('mousedown', (e) => {
        e.target.style.cssText = 'background: #999;';
    });

    button.addEventListener('mouseup', (e) => {
        e.target.setAttribute('style', 'background-color: #ffffea;');
    });

    button.addEventListener('mouseleave', (e) => {
        e.target.style.cssText = 'background-color: #ffffea;';
    });
});

smallButton.addEventListener('click', () => {
    clearButton.click();
    buildGrid(8);
});

mediumButton.addEventListener('click', () => {
    clearButton.click();
    buildGrid(40);
});

bigButton.addEventListener('click', () => {
    clearButton.click();
    buildGrid(95);
});

inputBox.addEventListener('click', (e) => {
    if (inputBoxClicked) {
        return;
    }

    e.target.value = "";
    inputBoxClicked = true;
    clearTimeout(currentTimeout);
});

updateButton.addEventListener('click', () => {
    inputBoxClicked = false;
    currentInput = inputBox.value;
    if (isNaN(currentInput) || !Number.isInteger(+currentInput) || (currentInput < 1 || currentInput > 100)) {
        if (currentInput == "" || inputBox.value == "enter number from 1-100") {
            inputBox.value = "no number entered";
        } else {
            inputBox.value = "invalid input";
        }

        currentTimeout = window.setTimeout(fillDefaultInput, 1750);
        return;
    }

    clearButton.click();
    buildGrid(currentInput);
});

function fillDefaultInput() {
    inputBox.value = "enter number from 1-100";
}

classicButton.addEventListener('click', (e) => {
    if (!classicOn) {
        clearButton.click();
    }

    randomOn = false, rainbowOn = false, classicOn = true;
});

randomButton.addEventListener('click', (e) => {
    if (!randomOn) {
        clearButton.click();
    }

    classicOn = false, rainbowOn = false, randomOn = true;
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.cssText = `background-color: ${randomColor}`;
});

rainbowButton.addEventListener('click', () => {
    if (!rainbowOn) {
        clearButton.click();
    }

    classicOn = false, randomOn = false, rainbowOn = true;
});

eraserButton.addEventListener('click', (e) => {
    if (eraserOn) {
        e.target.textContent = 'Eraser';
        eraserOn = false;
    } else {
        e.target.textContent = 'Pen';
        eraserOn = true;
    }
});

clearButton.addEventListener('click', () => {
    squares.forEach((square) => {
        square.style.backgroundColor = '#D8D8D8';
    });

    eraserOn = false, inputBoxClicked = false;
    inputBox.value = "enter number from 1-100";
    eraserButton.textContent = 'Eraser';
});