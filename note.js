function addNote(content = '', color = '', e, changePosition) {
    const note = document.createElement('div');
    const deleteButton = document.createElement('div');
    const textBox = document.createElement('textarea');

    note.onmousedown = selectNote;
    note.ontouchstart = selectNote;
    note.className = 'note';
    if (!color) {
        note.style.backgroundColor = generateRandomColor();
    } else {
        note.style.backgroundColor = color;
    }

    deleteButton.className = 'delete-note';
    deleteButton.onclick = () => {
        deleteNote.call(deleteButton);
    };
    deleteButton.textContent = 'X';
    note.appendChild(deleteButton);

    textBox.placeholder = 'Write your note here';
    textBox.className = 'note-content';
    textBox.onkeydown = keyDown;
    textBox.value = content;
    note.appendChild(textBox);

    let noteMenu = document.createElement('div');
    noteMenu.className = 'note-menu';
    let colors = [
        'lightgoldenrodyellow',
        'lightblue',
        'lightgreen',
    ];

    colors.forEach((color) => {
        let colorOption = document.createElement('button');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        colorOption.onmousedown = setColor;
        colorOption.ontouchstart = setColor;
        noteMenu.appendChild(colorOption);
    });

    note.appendChild(noteMenu);
    note.id = ++notesCount;
    container.appendChild(note);

    if (changePosition) {
        note.style.left =
            window.innerWidth / 2 -
            note.clientWidth / 2 +
            (-100 + Math.round(Math.random() * 400)) +
            'px';
        note.style.top =
            window.innerHeight / 2 -
            note.clientHeight / 2 +
            (-100 + Math.round(Math.random() * 400)) +
            'px';
    } else {
        note.style.left = e.clientX + 'px';
        note.style.top = e.clientY + 'px'
    }
}

function createDoubleNote(note1, note2, e) {
    let textValueFirstNote = note1.getElementsByTagName("textarea")[0].value
    let textValueSecNote = note2.getElementsByTagName("textarea")[0].value
    const doubleNote = document.createElement('div');
    const title = document.createElement('textarea');
    const textBoxFirstNote = document.createElement('textarea');
    const textBoxSecNote = document.createElement('textarea');
    const deleteButtonFirstNote = document.createElement('div');
    const deleteButtonSecNote = document.createElement('div');
    const line = document.createElement('hr');
    const element = document.createElement('div');
    const noteMenu = document.createElement('div');

    doubleNote.onmousedown = selectNote;
    doubleNote.ontouchstart = selectNote;
    doubleNote.className = 'double-note';
    doubleNote.style.backgroundColor = generateRandomColor();

    title.placeholder = 'Title';
    title.className = 'title';
    doubleNote.appendChild(title);

    textBoxFirstNote.placeholder = 'Write your note here';
    textBoxFirstNote.className = 'note-content';
    textBoxFirstNote.onkeydown = keyDown;
    textBoxFirstNote.value = textValueFirstNote;
    doubleNote.appendChild(textBoxFirstNote);

    deleteButtonFirstNote.className = 'delete-double-note';
    deleteButtonFirstNote.onclick = () => {
        const changePosition = true;
        addNote(textValueFirstNote, "", e, changePosition)
        addNote(textValueSecNote, "", e, changePosition)
        deleteNote.call(deleteButtonFirstNote);
    };
    deleteButtonFirstNote.textContent = 'X';
    doubleNote.appendChild(deleteButtonFirstNote);

    doubleNote.appendChild(line);

    element.className = 'element';
    doubleNote.appendChild(element);

    textBoxSecNote.placeholder = 'Write your note here';
    textBoxSecNote.className = 'note-content';
    textBoxSecNote.onkeydown = keyDown;
    textBoxSecNote.value = textValueSecNote;
    doubleNote.appendChild(textBoxSecNote);

    deleteButtonSecNote.className = 'delete-double-note';
    deleteButtonSecNote.onclick = () => {
        const changePosition = true;
        addNote(textValueFirstNote, "", e, changePosition)
        addNote(textValueSecNote, "", e, changePosition)
        deleteDoubleNote.call(deleteButtonSecNote);
    };
    deleteButtonSecNote.textContent = 'X';
    element.appendChild(deleteButtonSecNote);

    noteMenu.className = 'note-menu';
    let colors = [
        'lightgoldenrodyellow',
        'lightblue',
        'lightgreen',
    ];

    colors.forEach((color) => {
        let colorOption = document.createElement('button');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        colorOption.onmousedown = setColor;
        colorOption.ontouchstart = setColor;
        noteMenu.appendChild(colorOption);
    });

    doubleNote.appendChild(noteMenu);
    doubleNote.id = ++notesCount;
    container.appendChild(doubleNote);
    setPosition(doubleNote, e);
}

function setPosition(note, e) {
    note.style.left = e.clientX + 'px';
    note.style.top = e.clientY + 'px'
}

function generateRandomColor() {
    const color = ['lightgoldenrodyellow', 'lightblue', 'lightgreen']
    const randomColor = Math.floor(Math.random() * color.length);
    return color[randomColor];
}

function keyDown() {
    checkOverflow(this);
}

function checkOverflow(textBox) {
    textBox.style.height = '';
    while (textBox.scrollHeight > textBox.clientHeight) {
        textBox.style.height = textBox.clientHeight + 2 + 'px';
    }
}

function setColor() {
    let note = this.parentNode.parentNode;
    let newColor = this.style.backgroundColor;
    note.style.backgroundColor = newColor;
}

function deleteNote() {
    let thisNote = this.parentNode;
    thisNote.remove();
}

function deleteDoubleNote() {
    let thisNote = this.parentNode.parentNode;
    thisNote.remove();
}