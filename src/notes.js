import moment from 'moment'
import uuidv4 from 'uuid/v4'
import {getFilters} from './filters'
let notes = {}
const loadNotes = () => {
    try {
        const Jstorage = localStorage.getItem('notes')
        return Jstorage ? JSON.parse(Jstorage) : []
    }
    catch(e){
        return []    
    }
    
}
notes = loadNotes()
//expose notes from module
const getNotes = () => notes

const saveNotes = () =>{
    localStorage.setItem('notes',JSON.stringify(notes))
}

const createNote = () => {
    const uId = uuidv4()
    notes.push( {id:uId,
          title:'',
          body:'',
          createAt: moment(),
          updatedAt: ''
          })
    saveNotes()
    return uId
}
const deleteNote = (noteId) => {
    const noteIndex = notes.findIndex((note) => note.id === noteId)
    
    if (noteIndex > -1) {
        notes.splice(noteIndex,1)
        saveNotes()
    }
 }
 const sortNotes = () => {
    const sortBy = getFilters().sortBy
    if (sortBy === 'edited'){
        return notes.sort((a,b)=>{
            
            if (a.updatedAt > b.updatedAt) { 
                return 1
            }
            else if (a.updatedAt < b.updatedAt){
                return -1
            } else {
                return 0
            }
        })
    }
    else if (sortBy === 'created'){
        return notes.sort((a,b)=>{
            if (a.createAt > b.createAt) { 
                return 1
            }
            else if (a.createAt < b.createAt){
                return -1
            } else {
                return 0
            }
        })
    }
    else if (sortBy === 'alphabet'){
        return notes.sort((a,b)=>{
            if (a.title > b.title) { 
                return 1
            }
            else if (b.title > a.title){
                return -1
            } else {
                return 0
            }
        })
    }
    else {
        return notes
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)
    if (!note) {
        return
    }
    if (typeof updates.title ==='string'){
        note.title = updates.title
        note.updatedAt = moment()
    }
    if (typeof updates.body  === 'string'){
        note.body = updates.body
        note.updatedAt = moment()
    }
    saveNotes()
    return note
}

export {getNotes, createNote, deleteNote, sortNotes, updateNote, saveNotes}