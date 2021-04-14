import moment from 'moment'
import {getNotes, deleteNote, saveNotes} from './notes'
import {getFilters} from './filters'

const generateNote = (note) => { 
    const noteEl = document.createElement('p')
    const anchor = document.createElement('a')
    const statusEl = document.createElement('p')

    anchor.target = "_parent"
    anchor.href = "edit.html#"+note.id
    anchor.classList.add('list-item')
    //if note title was not entered on Edit page
    if (note.title.length > 0){
        noteEl.textContent = note.title
    } 
    else
    {
        noteEl.textContent = 'Unnamed note'
    }
    noteEl.classList.add('list-item__title')
    anchor.appendChild(noteEl)
    //setupt status message    
    statusEl.textContent = generateLastUpdated(note)
    statusEl.classList.add('list-item__subtitle')
    anchor.appendChild (statusEl)
    return anchor
}

const displayNotes = () => {
    const notes = getNotes()

    const searchText = getFilters().searchText.toLowerCase()
    const filteredNotes = notes.filter((note)=>note.title.toLowerCase().includes(searchText))
    const div = document.querySelector('#notes-div')
    div.innerHTML = ''
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => { 
             const noteEl = generateNote(note)
             div.appendChild(noteEl)
         })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        div.appendChild(emptyMessage)
    }
}
const initialiseEditPage = (noteId) => {
    const notes = getNotes()
    const noteDesc = document.querySelector('#note-desc')
    const noteTitle = document.querySelector('#note-title')
    const updatedElement = document.querySelector('#lastUpdated')

    let filteredNote = notes.find(function(note){
        return note.id===noteId
    })
    
    if (filteredNote===undefined){
        location.href='/index.html'
    }
    else{
        noteDesc.value = filteredNote.body
        noteTitle.value = filteredNote.title
        updatedElement.textContent = generateLastUpdated(filteredNote)
    }
}
const generateLastUpdated = (note) => {
     
    if (note.updatedAt){
       //return 'last updated ' + moment(note.updatedAt).fromNow()  + ' at:' + moment(note.updatedAt).format('dddd, MMMM Do YYYY, h:mm:ss a')
       return 'last updated ' + moment(note.updatedAt).fromNow()  
    }
    else {
       //return 'created on ' + moment(note.createAt).fromNow() + ' at:' + moment(note.createAt).format('dddd, MMMM Do YYYY, h:mm:ss a')
       return 'created ' + moment(note.createAt).fromNow() 
    }
}
export {generateLastUpdated, generateNote, displayNotes, initialiseEditPage}