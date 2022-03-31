import React, {useEffect, useState} from 'react'
//import notes from '../assets/data'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
  let noteId = useParams();
  let navigate = useNavigate();
  //let note = notes.find(note => note.id === Number(noteId.id))
  let [note, setNote] = useState(null)

  useEffect(()=> {
    getNote()
  }, [noteId.id])

  let getNote = async () => {
    if(noteId.id === 'new') return
    let response = await fetch(`https://mnotesapp.herokuapp.com/api/notes/${noteId.id}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`https://mnotesapp.herokuapp.com/api/notes/`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let updateNote = async () => {
    await fetch(`https://mnotesapp.herokuapp.com/api/notes/${noteId.id}/`, {
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    await fetch(`https://mnotesapp.herokuapp.com/api/notes/${noteId.id}/`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate("/")
  }

  let handleSubmit = () => {

    if(noteId.id !== 'new' && !note.body){
      deleteNote()
    }else if(noteId.id !== 'new'){
      updateNote()
    }else if(noteId.id === 'new' && note !== null){
      createNote()
    }
    navigate("/")
  }

  return (
    <div className="note">
        <div className="note-header">
          <h3>
              <ArrowLeft onClick={handleSubmit} />
          </h3>
          {noteId.id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
          ): (
            <button onClick={handleSubmit}>Done</button>
          )}
          
        </div>
        <textarea onChange={(e)=>{setNote({...note, 'body': e.target.value})}} value={note?.body}>

        </textarea>
    </div>
  )
}

export default NotePage 