import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import './EventNew.css'

function EventForm() {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  return (
    <div>Hello from Event Form</div>
  )
}

export default EventForm
