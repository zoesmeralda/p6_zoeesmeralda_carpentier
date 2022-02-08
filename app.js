const express = require ('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');

require('dotenv').config({ path: process.cwd() + '/.env' });

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

const app = express()
app.use(helmet())

mongoose.connect(process.env.MONGODB,

  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('cross-origin-resource-policy: same-origin')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

app.use(cors({
  origin: '*',
}));

module.exports = app
