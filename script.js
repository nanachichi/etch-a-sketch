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
  
    // To draw a cell
    c.addEventListener('mousedown', (e) => {
      // To prevent drawing if RMB
      if (e.buttons !== 2) {
        e.target.classList.remove('background');
        e.target.classList.add('foreground');
        e.target.style.backgroundColor = colorPicker.value;
        e.target.style.opacity = "1";
      // To erase a cell
      } else if (e.buttons === 2) {
        e.target.classList.remove('foreground');
        e.target.classList.add('background');
        e.target.style.backgroundColor = backgroundColor.value;
        e.target.style.opacity = "";
      }
    });
    c.addEventListener('mouseover', (e) => {
      // To draw when LMB is down and you're hovering the cell
      if (e.buttons === 1) {
        e.target.classList.remove('background');
        e.target.classList.add('foreground');
        e.target.style.backgroundColor = colorPicker.value;
        e.target.style.opacity = "1";
      // To show that a cell is being selected when hovered
      } else if (e.buttons === 0) {
        // To prevent it drawing over already drawn cell
        if (e.target.classList.contains('background')) {
          e.target.classList.add('hovered');
          e.target.style.backgroundColor = colorPicker.value;
          e.target.style.opacity = "0.5";
        }
        // To unselect the cell when unhovered
        c.addEventListener('mouseout', (e) => {
          // To prevent it clearing already drawn cell
          e.target.classList.remove('hovered');
          if (e.target.classList.contains('background')) {
            e.target.style.backgroundColor = backgroundColor.value;
            e.target.style.opacity = "";
          }
        });
      // To erase when RMB is down and you're hovering the cell
      } else if (e.buttons === 2) {
        e.target.classList.remove('foreground');
        e.target.classList.add('background');
        e.target.style.backgroundColor = backgroundColor.value;
        e.target.style.opacity = "";
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