Available in: [🇯🇵 日本語はこちら](README.ja.md)

# 🗒️ Notes App

A clean, beginner-friendly **Notes** app built with **HTML**, **CSS**, and **JavaScript**. Create notes, edit in place, auto‑save to your browser, and delete with a click.

---

## What I Learned

This project focused on **DOM building**, **event delegation**, and **localStorage**.

### JavaScript Skills Gained

* **DOM Selection & Creation**

  * `document.querySelector()` to capture containers and buttons
  * `document.createElement()` to build notes dynamically
* **Event Handling & Delegation**

  * `click` on the container to catch delete icon clicks (IMG)
  * `input` on editable notes to save text as you type
* **Data Attributes**

  * Using `dataset.index` to map each `<p>` to its array index
* **Local Storage (JSON)**

  * `localStorage.setItem()` / `getItem()` with `JSON.stringify()` / `JSON.parse()`
  * Safe parsing with `try...catch` and array shape checks
* **UI Behavior**

  * `contentEditable="true"` for in‑place editing
  * Auto‑focus the newest note after creation

### HTML & CSS (Supportive Skills)

* **HTML**: Semantic structure, button, editable paragraphs, icon images
* **CSS**:

* Gradient background, rounded buttons, responsive spacing
---

## Features

* **Create** a new note with one click
* **Edit in place** (no modal) with `contentEditable`
* **Autosave** every keystroke to `localStorage`
* **Persistent** across refresh/offline (client-side)
* **Delete** via trash icon inside each note
* **Auto-focus** the newest note after creation
* **Preserves line breaks** exactly as typed

---

## Folder Structure

```
Notes-App/
├── images/
│   ├── notes.png
│   └── delete.png
├── css/
│   └── style.css
├── js/
│   └── scriptC.js
├── index.html
└── README.md
```

---

## How It Works

1. **Load**
   `loadNotes()` reads `localStorage` key **`notes.v1`**, parses JSON safely, returns an array (or `[]` on errors).

2. **Render**
   `render()` clears `.notes-container`, then for each note:

   * Creates a `<p class="input-box" contentEditable="true">`
   * Sets `p.dataset.index = idx`
   * Appends a `<img>` trash icon with the same `data-index`
   * Adds to the container

3. **Edit**
   `notesContainer.addEventListener('input', ...)` updates `notes[idx] = e.target.innerText` and calls `saveNotes()`.

4. **Delete**
   `notesContainer.addEventListener('click', ...)` checks if `e.target.tagName === 'IMG'`, finds `idx`, `notes.splice(idx, 1)`, saves, and re-renders.

5. **Create**
   The **Create Notes** button pushes `''` to the array, saves, re-renders, and focuses the last note:

   ```js
   const last = notesContainer.querySelector('.input-box:last-of-type');
   if (last) last.focus();
   ```

---

## Live Demo

[🔗 View Demo](noteapp1630.netlify.app)

---

## Preview

![App Screenshot 1](images/screenshot1.png)
![App Screenshot 2](images/screenshot2.png)

---

## Author

**Aman Rai**  
Beginner Web Developer (JavaScript-focused)  
Tokyo, Japan  
Languages: English, Hindi, Nepali, Japanese (N3)
