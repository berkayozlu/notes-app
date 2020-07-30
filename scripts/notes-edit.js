// Defining title element
const titleEl = document.querySelector('#note-title') 
const bodyEl = document.querySelector('#note-body')
const removeEl = document.querySelector('#remove-note')
const spanEl = document.querySelector('#last-edited')

// Setup
let notes = getSavedNotes()
const noteID = location.hash.substring(1)
let note = notes.find((i) => i.id === noteID)
if (!note) {
    location.assign('/index.html')
}
titleEl.value = note.title
bodyEl.value = note.body
spanEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`

// Tıtle listener
titleEl.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    spanEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})

// body listener
bodyEl.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    spanEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})

// remove button
removeEl.addEventListener('click', (e) => {
    removeNoteById(location.hash.substring(1))
    location.assign('index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        let note = notes.find(function(i){
            return i.id === noteID
        })
        if (!note) {
            location.assign('index.html')
        }
        titleEl.value = note.title
        bodyEl.value = note.body
        spanEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    } 
})

