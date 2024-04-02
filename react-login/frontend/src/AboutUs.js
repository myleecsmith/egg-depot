import React from 'react'
import { useNavigate } from 'react-router-dom'

const AboutUs = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  return (
    <div>
      <h1>Mylee Smith</h1>
      <p>I like sailing, horses, and surfing.</p>
    </div>
  )
}

export default AboutUs

