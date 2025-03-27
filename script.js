document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.querySelector('.add-note-btn');
    const closeAppBtn = document.querySelector('.close-app-btn');
    const noteModal = document.getElementById('noteModal');
    const newNoteInput = document.getElementById('newNoteInput');
    const okButton = document.getElementById('okButton');
    const notesList = document.getElementById('notesList');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const buttonsContainer = document.querySelector('.buttons-container');

    loadNotes();

    //// Mostrar modal 
    addNoteBtn.addEventListener('click', () => {
        noteModal.classList.add('show');
        newNoteInput.value = ''; // Limpiar input
        buttonsContainer.style.display = 'none';
        closeModalBtn.style.display = 'block'; // Mostrar boton cerrar 
    });

    closeModalBtn.addEventListener('click', () => {
        noteModal.classList.remove('show');
        buttonsContainer.style.display = 'flex';
        closeModalBtn.style.display = 'none';
    });
    okButton.addEventListener('click', () => {
        const noteText = newNoteInput.value.trim();
        
        if (noteText) {
            const newNoteElement = document.createElement('div');
            newNoteElement.classList.add('single-note');
            newNoteElement.textContent = noteText;
            
            const deleteBtn = createDeleteButton(noteText, newNoteElement);

            newNoteElement.appendChild(deleteBtn);
            
            notesList.appendChild(newNoteElement);

            saveNote(noteText);
            
            noteModal.classList.remove('show');
            buttonsContainer.style.display = 'flex';
            closeModalBtn.style.display = 'none';
        }
    });

    closeAppBtn.addEventListener('click', () => {
        window.close(); 
    });

    function saveNote(noteText) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(noteText => addNoteToDOM(noteText));
    }

    function addNoteToDOM(noteText) {
        const newNoteElement = document.createElement('div');
        newNoteElement.classList.add('single-note');
        newNoteElement.textContent = noteText;
        
        const deleteButton = createDeleteButton(noteText, newNoteElement);

        newNoteElement.appendChild(deleteButton);

        notesList.appendChild(newNoteElement);
    }

    function createDeleteButton(noteText, noteElement) {
        const deleteBtn = document.createElement('img');
        deleteBtn.src = 'delete.png'; 
        deleteBtn.alt = 'Eliminar';
        deleteBtn.classList.add('delete-note');
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            noteElement.remove(); 
            deleteNote(noteText);  
        });
        return deleteBtn;
    }
    function deleteNote(noteText) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note !== noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
});
