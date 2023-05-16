import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddContact from './AddContact'

function ContactList() {
  const [contacts, setContacts] = useState([])
  const [editedContact, setEditedContact] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [idToEdit, setIdToEdit] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/contacts')
      setContacts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleContactAdded = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact])
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/contacts/${id}`)
      fetchContacts()
    } catch (err) {
      console.error(err)
    }
  }

  const handleEditClick = (contact) => {
    setIdToEdit(contact._id)
    setEditedContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    })
  }

  const handleEditChange = (e) => {
    setEditedContact({ ...editedContact, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(
        `http://localhost:5000/contacts/${idToEdit}`,
        editedContact
      )
      setIdToEdit(null)
      fetchContacts()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <AddContact onContactAdded={handleContactAdded} />
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {idToEdit === contact._id ? (
              <form onSubmit={handleEditSubmit}>
                <label>
                  Name:
                  <input
                    type='text'
                    name='name'
                    value={editedContact.name}
                    onChange={handleEditChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type='email'
                    name='email'
                    value={editedContact.email}
                    onChange={handleEditChange}
                    required
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type='text'
                    name='phone'
                    value={editedContact.phone}
                    onChange={handleEditChange}
                    required
                  />
                </label>
                <button type='submit'>Update</button>
              </form>
            ) : (
              <div>
                <span>{contact.name}</span> | <span>{contact.email}</span> |{' '}
                <span>{contact.phone}</span>
                <button onClick={() => handleDelete(contact._id)}>
                  Delete
                </button>
                <button onClick={() => handleEditClick(contact)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContactList
