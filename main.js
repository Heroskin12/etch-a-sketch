// Step 1: Set the variables.
let gridContainer = document.getElementById('grid_container'); // squares will be appended to this.
let erase = document.getElementById('erase');
let draw;

let userChoice = document.getElementById('user_choice'); // parent of input and error.
let matchSize = document.getElementById('match_size'); // span text will change with user input.
let userInput = document.getElementById('user_input');
let inputButton = document.getElementById('user_input_button');

// Create the error paragraph but don't append it.
let error = document.createElement('p');
error.innerText = "Error: Please enter a number between 2 and 100!";
error.style.color = 'red'; 
error.setAttribute('id', 'error');

let square = []; // individual square array.
let dimension; // contains height and width for each individual square.
let newSize; // contains new dimension of entire grid.
let totalSquares;

createGrid();

inputButton.addEventListener('click', function() {
    deleteGrid();
    createGrid();
    matchDim();
});

erase.addEventListener('click', function() {
    eraseAll();
})

// Function handles matching the span text.
function matchDim() {
    matchSize.innerHTML = userInput.value;
    if (userInput.value === "") {
        matchSize.innerHTML = "16";
        userInput.value = "16";
    };
    console.log(matchSize);
    };

// Function to create a grid based on userInput
function createGrid() {
    if (userInput.value === undefined || userInput.value === null || userInput.value === "") {
        console.log("input has no value");
        for (let i = 0; i < 256; i++) {
            square[i] = document.createElement('div');
            square[i].classList.add('square');
            dimension = 600 / 16;
            square[i].style.height = `${dimension}px`;
            square[i].style.width = `${dimension}px`;
            gridContainer.style.gridTemplateColumns = 'repeat(16, 1fr)';
            gridContainer.appendChild(square[i]);

            square[i].addEventListener('mouseover', function() {
                if(!draw) return;
                square[i].style.background = 'red';
            })

            square[i].addEventListener('mousedown', function() {
                square[i].style.background = 'red';
            })
        };
    }
    else if (userInput.value > 100 || userInput.value < 2) {
        console.log("invalid number");
        if (userChoice.querySelector('#error') === null) {
            userChoice.appendChild(error);            
        }

    }
    else {
        if (userChoice.querySelector('#error') !== null) {
            console.log("has child");
            userChoice.removeChild(error);
        }
    
        newSize = userInput.value;
        totalSquares = newSize*newSize;

        for (let i = 0; i < totalSquares; i++) {
            square[i] = document.createElement('div');
            square[i].classList.add('square');
            dimension = 600 / newSize;
            square[i].style.height = `${dimension}px`; 
            square[i].style.width = `${dimension}px`; 
            gridContainer.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
            gridContainer.appendChild(square[i]);

            square[i].addEventListener('mouseover', function() {
                if(!draw) return;
                square[i].style.background = 'red';
            })

            square[i].addEventListener('mousedown', function() {
                square[i].style.background = 'red';
            })
        };
}};

// Function to delete grid before creating a new one.
function deleteGrid() {
    let squares = gridContainer.querySelectorAll('.square');
    let i = 0;
    squares.forEach(function() {
        gridContainer.removeChild(square[i]);
        i++;
    });    
};

// Function to erase all squares.
function eraseAll() {
    let squares = gridContainer.querySelectorAll('.square');
    let i = 0;
    squares.forEach(function() {
        square[i].style.background = "#fff";
        i++;
    });   
};

// Function to draw.
window.addEventListener('mousedown', function() {
    draw = true;
});

window.addEventListener('mouseup', function() {
    draw = false;
});

document.body.onmousedown = (e) => {
    draw = true; 
    e.preventDefault();
  };
