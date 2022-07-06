const scrollBtn = document.querySelector('.scroll-btn');
const addBtn = document.querySelector('.add-btn');
const notesContainer = document.querySelector('.notes-container');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.note-modal');
const cancelBtn = document.querySelector('.cancel');
const saveBtn = document.querySelector('.save');
const textarea = document.querySelector('.textarea');
const colorInput = document.querySelector('.input-color');
const error = document.querySelector('.error');
const info = document.querySelector('.info');
let noteID = 1;
let noteCount = 0;

const appearOnScroll = () => {
	if (window.scrollY < 200) {
		scrollBtn.classList.remove('scroll-btn-visible');
	} else {
		scrollBtn.classList.add('scroll-btn-visible');
	}
};

const scrollUp = () => {
	window.scrollTo(0, 0);
};

const openModal = () => {
	modalContainer.style.display = 'flex';
	modal.style.display = 'flex';
};

const clearModal = () => {
	textarea.value = '';
	colorInput.value = '#ff65a3';
	error.textContent = '';
	textarea.classList.remove('textarea-error');
};

const closeModal = () => {
	modalContainer.style.display = 'none';
	modal.style.display = 'none';
	clearModal();
};

const createNote = () => {
	const noteText = textarea.value;
	const noteColor = colorInput.value;
	const newNote = document.createElement('div');
	newNote.setAttribute('id', noteID);
	newNote.classList.add('note');
	newNote.style.backgroundColor = noteColor;
	newNote.innerHTML = ` <div class="note-top">
	<h2 class="note-heading">Note #${noteID}</h2>
	<div class="note-btns">
		<button class="note-delete note-btn" onclick="deleteNote(${noteID})"><img src="img/trash.svg" alt=""></button>
	</div>
</div>
<div class="note-bottom">
		<p class="note-text">${noteText}</p>
</div>`;
	notesContainer.appendChild(newNote);
	noteID++;
};

const saveNote = () => {
	if (textarea.value !== '') {
		createNote();
		closeModal();
		noteCount++;
		countNotes();
	} else {
		error.textContent = `Field required`;
		textarea.classList.add('textarea-error');
	}
};

const deleteNote = (id) => {
	const noteToDelete = document.getElementById(id);
	notesContainer.removeChild(noteToDelete);
	noteCount--;
	countNotes();
};

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		saveNote();
	}
};

const countNotes = () => {
	if (noteCount == 0) {
		info.style.display = 'block';
	} else {
		info.style.display = 'none';
	}
};

scrollBtn.addEventListener('click', scrollUp);
window.addEventListener('scroll', appearOnScroll);
addBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveNote);
textarea.addEventListener('keyup', enterCheck);
