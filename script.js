// Set x and y axes
let x = 16;
let y = 16;

const grid = document.querySelector('.grid');

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