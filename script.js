// Set x and y axes
let x = 16;
let y = 16;

const grid = document.querySelector('.grid');

function generateGrid(x, y) {
  grid.innerHTML = "";
  for (let i = 0; i < x; i++) {
    const xDiv = document.createElement('div');
    xDiv.classList.add('x');
    grid.appendChild(xDiv);
    for (let j = 0; j < y; j++) {
      const yDiv = document.createElement('div');
      yDiv.classList.add('y');
      yDiv.classList.add('background');
      xDiv.appendChild(yDiv);
    }
  }
}

generateGrid(x, y);

const colorPicker = document.getElementById('color-picker');
const backgroundColor = document.getElementById('background-color');

const defaultBrushColor = '#000000';
const defaultBackgroundColor = '#ffffff';

colorPicker.value = defaultBrushColor;
backgroundColor.value = defaultBackgroundColor;


function fillBox(e) {
  e.target.classList.remove('background');
  e.target.classList.add('foreground');
  e.target.style.backgroundColor = colorPicker.value;
  e.target.style.opacity = "1";
}

function clearBox(e) {
  e.target.classList.remove('foreground');
  e.target.classList.add('background');
  e.target.style.backgroundColor = backgroundColor.value;
  e.target.style.opacity = "";
}

function hoverBox(e) {
  if (e.target.classList.contains('background')) { // Don't draw on a foreground (drawn) cell
    e.target.classList.add('hovered');
    e.target.style.backgroundColor = colorPicker.value;
    e.target.style.opacity = "0.5";
  }
}

function unhoverBox(e) {
  if (e.target.classList.contains('background')) { // Don't clear a foreground (drawn) cell
    e.target.classList.remove('hovered');
    e.target.style.backgroundColor = backgroundColor.value;
    e.target.style.opacity = "";
  }
}


let currentState = "drawing";


function draw() {

  colorPicker.addEventListener("input", (e) => {
    colorPicker.value = e.target.value;
  });

  const cells = document.querySelectorAll('.y');
  cells.forEach(c => {
    if (c.classList.contains('background')) {
      c.style.backgroundColor = backgroundColor.value;
    }
    backgroundColor.addEventListener("input", () => {
      if (c.classList.contains('background')) {
        c.style.backgroundColor = backgroundColor.value;
      }
    });

    c.addEventListener('mousedown', (e) => {
      if (currentState === "drawing") {
        // Draw when LMB is down
        if (e.buttons === 1) {
          fillBox(e);
        // To erase a cell
        } else if (e.buttons === 2) {
          clearBox(e);
        }

      } else if (currentState === "erasing") {
        clearBox(e);
      }
    });
    c.addEventListener('mouseover', (e) => {
      if (currentState === "drawing") {
        // Draw when LMB is down
        if (e.buttons === 1) {
          fillBox(e);

        // Hovering
        } else if (e.buttons === 0) {
          hoverBox(e);
          // Unhovering
          c.addEventListener('mouseout', (e) => {
            unhoverBox(e);
          });

        // Erase when RMB is down
        } else if (e.buttons === 2) {
          clearBox(e);
        }

      } else if (currentState === "erasing") {
        if (e.buttons === 1) {
          clearBox(e);
        }
      }
    });
  });
}

draw();


const output = document.getElementById('value');
const slider = document.getElementById('myRange');

output.innerHTML = `${slider.value}x${slider.value}`;

slider.addEventListener("input", (e) => { 
  output.innerHTML = `${e.target.value}x${e.target.value}`;
});


function generateNewGrid() {
  let value = Number(slider.value);
  generateGrid(value, value);

  grid.style.borderRight = "none";
  grid.style.borderBottom = "none";

  draw(colorPicker.value);
}


function toggleGrid() {
  const cells = document.querySelectorAll('.y');
  cells.forEach(c => {
    if (c.style.border === "none") {
      grid.style.borderRight = "none";
      grid.style.borderBottom = "none";
      c.style.borderRight = "1px solid #aaaaaa";
      c.style.borderBottom = "1px solid #aaaaaa";
    } else {
      c.style.border = "none";
      grid.style.borderRight = "1px solid #aaaaaa";
      grid.style.borderBottom = "1px solid #aaaaaa";
    }
  });
}


function clearGrid() {
  const cells = document.querySelectorAll('.y');
  cells.forEach(c => {
    if (c.classList.contains('foreground')) {
      c.classList.remove('foreground');
      c.classList.add('background');
    }
    c.style.backgroundColor = backgroundColor.value;
    c.style.opacity = "";
  });
}

const eraser = document.getElementById('eraser');

function erase() {
  eraser.classList.toggle('active');
  if (eraser.classList.contains('active')) {
    currentState = "erasing";
  } else {
    currentState = "drawing";
  }
}