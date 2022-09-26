require('dotenv').config()

const express = require('express')

// import route
const router = require('./src/routes')
// import cors
const cors = require('cors');

const app = express()

const port = 5000

app.use(express.json())
app.use(cors())

// grouping route
app.use('/api/v1/', router)

// untuk menampilkan gambar
app.use('/uploads', express.static('uploads'))

// app diganti server pas soket io
app.listen(port, () => console.log(`Listening on port ${port}!`))