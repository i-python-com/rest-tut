const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const indexRouter = require('./routes/index')
const postsRouter = require('./routes/posts')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', indexRouter)
app.use('/posts', postsRouter)

const db = config.get('mongoURI')

// connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// listen to port
app.listen(3000, () => console.log('Server running on port 3000'))
