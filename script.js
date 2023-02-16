// Set x and y axes
let x = 16;
let y = 16;

const grid = document.querySelector('.grid');

function generateGrid(x, y) {
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
}

generateGrid(x, y);


const cell = document.querySelectorAll('.y');

function draw(color) {
  cell.forEach(c => {
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

draw('red');