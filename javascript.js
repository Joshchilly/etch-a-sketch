const body = document.querySelector('body');
const grid = document.querySelector('.grid');
const eraser = document.querySelector('.eraser');
const buttons = document.querySelectorAll('button');
const classicButton = document.querySelector('.classic');
const randomButton = document.querySelector('.random');
const rainbowButton = document.querySelector('.rainbow');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');
let mouseIsDown = false, eraserOn = false, classicOn = true, randomOn = false, rainbowOn = false;
let randomColor = null, rainbowColor = null;

for (i = 0; i < 256; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}

const squares = document.querySelectorAll('.square');

squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
        mouseIsDown = true;
        eraserOn == false ? ink(square) : square.setAttribute('style', 'background-color: #D8D8D8;');
    });

    square.addEventListener('mousemove', () => {
        if (mouseIsDown) {
            eraserOn == false ? ink(square) : square.setAttribute('style', 'background-color: #D8D8D8;');
        }
    });
});

function ink(square) {
    if (rainbowOn) {
        const styles = window.getComputedStyle(square);
        if (styles.getPropertyValue('background-color') == 'rgb(216, 216, 216)') {
            rainbowColor = Math.floor(Math.random() * 16777215).toString(16);
            square.style.cssText = `background-color: #${rainbowColor};`;
        }

        return;
    }

    square.style.cssText = (randomOn == true) ? `background-color: #${randomColor};` : 'background-color: rgb(85, 82, 82);';
}

grid.addEventListener('mouseup', () => {
    mouseIsDown = false;
});

grid.addEventListener('mouseleave', () => {
    mouseIsDown = false;
});

eraser.addEventListener('click', (e) => {
    if (eraserOn) {
        e.target.textContent = 'Eraser';
        eraserOn = false;
    } else {
        e.target.textContent = 'Pen';
        eraserOn = true;
    }
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

clearButton.addEventListener('click', () => {
    squares.forEach((square) => {
        square.setAttribute('style', 'background-color: #D8D8D8;')
    });

    eraserOn = false;
    eraserButton.textContent = 'Eraser';
});

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