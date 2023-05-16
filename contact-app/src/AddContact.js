import React, { useState } from 'react'
import axios from 'axios'

function AddContact({ onContactAdded }) {
  const [contact, setContact] = useState({ name: '', email: '', phone: '' })

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/contacts',
        contact
      )
      setContact({ name: '', email: '', phone: '' })
      onContactAdded(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          name='name'
          value={contact.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type='email'
          name='email'
          value={contact.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type='text'
          name='phone'
          value={contact.phone}
          onChange={handleChange}
          required
        />
      </label>
      <button type='submit'>Add</button>
    </form>
  )
}

export default AddContact
