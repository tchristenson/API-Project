import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import './GroupNew.css'

function NewGroup() {







  function handleSubmit(e) {
    e.preventDefault()

  }

  return(
    <form className='new-group-form' onSubmit={handleSubmit}>
      <h3>BECOME AN ORGANIZER</h3>
      <h2>We'll walk you through a few steps to build your local community</h2>
    </form>
  )
}

export default NewGroup
