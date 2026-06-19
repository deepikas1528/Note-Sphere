const API_URL = "http://localhost:5000/api/notes";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const noteIdInput = document.getElementById("noteId");
const notesContainer = document.getElementById("notesContainer");
const message = document.getElementById("message");
const formTitle = document.getElementById("formTitle");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const logoutBtn = document.getElementById("logoutBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const noteCount = document.getElementById("noteCount");
const welcomeMessage = document.getElementById("welcomeMessage");
const fontSelect = document.getElementById("fontSelect");
const showInstructionsBtn = document.getElementById("showInstructionsBtn");
const summaryText = document.getElementById("summaryText");
const totalNotesStat = document.getElementById("totalNotesStat");
const pinnedNotesStat = document.getElementById("pinnedNotesStat");
const openTasksStat = document.getElementById("openTasksStat");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todosContainer = document.getElementById("todosContainer");
const todoCount = document.getElementById("todoCount");
const deleteCompletedBtn = document.getElementById("deleteCompletedBtn");
const wordCounter = document.getElementById("wordCounter");
const ulBtn = document.getElementById("ulBtn");
const olBtn = document.getElementById("olBtn");
const checkBtn = document.getElementById("checkBtn");
const templateBtn = document.getElementById("templateBtn");

let allNotes = [];
let allTodos = [];
let pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes") || "[]");

if (!token) {
    window.location.href = "login.html";
}

if (token && !localStorage.getItem("hasSeenInstructions")) {
    window.location.href = "instructions.html";
}

if (user && welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${user.name}. Build your note collection one idea at a time.`;
}

function getFontFamily(fontChoice) {
    const fontMap = {
        default: "Arial, Helvetica, sans-serif",
        Roboto: "'Roboto', Arial, Helvetica, sans-serif",
        Montserrat: "'Montserrat', sans-serif",
        Georgia: "Georgia, serif",
        "Courier New": "'Courier New', Courier, monospace",
        Pacifico: "'Pacifico', cursive",
        Lato: "'Lato', sans-serif",
        "Playfair Display": "'Playfair Display', serif",
        "Comic Neue": "'Comic Neue', sans-serif",
        "Fira Code": "'Fira Code', monospace"
    };

    return fontMap[fontChoice] || fontMap.default;
}

function applyFont(fontChoice) {
    document.body.style.fontFamily = getFontFamily(fontChoice);
    localStorage.setItem("selectedFont", fontChoice);
}

if (fontSelect) {
    const savedFont = localStorage.getItem("selectedFont") || "default";
    fontSelect.value = savedFont;
    applyFont(savedFont);

    fontSelect.addEventListener("change", () => applyFont(fontSelect.value));
}

if (showInstructionsBtn) {
    showInstructionsBtn.addEventListener("click", () => {
        window.location.href = "instructions.html";
    });
}

function savePinnedNotes() {
    localStorage.setItem("pinnedNotes", JSON.stringify(pinnedNotes));
}

function isPinned(noteId) {
    return pinnedNotes.includes(String(noteId));
}

function togglePin(noteId) {
    const id = String(noteId);
    if (pinnedNotes.includes(id)) {
        pinnedNotes = pinnedNotes.filter((item) => item !== id);
    } else {
        pinnedNotes.push(id);
    }
    savePinnedNotes();
    refreshNotesView();
}

function copyNote(noteId) {
    const note = allNotes.find((item) => String(item.id) === String(noteId));
    if (!note) return;

    const textToCopy = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => showMessage("Note copied to clipboard.", "success"))
        .catch(() => showMessage("Copy failed. Please try again.", "error"));
}

function loadTodos() {
    allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    renderTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

function updateSummary() {
    const noteCountValue = allNotes.length;
    const pinnedCount = allNotes.filter((note) => isPinned(note.id)).length;
    const todosCount = allTodos.length;
    const completedCount = allTodos.filter((todo) => todo.completed).length;
    const openTasks = todosCount - completedCount;
    const statusText = todosCount > 0 && completedCount === todosCount
        ? "All checklist items are complete. Nice work!"
        : "Keep adding quick notes and checking off your tasks.";

    if (summaryText) {
        summaryText.innerHTML = `
            <strong>${noteCountValue} notes</strong> · <strong>${pinnedCount} pinned</strong> · <strong>${completedCount} completed tasks</strong>
            <br>${statusText}`;
    }

    if (totalNotesStat) totalNotesStat.textContent = `${noteCountValue} notes`;
    if (pinnedNotesStat) pinnedNotesStat.textContent = `${pinnedCount} pinned`;
    if (openTasksStat) openTasksStat.textContent = `${openTasks} open tasks`;
}

function addTodo(text) {
    if (!text) return;
    allTodos.unshift({ id: Date.now(), text, completed: false });
    saveTodos();
    renderTodos();
}

function renderTodos() {
    if (!todosContainer) return;

    todosContainer.innerHTML = "";
    todoCount.textContent = `${allTodos.length} ${allTodos.length === 1 ? "task" : "tasks"}`;

    const completedCount = allTodos.filter((todo) => todo.completed).length;
    if (deleteCompletedBtn) {
        deleteCompletedBtn.style.display = completedCount > 0 ? "inline-block" : "none";
    }

    if (allTodos.length === 0) {
        todosContainer.innerHTML = `
            <div class="empty-state">
                <h3>No tasks yet</h3>
                <p>Add a task and mark it complete when finished.</p>
            </div>`;
        updateSummary();
        return;
    }

    allTodos.forEach((todo) => {
        const todoCard = document.createElement("div");
        todoCard.className = "todo-item";
        todoCard.innerHTML = `
            <label class="todo-label ${todo.completed ? "completed" : ""}">
                <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="window.toggleTodo(${todo.id})">
                <span>${escapeHtml(todo.text)}</span>
            </label>
            <button class="delete-btn todo-delete" onclick="window.deleteTodo(${todo.id})">Delete</button>
        `;
        todosContainer.appendChild(todoCard);
    });

    updateSummary();
}

function toggleTodoState(id) {
    const todo = allTodos.find((item) => item.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    allTodos = allTodos.filter((item) => item.id !== id);
    saveTodos();
    renderTodos();
}

function deleteCompletedTasks() {
    const completedCount = allTodos.filter((todo) => todo.completed).length;
    if (completedCount === 0) return;

    if (confirm(`Delete ${completedCount} completed task${completedCount === 1 ? "" : "s"}?`)) {
        allTodos = allTodos.filter((todo) => !todo.completed);
        saveTodos();
        renderTodos();
    }
}

window.toggleTodo = toggleTodoState;
window.deleteTodo = deleteTodo;
window.togglePin = togglePin;
window.copyNote = copyNote;

if (deleteCompletedBtn) deleteCompletedBtn.addEventListener("click", deleteCompletedTasks);

if (todoForm) {
    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (!todoText) return;
        addTodo(todoText);
        todoInput.value = "";
    });
}

function formatNoteContent(text) {
    const escaped = escapeHtml(text);
    const lines = escaped.split("\n");
    let html = "";
    let inList = false;
    let listType = null;

    lines.forEach((line) => {
        const trimmed = line.trim();
        const isChecked = /^\[x\]\s*/i.test(trimmed);
        const isEmptyBox = /^\[\s*\]\s*/.test(trimmed);
        const ulMatch = /^[-]\s*(.*)/.exec(trimmed);
        const olMatch = /^\d+\.\s*(.*)/.exec(trimmed);

        if (ulMatch) {
            if (!inList || listType !== "ul") {
                if (inList) html += `</${listType}>`;
                html += "<ul>";
                inList = true;
                listType = "ul";
            }
            html += `<li>${ulMatch[1] || ""}</li>`;
        } else if (olMatch) {
            if (!inList || listType !== "ol") {
                if (inList) html += `</${listType}>`;
                html += "<ol>";
                inList = true;
                listType = "ol";
            }
            html += `<li>${olMatch[1] || ""}</li>`;
        } else {
            if (inList) {
                html += `</${listType}>`;
                inList = false;
                listType = null;
            }
            if (isChecked) {
                html += `<div class="task-line completed"><span class="task-checkbox">✔</span>${trimmed.replace(/^\[x\]\s*/i, "")}</div>`;
            } else if (isEmptyBox) {
                html += `<div class="task-line"><span class="task-checkbox"></span>${trimmed.replace(/^\[\s*\]\s*/, "")}</div>`;
            } else if (trimmed === "") {
                html += "<div>&nbsp;</div>";
            } else {
                html += `<div>${trimmed}</div>`;
            }
        }
    });

    if (inList) html += `</${listType}>`;
    return html;
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = type === "success" ? "success-message" : "error-message";
    setTimeout(() => {
        message.textContent = "";
        message.className = "";
    }, 3000);
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

async function loadNotes() {
    try {
        const response = await fetch(API_URL, { headers: getHeaders() });
        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message || "Failed to load notes.", "error");
            return;
        }

        allNotes = data.notes;
        refreshNotesView();
    } catch (error) {
        showMessage("Unable to connect to server.", "error");
    }
}

function getVisibleNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelect ? sortSelect.value : "newest";

    const filtered = allNotes.filter((note) => {
        return note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm);
    });

    return filtered.sort((a, b) => {
        if (sortValue === "oldest") return new Date(a.created_at) - new Date(b.created_at);
        if (sortValue === "title") return a.title.localeCompare(b.title);
        if (sortValue === "pinned") return Number(isPinned(b.id)) - Number(isPinned(a.id));
        return new Date(b.created_at) - new Date(a.created_at);
    });
}

function refreshNotesView() {
    displayNotes(getVisibleNotes());
}

function displayNotes(notes) {
    notesContainer.innerHTML = "";
    noteCount.textContent = `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;

    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <h3>No notes found</h3>
                <p>Add your first note or try a different search.</p>
            </div>`;
        updateSummary();
        return;
    }

    notes.forEach((note) => {
        const noteCard = document.createElement("div");
        const pinned = isPinned(note.id);
        noteCard.className = pinned ? "note-card pinned-note" : "note-card";

        noteCard.innerHTML = `
            <div class="note-topline">
                <span class="note-badge">${pinned ? "Pinned" : "Note"}</span>
                <small>${new Date(note.created_at).toLocaleString()}</small>
            </div>
            <h3>${escapeHtml(note.title)}</h3>
            <div class="note-content">${formatNoteContent(note.content)}</div>
            <div class="note-actions">
                <button onclick="window.togglePin('${note.id}')">${pinned ? "Unpin" : "Pin"}</button>
                <button onclick="window.copyNote('${note.id}')">Copy</button>
                <button onclick="startEdit('${note.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
            </div>`;

        notesContainer.appendChild(noteCard);
    });

    updateSummary();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function updateWordCounter() {
    if (!wordCounter) return;
    const text = contentInput.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    wordCounter.textContent = `${words} ${words === 1 ? "word" : "words"} · ${contentInput.value.length} characters`;
}

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const noteId = noteIdInput.value;

    if (!title || !content) {
        showMessage("Title and content are required.", "error");
        return;
    }

    const method = noteId ? "PUT" : "POST";
    const url = noteId ? `${API_URL}/${noteId}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: getHeaders(),
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message, "error");
            return;
        }

        resetForm();
        showMessage(data.message, "success");
        loadNotes();
    } catch (error) {
        showMessage("Unable to save note.", "error");
    }
});

function startEdit(id) {
    const note = allNotes.find((item) => String(item.id) === String(id));
    if (!note) {
        showMessage("Note not found.", "error");
        return;
    }

    noteIdInput.value = note.id;
    titleInput.value = note.title;
    contentInput.value = note.content;
    updateWordCounter();

    formTitle.textContent = "Edit Note";
    saveBtn.textContent = "Update Note";
    cancelBtn.style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

cancelBtn.addEventListener("click", resetForm);

function resetForm() {
    noteIdInput.value = "";
    titleInput.value = "";
    contentInput.value = "";
    formTitle.textContent = "Create Note";
    saveBtn.textContent = "Save";
    cancelBtn.style.display = "none";
    updateWordCounter();
}

async function deleteNote(id) {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message, "error");
            return;
        }

        pinnedNotes = pinnedNotes.filter((item) => item !== String(id));
        savePinnedNotes();
        showMessage(data.message, "success");
        loadNotes();
    } catch (error) {
        showMessage("Unable to delete note.", "error");
    }
}

function getSelectedLines(textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const before = value.lastIndexOf("\n", start - 1) + 1;
    const afterPos = value.indexOf("\n", end);
    const after = afterPos === -1 ? value.length : afterPos;
    const selected = value.slice(before, after);
    return { before, after, selected };
}

function applyPrefixToSelection(textarea, prefixType) {
    const { before, after, selected } = getSelectedLines(textarea);
    const lines = selected.split("\n");
    const nonEmpty = lines.filter((line) => line.trim() !== "");

    if (prefixType === "ul") {
        const allUL = nonEmpty.length > 0 && nonEmpty.every((line) => /^\s*-\s+/.test(line));
        const newLines = allUL
            ? lines.map((line) => line.replace(/^\s*-\s+/, ""))
            : lines.map((line) => /^\s*-\s+/.test(line) ? line : line.replace(/^\s*\d+\.\s+/, "- ").replace(/^(?!- )/, "- "));
        replaceSelectedBlock(textarea, before, after, newLines.join("\n"));
    }

    if (prefixType === "ol") {
        const allOL = nonEmpty.length > 0 && nonEmpty.every((line) => /^\s*\d+\.\s+/.test(line));
        let counter = 1;
        const newLines = allOL
            ? lines.map((line) => line.replace(/^\s*\d+\.\s+/, ""))
            : lines.map((line) => {
                if (line.trim() === "") return line;
                return line.replace(/^\s*(-|\d+\.)\s+/, `${counter++}. `).replace(/^(?!\d+\. )/, `${counter++}. `);
            });
        replaceSelectedBlock(textarea, before, after, newLines.join("\n"));
    }
}

function replaceSelectedBlock(textarea, before, after, newBlock) {
    textarea.value = textarea.value.slice(0, before) + newBlock + textarea.value.slice(after);
    textarea.selectionStart = before;
    textarea.selectionEnd = before + newBlock.length;
    textarea.focus();
    updateWordCounter();
}

function insertAtCursor(textarea, text) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = textarea.value.slice(0, start) + text + textarea.value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
    updateWordCounter();
}

if (ulBtn && contentInput) ulBtn.addEventListener("click", () => applyPrefixToSelection(contentInput, "ul"));
if (olBtn && contentInput) olBtn.addEventListener("click", () => applyPrefixToSelection(contentInput, "ol"));
if (checkBtn && contentInput) checkBtn.addEventListener("click", () => insertAtCursor(contentInput, "[ ] "));
if (templateBtn && contentInput) {
    templateBtn.addEventListener("click", () => {
        const template = "Today I worked on:\n- \n\nNext step:\n[ ] \n\nReminder:\n";
        insertAtCursor(contentInput, template);
    });
}

if (contentInput) contentInput.addEventListener("input", updateWordCounter);
if (searchInput) searchInput.addEventListener("input", refreshNotesView);
if (sortSelect) sortSelect.addEventListener("change", refreshNotesView);

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
});

loadTodos();
loadNotes();
updateWordCounter();
