const grid = document.querySelector('.grid-container');

for (i = 0; i < 256; i++) {
    const square = document.createElement('div');
    square.setAttribute('style', 'flex: 1 1 auto; width: 40px; height: 40px; background-color: pink; border: 2px solid black;');
    grid.appendChild(square);
}

