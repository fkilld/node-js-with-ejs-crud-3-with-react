let express = require('express')
let router = express.Router()
let Contact = require('./contactModel')

router.get('/', async (req, res) => {
  try {
    let contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/', async (req, res) => {
  let contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  })

  try {
    let savedContact = await contact.save()
    res.status(201).json(savedContact)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})


router.get('/:contactId', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.contactId)
    res.json(contact)
  } catch (err) {
    res.json({ message: err })
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    let removedContact = await Contact.deleteOne({ _id: req.params.contactId })
    res.json(removedContact)
  } catch (err) {
    res.json({ message: err })
  }
})

router.patch('/:contactId', async (req, res) => {
  try {
    let updatedContact = await Contact.updateOne(
      { _id: req.params.contactId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        },
      }
    )
    res.json(updatedContact)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
