// Error Check Functions.
// Grid Changes According to Size (without an array).

//Gloabl Scope Variables
let newSize = document.getElementById('user_input');
let sizeButton = document.getElementById('user_input_button');
let grid = document.getElementById('grid_container');
let size;
let sizePar = document.getElementById('user_choice');
let error;
let eraseAllBtn = document.getElementById('eraseAll');
let draw;
let backgroundColor = document.getElementById('background_color');

// Call drawGrid function to initialise default 16x16 grid.
drawGrid(16);

// Function changes grid size when user defines it.
sizeButton.addEventListener('click', function() {
    size = newSize.value;
    drawGrid(size);
});

// To erase all squares.
eraseAllBtn.addEventListener('click', function() {
    clear();
})

// To draw on click and drag.
window.addEventListener('mousedown', function() {
    draw = true;
});

window.addEventListener('mouseup', function() {
    draw = false;
});

grid.onmousedown = (e) => {
    draw = true; 
    e.preventDefault();
};

// Change Background Color
backgroundColor.addEventListener('input', function() {
    changeBackgroundColor();
});


// Change Background Color
function changeBackgroundColor() {
    let body = document.body;
    body.style.setProperty('--background-color', `${backgroundColor.value}`);
};

// Function to erase all squares.
function clear() {
    let squares = grid.querySelectorAll('div');
    squares.forEach((div) => div.style.backgroundColor = 'var(--background-color)');
    };  


// Function for drawing grid.
function drawGrid(size) {
    // Remove any pre-exisiting squares.
    let squares = grid.querySelectorAll('div');
    squares.forEach((div) => div.remove());

    if (size > 1 && size < 101) {
        // Remove pre-existing error paragraph.
        if (sizePar.querySelector('#error') !== null) {
            sizePar.removeChild(error);
        }
        // Create new grid.
        for (let i = 0; i < size * size; i++) {
            let square = document.createElement('div');
            square.classList.add('.square');
            let dimensions = 600 / size;
            square.style.backgroundColor = 'var(--background-color)';
            square.style.height = `${dimensions}px`;
            square.style.width = `${dimensions}px`;
            square.style.border = '1px solid black';
            grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            grid.appendChild(square);        

            // Add Drawing Event Listeners
            square.addEventListener('mouseover', function() {
                if (draw === true) {
                    square.style.background = 'var(--brush-color)';
                }
            });

            square.addEventListener('mousedown', function() {
                if (draw === true) {
                    square.style.background = 'var(--brush-color)';
                }
            });
        }
    }
    else {
        drawGrid(16);
        error = document.createElement('p');
        error.innerText = "Invalid size. 2 - 100 only.";
        error.setAttribute('id', 'error');
        error.style.color = 'red';
        sizePar.appendChild(error);
    };
};