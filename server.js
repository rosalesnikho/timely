const express  = require('express')
const mongoose = require('mongoose')
const ShortURL = require('./models/shorturl.model')
const app = express()

mongoose.connect('mongodb://localhost/shorty_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Sets the View Engine to EJS
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))



// URL Routes
app.get('/', async (req, res) => {
    const allShortUrls = await ShortURL.find()
    res.render('index', {allShortUrls: allShortUrls})
})

app.post('/chopped', async (req, res) => {
    await ShortURL.create({ fullURL: req.body.fullURL})
    res.redirect('/')
})

app.get('/:shortVal', async(req, res) => {
    const shortVal = await ShortURL.findOne({shortURL: req.params.shortVal})
    if(shortVal == null) return res.sendStatus(404)
    shortVal.clickURL++
    shortVal.save()

    res.redirect(shortVal.fullURL)
})

// ENV Ports
app.listen(process.env.PORT || 8000);
