const grid = document.querySelector('.grid');

for (i = 0; i < 256; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}

let mouseIsDown = false;
const squares = document.querySelectorAll('.square');

squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
        mouseIsDown = true;
        square.setAttribute('style', 'background-color: black;');
    });

    square.addEventListener('click', () => {
        square.setAttribute('style', 'background-color: black;');
    });


    square.addEventListener('mousemove', () => {
        if (mouseIsDown) {
            square.setAttribute('style', 'background-color: black;');
        }
    });
});

grid.addEventListener('mouseup', () => {
    mouseIsDown = false;
});

const body = document.querySelector('body');

grid.addEventListener('mouseleave', () => {
    mouseIsDown = false;
});