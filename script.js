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

let colorPickerValue;

colorPicker.value = defaultBrushColor;
colorPickerValue = colorPicker.value;
backgroundColor.value = defaultBackgroundColor;


function fillBox(e, colorPickerValue) {
  e.target.classList.remove('background');
  e.target.classList.add('foreground');
  e.target.style.backgroundColor = colorPickerValue;
  e.target.style.opacity = "1";
}


function clearBox(e) {
  e.target.classList.remove('foreground');
  e.target.classList.add('background');
  e.target.style.backgroundColor = backgroundColor.value;
  e.target.style.opacity = "";
}


function hoverBox(e, colorPickerValue) {
  if (e.target.classList.contains('background')) { // Don't draw on a foreground (drawn) cell
    e.target.classList.add('hovered');
    e.target.style.backgroundColor = colorPickerValue;
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


function eyedropBox(e) {
  let rgb = e.target.style.backgroundColor;
  let hex = convertToHex(rgb);
  colorPicker.value = hex;
  colorPickerValue = colorPicker.value;
  eyedropperBtn.classList.toggle('active');
  currentState = "drawing";
}


function shadeBox(rgb) {
  let rgbSliced = rgb.slice(4, rgb.length - 1);
  let rgbSplit = rgbSliced.split(', ');
  let newRgb = rgbSplit.map(part => {
    if (Number(shaderSlider.value) < 0) {
      return Number(part) + 255 / 100 * Math.abs(shaderSlider.value); // lighten
    } else if (Number(shaderSlider.value) > 0) {
      return part - 255 / 100 * shaderSlider.value; // darken
    }
  });
  return 'rgb(' + newRgb.join(', ') + ')';
}


function randomColorValue() {
  let rgb = randomRgb();
  let hex = convertToHex(rgb);
  colorPicker.value = hex;
  return colorPicker.value;
}


function convertToHex(rgb) {
  let rgbSliced = rgb.slice(4, rgb.length - 1);
  let rgbSplit = rgbSliced.split(', ');
  let rgbHexed = rgbSplit.map(x => Number(x).toString(16));
  let newRgbHexed = rgbHexed.map(part => {
    if (part.length === 1) {
      return part = "0" + part;
    } else {
      return part;
    }
  });
  return '#' + newRgbHexed.join('');
}


function randomRgb() {
  let rgbArr = [];
  for (let i = 0; i < 3; i++) {
    let rgbValue = Math.floor(Math.random() * 256);
    rgbArr.push(rgbValue);
  }
  return 'rgb(' + rgbArr.join(', ') + ')';
}


let currentState = "drawing";
function draw() {

  colorPicker.addEventListener("input", (e) => {
    colorPicker.value = e.target.value;
    colorPickerValue = colorPicker.value;
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
          colorPickerValue = colorPicker.value;
          fillBox(e, colorPickerValue);
        // To erase a cell
        } else if (e.buttons === 2) {
          clearBox(e);
        }
      } else if (currentState === "randomColor") {
        // Draw when LMB is down
        if (e.buttons === 1) {
          colorPickerValue = randomColorValue();
          fillBox(e, colorPickerValue);
        // To erase a cell
        } else if (e.buttons === 2) {
          clearBox(e);
        }
      } else if (currentState === "erasing") {
        clearBox(e);
      } else if (currentState === "eyedropping") {
        eyedropBox(e);
      } else if (currentState === "shading") {
        colorPickerValue = shadeBox(e.target.style.backgroundColor);
        fillBox(e, colorPickerValue);
      }
    });
    c.addEventListener('mouseover', (e) => {
      if (currentState === "drawing") {
        // Draw when LMB is down
        if (e.buttons === 1) {
          colorPickerValue = colorPicker.value;
          fillBox(e, colorPickerValue);
        // Hovering
        } else if (e.buttons === 0) {
          colorPickerValue = colorPicker.value;
          hoverBox(e, colorPickerValue);
          // Unhovering
          c.addEventListener('mouseout', (e) => {
            unhoverBox(e);
          });
        // Erase when RMB is down
        } else if (e.buttons === 2) {
          clearBox(e);
        }
      } else if (currentState === "randomColor") {
        // Draw when LMB is down
        if (e.buttons === 1) {
          colorPickerValue = randomColorValue();
          fillBox(e, colorPickerValue);
        // Hovering
        } else if (e.buttons === 0) {
          colorPickerValue = colorPicker.value;
          hoverBox(e, colorPickerValue);
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
      } else if (currentState === "shading") {
        if (e.buttons === 1) {
          colorPickerValue = shadeBox(e.target.style.backgroundColor);
          fillBox(e, colorPickerValue);
        }
      }
    });
  });
}

draw();


const gridValue = document.getElementById('grid-value');
const gridSlider = document.getElementById('grid-slider');

gridValue.innerHTML = `${gridSlider.value}x${gridSlider.value}`;

gridSlider.addEventListener("input", (e) => { 
  gridValue.innerHTML = `${e.target.value}x${e.target.value}`;
});


function generateNewGrid() {
  let value = Number(gridSlider.value);
  generateGrid(value, value);

  grid.style.borderRight = "none";
  grid.style.borderBottom = "none";

  draw(colorPicker.value);
}


function toggleGrid() {
  const cells = document.querySelectorAll('.y');
  cells.forEach(c => {
    if (c.style.border === "0px none") {
      grid.style.borderRight = "none";
      grid.style.borderBottom = "none";
      c.style.borderRight = "1px solid #aaaaaa";
      c.style.borderBottom = "1px solid #aaaaaa";
    } else {
      c.style.border = "0 none";
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


const eraserBtn = document.getElementById('eraser');

function erase() {
  eraserBtn.classList.toggle('active');
  if (eraserBtn.classList.contains('active')) {
    currentState = "erasing";
  } else {
    currentState = "drawing";
  }
}


const eyedropperBtn = document.getElementById('eyedropper');

function eyedrop() {
  eyedropperBtn.classList.toggle('active');
  if (eyedropperBtn.classList.contains('active')) {
    currentState = "eyedropping";
  } else {
    currentState = "drawing";
  }
}


const randomColorBtn = document.getElementById('random');

function random() {
  randomColorBtn.classList.toggle('active');
  if (randomColorBtn.classList.contains('active')) {
    currentState = "randomColor";
  } else {
    currentState = "drawing";
  }
}


const shaderBtn = document.getElementById('shader');
const colorsDiv = document.querySelector('.colors');
const shaderDiv = document.querySelector('.shader');

function shade() {
  shaderBtn.classList.toggle('active');
  if (shaderBtn.classList.contains('active')) {
    colorsDiv.style.display = "none";
    shaderDiv.style.display = "flex";
    currentState = "shading";
  } else {
    colorsDiv.style.display = "flex";
    shaderDiv.style.display = "none";
    currentState = "drawing";
  }
}

const shaderSlider = document.getElementById('shader-slider');
const shaderValue = document.getElementById('shader-value');
shaderSlider.addEventListener("input", (event) => {
  if (Number(shaderSlider.value) < 0) {
    shaderValue.innerHTML = `${Math.abs(event.target.value)}%`;
  } else if (Number(shaderSlider.value) >= 0) {
    shaderValue.innerHTML = `${event.target.value}%`;
  }
});