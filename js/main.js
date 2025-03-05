
let theThumbnails = document.querySelectorAll('#buttonHolder img'),
    gameBoard = document.querySelector('.puzzle-board'),
    pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
    dropZones = document.querySelectorAll('.drop-zone'),
    puzzleContainer = document.querySelector('.puzzle-pieces');


let originalPositions = {};
pzlPieces.forEach(piece => {
    originalPositions[piece.id] = { parent: puzzleContainer };
});


function changeImageSet() {
    console.log('Changing puzzle set');

    gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;

    updatePuzzlePieces(this.dataset.bgref);

    resetPuzzle();
}

function updatePuzzlePieces(puzzleIndex) {
    console.log(`Updating puzzle pieces for puzzle ${puzzleIndex}`);

    document.getElementById("topLeft").src = `images/topLeft${puzzleIndex}.jpg`;
    document.getElementById("topRight").src = `images/topRight${puzzleIndex}.jpg`;
    document.getElementById("bottomLeft").src = `images/bottomLeft${puzzleIndex}.jpg`;
    document.getElementById("bottomRight").src = `images/bottomRight${puzzleIndex}.jpg`;
}

function allowDrag(event) {
    console.log('Started dragging:', event.target.id);
    event.dataTransfer.setData('draggedEl', event.target.id);

   
    setTimeout(() => {
        event.target.style.opacity = "0.5";
    }, 0);
}

function allowDragOver(event) {
    event.preventDefault();
    console.log('Dragging over:', event.target.classList);
}

function allowDrop(event) {
    event.preventDefault();

    let droppedElId = event.dataTransfer.getData('draggedEl');
    let droppedEl = document.getElementById(droppedElId);

    if (!event.target.hasChildNodes() && event.target.classList.contains('drop-zone')) {
        event.target.appendChild(droppedEl);
        droppedEl.style.opacity = "1"; 
        console.log(`Dropped ${droppedElId} into`, event.target.classList);
    } else {
        alert("This spot is already taken!");
    }
}

function resetPuzzle() {
    console.log('Resetting puzzle - moving all pieces back');

    pzlPieces.forEach(piece => {
        puzzleContainer.appendChild(piece);
        piece.style.opacity = "1";
    });

    dropZones.forEach(zone => {
        while (zone.firstChild) {
            zone.removeChild(zone.firstChild);
        }
    });
}

theThumbnails.forEach(thumbnail => thumbnail.addEventListener('click', changeImageSet));

pzlPieces.forEach(piece => {
    piece.addEventListener('dragstart', allowDrag);
    piece.addEventListener('dragend', (event) => {
        event.target.style.opacity = "1"; 
    });
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', allowDragOver);
    zone.addEventListener('drop', allowDrop);
});
