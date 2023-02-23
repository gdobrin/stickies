const container = document.getElementsByClassName("container")[0];
let selectedNote = null;
let notesCount = 0;
let isDragging = false;
let dragTarget;
let lastOffsetX = 0;
let lastOffsetY = 0;
let noteCopy = {};
let currentSwap = null;

container.addEventListener('dblclick', function (e) {
    e = window.event || e;
    if (this === e.target) {
        addNote("", "", e)
    };
});

container.addEventListener('mousedown', e => {
    if ((!e.target.classList.contains('note')) && (!e.target.classList.contains('double-note'))) {
        return;
    }

    dragTarget = e.target;
    dragTarget.parentNode.append(dragTarget);
    lastOffsetX = e.offsetX;
    lastOffsetY = e.offsetY;
    isDragging = true;
});

container.addEventListener('mousemove', drag);
container.addEventListener('mouseup', drop);

function drag(e) {
    if (!isDragging) return;
    dragTarget.style.left = e.clientX - lastOffsetX + 'px';
    dragTarget.style.top = e.clientY - lastOffsetY + 'px';
}

function drop(e) {
    if ((selectedNote !== null) && (e.target.classList.contains('note')) && (!e.target.classList.contains('double-note')) && (!e.target.classList.contains('container')) && (!e.target.classList.contains('delete-note'))) {
        currentSwap = selectedNote;
        noteCopy = copyNote(selectedNote);
        let notes = document.getElementsByClassName('note');
        for (let i = 0; i < notes.length; i++) {
            let rect = notes[i].getBoundingClientRect();
            if (
                currentSwap !== null &&
                !noteCopy.id.includes(notes[i].id) &&
                notes[i].id !== currentSwap.id
            ) {
                if (
                    e.clientX > rect.left &&
                    e.clientX < rect.right &&
                    e.clientY > rect.top &&
                    e.clientY < rect.bottom
                ) {
                    if (notes[i].style.position !== 'fixed') {
                        notes[i].style.display = "none"
                        currentSwap.style.display = "none";
                        createDoubleNote(notes[i], noteCopy, e)
                        break;
                    }
                }
            }
        }
    }
    isDragging = false;
}

function selectNote() {
    selectedNote = this;
}

function copyNote(originalNote) {
    let noteCopy = document.createElement('div');
    noteCopy.className = 'note';
    noteCopy.innerHTML = originalNote.innerHTML;
    noteCopy.children[0].value = originalNote.children[0].value;
    noteCopy.children[1].value = originalNote.children[1].value;
    noteCopy.id = originalNote.id + 'copy';

    let color = originalNote.style.backgroundColor;
    noteCopy.style.backgroundColor = color;
    noteCopy.style.animationName = 'none';
    return noteCopy;
}