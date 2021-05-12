import {createNote, sortNotes} from './notes'
import {setFilters, getFilters} from './filters'
import {displayNotes} from './views.js'
sortNotes()
displayNotes()

document.querySelector('#search-text').addEventListener('input', function (e) {
    setFilters({searchText: e.target.value, sortBy: getFilters().sortBy})
    displayNotes()
})
document.querySelector('#sort-by').addEventListener('change',function(e){
    setFilters({searchText: getFilters().searchText, sortBy: e.target.value})
    sortNotes()
    displayNotes()
})
document.querySelector('#create').addEventListener('click',function(){
    const uId = createNote()
    location.href='edit.html#'+uId
})
document.querySelector("#btnSidepanel").addEventListener('click',function(){
    document.querySelector("#myPanel").style.width = "250px";
})
document.querySelector("#sidepanel").addEventListener('click',function(){
    document.querySelector("#myPanel").style.width = "0px";
})
window.addEventListener('storage',function(e){
    if (e.key==='notes'){
        displayNotes()
    }
})
