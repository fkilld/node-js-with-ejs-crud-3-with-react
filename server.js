const express = require('express')
const app = express()
const router = require('./routes')
const dbConnect = require('./db')
const methodOverride = require('method-override')
const cors = require('cors')
app.set('view engine', 'ejs')

app.use(cors())
dbConnect()
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/contacts', router)

app.listen(5000, () => console.log('Server is running on port 5000'))
