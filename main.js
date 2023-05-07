// Global Variables
var paletteBtn = document.querySelector('#newPaletteBtn');
var boxContainer = document.querySelector('.box-container');
var savePaletteBtn = document.querySelector('#savePaletteBtn');
var savedPalettesContainer = document.querySelector('#saved-palettes');
var savedSectionMsg = document.querySelector('h4');
var savedContainer = document.querySelector('#saved-container');
var hexOptions = 'ABCDEF0123456789'.split('');
var currentColorPalette = [];
var savedPalettes = [];
var title = document.querySelector('h1');
var main = document.querySelector('.main-container');

// Event Listeners
window.addEventListener('load', loadPage);
paletteBtn.addEventListener('click', displayPalette);
boxContainer.addEventListener('click', toggleLock);
savePaletteBtn.addEventListener('click', savePalettes);
savedPalettesContainer.addEventListener('click', changeSavedDisplay);
savedContainer.addEventListener('click', editPalette);
main.addEventListener('mouseover', changeTitleColor);

// Event Handlers
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createHexCode() {
  var hexChars = [];
  for (var i = 0; i < 6; i++) {
    hexChars.push(hexOptions[getRandomIndex(hexOptions)]);
  }
  var hexCode = hexChars.join('');
  return {
    locked: false,
    code: `#${hexCode}`
  };
}

function loadPalette() {
  var newPalette = [];
  for (var i = 0; i < 5; i++) {
    newPalette.push(createHexCode());
  }
  currentColorPalette = newPalette;
}

function getNewPalette() {
  currentColorPalette.forEach((color, i) => {
    if (!color.locked) currentColorPalette.splice(i, 1, createHexCode());
  });
}

function changeHexCodes() {
  var hexCodes = document.querySelectorAll('h2');
  hexCodes.forEach((code, i) => {
    code.innerText = currentColorPalette[i].code;
  });
}

function changeColorBoxes() {
  var colorBoxes = document.querySelectorAll('.color-box');
  colorBoxes.forEach((box, i) => {
    box.style.background = currentColorPalette[i].code;
  });
}

function show(el) {
  el.classList.remove('hidden');
}
function hide(el) {
  el.classList.add('hidden');
}

function changeLocks() {
  currentColorPalette.forEach((color, i) => {
    if (color.locked) {
      show(document.getElementById(`lock${i}`));
      hide(document.getElementById(`unlock${i}`));
    } else {
      hide(document.getElementById(`lock${i}`));
      show(document.getElementById(`unlock${i}`));
    }});
}

function toggleLock(e) {
  currentColorPalette.forEach((color, i) => {
    if (e.target.parentNode.id === `box${i}`) {
        color.locked = !color.locked;
        document.getElementById(`lock${i}`).classList.toggle('hidden');
        document.getElementById(`unlock${i}`).classList.toggle('hidden');
      }
  })
}

function displayPalette() {
  getNewPalette();
  changeHexCodes();
  changeColorBoxes();
}

function loadPage() {
  loadPalette();
  changeHexCodes();
  changeColorBoxes();
}

function savePalettes() {
  let currentCopy = currentColorPalette.map((color) => ({...color}));
  savedPalettes.push(currentCopy);
  displaySavedPalettes();
  displayPalette();
}


function displaySavedPalettes() {
  savedSectionMsg.classList.add('hidden');
  savedPalettesContainer.innerHTML = '';
  savedPalettes.forEach((palette, i) => {
    savedPalettesContainer.innerHTML += `
      <section class="mini-container" id="${i}">
        <img class="delete" data-index-number="${i}" src="./icons/delete.png">
      </section>`;
    addMiniPalettes(palette, i);
  });
}
  
function addMiniPalettes(palette, index) {
  palette.forEach(color => savedPalettesContainer.children[index].innerHTML += `<section class="mini-palette" style="background:${color.code}"></section>`);
}

function deletePalette(e) {
  if (e.target.className === 'delete') {
    savedPalettes.splice(e.target.dataset.indexNumber, 1);
  }
}

function showMessage() {
  if (savedPalettesContainer.innerHTML === '') {
    savedPalettesContainer.innerHTML = `<h4>No saved palettes yet!</h4>`;
  }
}

function changeSavedDisplay(e) {
  deletePalette(e);
  displaySavedPalettes();
  showMessage();
}

function editPalette(e) {
  savedPalettes.forEach((palette, i) => {
    if (e.target.parentNode.id === `${i}` && e.target.className !== 'delete') {
        updateCurrentPalette(palette);
        changeHexCodes();
        changeColorBoxes();
        changeLocks();
      }
  })
}

function updateCurrentPalette(palette) {
    let paletteCopy = palette.map((color) => ({...color}))
    currentColorPalette = paletteCopy;
}

function changeTitleColor(e) {
  if (e.target.className === 'title') {
    title.style.color =
      currentColorPalette[getRandomIndex(currentColorPalette)].code;
  } else {
    title.style.color = `#000000`;
  }
}
