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
    code: `#${hexCode}`,
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

function toggleLock(e) {
  for (var i = 0; i < currentColorPalette.length; i++) {
    if (e.target.parentNode.id === `box${i}`) {
      currentColorPalette[i].locked = !currentColorPalette[i].locked;
      document.getElementById(`lock${i}`).classList.toggle('hidden');
      document.getElementById(`unlock${i}`).classList.toggle('hidden');
    }
  }
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
  var newPalette = [];
  for (var i = 0; i < currentColorPalette.length; i++) {
    newPalette.push(currentColorPalette[i]);
  }
  savedPalettes.push(newPalette);
  displaySavedPalettes();
  displayPalette();
}

function displaySavedPalettes() {
  savedSectionMsg.classList.add('hidden');
  savedPalettesContainer.innerHTML = '';
  for (var i = 0; i < savedPalettes.length; i++) {
    savedPalettesContainer.innerHTML += `
        <section class="mini-container" id="${i}">
            <section class="mini-palette" style="background-color: ${savedPalettes[i][0].code}"></section>
            <section class="mini-palette" style="background-color: ${savedPalettes[i][1].code}"></section>
            <section class="mini-palette" style="background-color: ${savedPalettes[i][2].code}"></section>
            <section class="mini-palette" style="background-color: ${savedPalettes[i][3].code}"></section>
            <section class="mini-palette" style="background-color: ${savedPalettes[i][4].code}"></section>
            <img class="delete" data-index-number="${i}" src="./icons/delete.png">
        </section>
        `;
  }
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
  for (var i = 0; i < savedPalettes.length; i++) {
    if (e.target.parentNode.id === `${i}` && e.target.className !== 'delete') {
      displayEditPalette(i);
      changeHexCodes();
      changeColorBoxes();
    }
  }
}

function displayEditPalette(i) {
  for (var j = 0; j < currentColorPalette.length; j++) {
    currentColorPalette[j].code = savedPalettes[i][j].code;
  }
}

function changeTitleColor(e) {
  if (e.target.className === 'title') {
    title.style.color =
      currentColorPalette[getRandomIndex(currentColorPalette)].code;
  } else {
    title.style.color = `#000000`;
  }
}
