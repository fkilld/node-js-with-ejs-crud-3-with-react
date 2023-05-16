import './App.css'
import ContactList from './ContactList'
import AddContact from './AddContact'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [contacts, setContacts] = useState([])

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/contacts')
      setContacts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleNewContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact])
  }

  return (
    <div className='App'>
      <h1>Contacts</h1>
      <ContactList contacts={contacts} fetchContacts={fetchContacts} />
    </div>
  )
}

export default App
