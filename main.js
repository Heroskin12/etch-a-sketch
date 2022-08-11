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
let erase;
let challenge = false;
let paintClick = false;
let eraseClick = false;
let backgroundColor = document.getElementById('background_color');
let brushColor = document.getElementById('brush_color');
let opacity = document.getElementById('myRange');
let drawIcon = document.getElementById('draw_icon');
let eraseIcon = document.getElementById('erase_icon');
let challengeBtn = document.getElementById('challengeBtn');
let challengeButton = document.querySelector('.challengeButton');
let masterGrid = document.getElementById('master_grid');
let sideBarBtn = document.querySelector('.sideBarBtn');


drawIcon.addEventListener('click', function() {
    if (sideBarBtn.disabled === false) drawIcon.classList.toggle('icon_highlight');
    if (drawIcon.classList.contains('icon_highlight') && sideBarBtn.disabled === false) {
        eraseIcon.classList.remove('icon_highlight');
        eraseAllBtn.classList.remove('icon_highlight');
        challengeBtn.classList.remove('icon_highlight');
        paintClick = true;
        eraseClick = false;
        challenge = false;
    }
    else {
        paintClick = false;
    }
});

eraseIcon.addEventListener('click', function() {
    if (sideBarBtn.disabled === false) eraseIcon.classList.toggle('icon_highlight');
    if (eraseIcon.classList.contains('icon_highlight') && sideBarBtn.disabled === false) {
        drawIcon.classList.remove('icon_highlight');
        eraseAllBtn.classList.remove('icon_highlight');
        challengeBtn.classList.remove('icon_highlight');
        eraseClick = true;
        paintClick = false;
        challenge = false;
    }
    else {
        eraseClick = false;
    }
});

eraseAllBtn.addEventListener('click', function() {
    if (sideBarBtn.disabled === false) eraseAllBtn.classList.toggle('icon_highlight');

    if (eraseAllBtn.classList.contains('icon_highlight') && sideBarBtn.disabled === false) {
        drawIcon.classList.remove('icon_highlight');
        eraseIcon.classList.remove('icon_highlight');
        challengeBtn.classList.remove('icon_highlight');
        paintClick = false;
        eraseClick = false;
        challenge = false;
    };
});

challengeBtn.addEventListener('click', function() {
    challengeBtn.classList.toggle('icon_highlight');
    if (challengeBtn.classList.contains('icon_highlight') && sideBarBtn.disabled === false) {
        drawIcon.classList.remove('icon_highlight');
        eraseAllBtn.classList.remove('icon_highlight');
        eraseIcon.classList.remove('icon_highlight');
        challenge = true;
        eraseClick = false;
        paintClick = false;
        sideBarBtn.disabled = true;
        challengeButton.disabled = false;
    }
    else {
        challenge = false;
        sideBarBtn.disabled = false;
        clearInterval(interval);
        tens = "00";
        mins = "00";
        secs = "00";
        tenths.innerText = tens;
        seconds.innerText = secs + " " + ":";
        minutes.innerText = mins + " " + ":";
        challengeButton.disabled = false;        
    };
});

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
    if (paintClick === true) {
        draw = true;
    }
    else if (eraseClick === true) {
        erase = true;
    }
});



window.addEventListener('mouseup', function() {
    draw = false;
    erase = false;
});

grid.onmousedown = (e) => {
    if (paintClick === true) {
        draw = true; 
        e.preventDefault();
    }
    else if (eraseClick === true) {
        erase = true;
        e.preventDefault();
    }
};

// Change Background Color
backgroundColor.addEventListener('input', function() {
    changeBackgroundColor();
});

// Timer
const timeDiv = document.getElementById("watch");
const timer = document.querySelector('.timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let tenths = document.getElementById('tenths');

let mins = 00;
let secs = 00;
let tens = 00;
let interval; //store timer values

challengeBtn.addEventListener('click', function() {
    timeDiv.classList.toggle('off');
    if (!timeDiv.classList.contains('off')) {
        drawGrid(30);
        masterGrid.style.height = '1000px';

    }
    else {
        drawGrid(16);
        masterGrid.style.height = '800px';
    }
})

function startTimer() {
    tens++;

    if (tens < 9) tenths.innerText = " " + "0" + tens;
    if (tens > 9) tenths.innerText = tens;
    if (tens > 99) {
        secs++;
        seconds.innerText = " " + "0" + secs + " " + ":";
        tens = 0;
        tenths.innerText = " " + "0" + tens;
    }
    if (secs > 9) seconds.innerText = secs + " " + ":";
    if (secs > 59) {
        mins++; 
        minutes.innerText = "0" + mins + " " + ":";
        secs = 0;
        seconds.innerText = " " + "0" + secs + " " + ":";
    }
}

start.addEventListener('click', function() {
    interval = setInterval(startTimer, 10);
    paintClick = true;
    sideBarBtn.disabled = true;
});

stop.addEventListener('click', function() {
    clearInterval(interval);
    paintClick = false;
    sideBarBtn.disabled = false;
})

reset.addEventListener('click', function() {
    clearInterval(interval);
    tens = "00";
    mins = "00";
    secs = "00";
    tenths.innerText = tens;
    seconds.innerText = secs + " " + ":";
    minutes.innerText = mins + " " + ":";
})



// All code below is function definitions.

// Change Background Color
function changeBackgroundColor() {
    let body = document.body;
    body.style.setProperty('--background-color', `${backgroundColor.value}`);
};

// Function to erase all squares.
function clear() {
    let squares = grid.querySelectorAll('div');
    squares.forEach((div) => div.style.backgroundColor = 'var(--background-color)');
    squares.forEach((div) => div.style.opacity = '1');
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
                if (paintClick === true) {
                    if (draw === true) {
                        square.style.background = brushColor.value; 
                        square.style.opacity = (opacity.value/100);
                    }
                }
                else if (eraseClick === true && erase === true) {
                    square.style.background = 'var(--background-color)';
                    square.style.opacity = '1';
                }
            });

            square.addEventListener('mousedown', function() {  
                    if (paintClick === true) {
                        square.style.background = brushColor.value; 
                        square.style.opacity = (opacity.value / 100);
                    } 
                    else if (eraseClick === true) {
                        square.style.background = 'var(--background-color)';
                    }
            });
        };
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