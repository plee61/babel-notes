import {updateNote, deleteNote } from './notes'
import {initialiseEditPage, generateLastUpdated} from './views'

let noteDesc = document.querySelector('#note-desc')
let noteTitle = document.querySelector('#note-title')
let updatedElement = document.querySelector('#lastUpdated')
const noteId = location.hash.substring(1)
initialiseEditPage(noteId)

noteTitle.addEventListener('input', (e) =>{
    const note = updateNote(noteId, {title: e.target.value})    
    updatedElement.textContent = generateLastUpdated(note)
})
noteDesc.addEventListener('input',(e) =>{
    const note = updateNote(noteId, {body: e.target.value})
    updatedElement.textContent = generateLastUpdated(note)
})
document.querySelector('#remove-note').addEventListener('click', function () {
    deleteNote(noteId)
    location.href='/index.html'
})
window.addEventListener('storage',function(e){
    if (e.key==='notes'){
        initialiseEditPage(noteId)        
    }
})
