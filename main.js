// Step 1: Set the variables.
let gridContainer = document.getElementById('grid_container'); // squares will be appended to this.

let userChoice = document.getElementById('user_choice'); // parent of input and error.
let matchSize = document.getElementById('match_size'); // span text will change with user input.
let userInput = document.getElementById('user_input');
let inputButton = document.getElementById('user_input_button');

// Create the error paragraph but don't append it.
let error = document.createElement('p');
error.innerText = "Error: Please enter a number between 2 and 100!";
error.setAttribute('style', 'color: red;'); 
error.setAttribute('id', 'error');

let square = []; // individual square array.
let dimension; // contains height and width for each individual square.
let newSize; // contains new dimension of entire grid.


inputButton.addEventListener('click', function() {
    createGrid();
    matchDim();
});

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
        for (let i = 0; i < 256; i++) {
            square[i] = document.createElement('div');
            square[i].classList.add('square');
            dimension = 600 / 16;
            square[i].setAttribute('style', `height: ${dimension}px; width: ${dimension}px;`);
            gridContainer.appendChild(square[i]);
        };
    }
    else if (userInput.value > 100 || userInput.value < 2) {
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
        console.log(newSize);
}};
