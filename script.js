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
      xDiv.appendChild(yDiv);
    }
  }
  draw('red');
}

generateGrid(x, y);


function draw(color) {
  const cells = document.querySelectorAll('.y');
  cells.forEach(c => {
    // To draw on the first hovered cell because mouseover triggers on e.buttons === 0
    c.addEventListener('mousedown', (e) => {
      // To prevent drawing if RMB
      if (e.buttons !== 2) {
        e.target.style.backgroundColor = color;
        e.target.style.opacity = "1";
      // To clear on the first hovered cell
      } else if (e.buttons === 2) {
        e.target.style.backgroundColor = "";
        e.target.style.opacity = "";
      }
    });
    c.addEventListener('mouseover', (e) => {
      // To draw when LMB is down and you're hovering the cell
      if (e.buttons === 1) {
        e.target.style.backgroundColor = color;
        e.target.style.opacity = "1";
      // To show that a cell is being selected
      } else if (e.buttons === 0) {
        // To prevent it drawing over already drawn cell
        if (e.target.style.opacity !== "1") {
          e.target.style.backgroundColor = color;
          e.target.style.opacity = "0.25";
        }
        // To unselect the cell
        c.addEventListener('mouseout', (e) => {
          // To prevent it clearing already drawn cell
          if (e.target.style.opacity !== "1") {
            e.target.style.backgroundColor = "";
            e.target.style.opacity = "";
          }
        });
      // To clear when RMB is down and you're hovering the cell
      } else if (e.buttons === 2) {
        e.target.style.backgroundColor = "";
        e.target.style.opacity = "";
      }
    });
  });
}

const inputBox = document.querySelector('.input');

function generateNewGrid() {
  let value = Number(inputBox.value);
  if (isNaN(value) || value < 1 || value > 100) {
    console.log("You should type a number between 1 and 100.")
  } else {
    generateGrid(value, value);
  }
  inputBox.value = "";

  grid.style.borderRight = "none";
  grid.style.borderBottom = "none";
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