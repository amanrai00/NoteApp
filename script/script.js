// scriptC.js
// --- Simple Notes App (Beginner Friendly, JSON storage) ---

// Grab the container where notes will be displayed
const notesContainer = document.querySelector('.notes-container');

// Grab the "Create Notes" button
const createBtn      = document.querySelector('.btn');

// Key name for localStorage so we can save/retrieve notes
const STORAGE_KEY    = 'notes.v1';

// --------------------------
// 1) Load notes and render
// --------------------------

// Try loading saved notes from localStorage
// If nothing found → start with empty array
let notes = loadNotes();

// Build the UI with whatever notes we have
render();

// --------------------------
// 2) Add new note
// --------------------------

// When user clicks the "Create Notes" button:
createBtn.addEventListener('click', () => {
  notes.push('');        // Add a blank string to notes array
  saveNotes();           // Save the new array to localStorage
  render();              // Refresh the UI

  // Automatically focus on the last (newest) note
  const last = notesContainer.querySelector('.input-box:last-of-type');
  if (last) last.focus();
});

// --------------------------
// 3) Edit note text
// --------------------------

// Listen to typing inside notesContainer
notesContainer.addEventListener('input', (e) => {
  // Only act if the user is typing inside a <p> with class 'input-box'
  if (!e.target.classList.contains('input-box')) return;

  // Each note has an index stored in dataset.index
  const idx = Number(e.target.dataset.index);

  // Update the text in the notes array with whatever user typed
  notes[idx] = e.target.innerText;

  // Save changes
  saveNotes();
});

// --------------------------
// 4) Delete note
// --------------------------

// When user clicks inside notesContainer
notesContainer.addEventListener('click', (e) => {
  // Only respond if they clicked on an <img> (the trash icon)
  if (e.target.tagName !== 'IMG') return;

  // Find which note (index) this trash belongs to
  const idx = Number(e.target.dataset.index);

  // Remove that note from the array
  notes.splice(idx, 1);

  // Save and refresh UI
  saveNotes();
  render();
});

// --------------------------
// 5) Helpers
// --------------------------

// Rebuilds the notes UI from scratch every time
function render() {
  // Clear the container
  notesContainer.innerHTML = '';

  // Loop through notes array and create <p> for each one
  notes.forEach((text, idx) => {
    // Create <p> element, make it editable
    const p = document.createElement('p');
    p.className = 'input-box';     // For styling
    p.contentEditable = 'true';    // User can type directly
    p.dataset.index = idx;         // Save which note index this <p> represents
    p.innerText = text;          // Fill with current note text

    // Create delete <img>
    const del = document.createElement('img');
    del.src = 'images/delete.png'; // Your delete icon
    del.alt = 'Delete note';
    del.dataset.index = idx;       // Attach same index so we know what to delete

    // Put delete icon inside the <p>
    p.appendChild(del);

    // Add this <p> to the container
    notesContainer.appendChild(p);
  });
}

// Reads notes from localStorage safely
function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY); // Load JSON string
    const arr = raw ? JSON.parse(raw) : [];        // Parse into array (or empty)
    return Array.isArray(arr) ? arr : [];          // Safety check
  } catch {
    return []; // If anything breaks, return empty array
  }
}

// Saves notes array into localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
