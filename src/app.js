const path = require('path')
const express = require('express')
const hbs = require('hbs')
const wtd = require('./modules/wtd-driver')

const app = express()

const public_app_path = path.join(__dirname, '../public')
const templates_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

// Sets express to use handlebars library for dinamic views
app.set('view engine', 'hbs')

// Sets express to use the /templates folders as the dinamic views folder path
app.set('views', templates_path)

// Registers the hbs partials folder
hbs.registerPartials(partials_path)

app.use(express.static(public_app_path))

app.get('', (req, res) => {
    res.render('index', {
        page_title: "Cotações",
        author: "Thiago Lima"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        page_title: "About Me =D",
        author: "Thiago Lima"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        page_title: "Help!",
        author: "Thiago Lima"
    })
})

app.get('/stock', (req, res) => {
    if (!req.query.stock) {
        return res.status(400).json({ error: "Query parameter stock must be informed"})
    }
    
    wtd
        .query_stock_price(req.query.stock)
        .then(data => {
            const { symbol, name, price, currency, day_high, day_low } = data
            return res.status(200).json({ symbol, name, price, currency, day_high, day_low })
        })
        .catch(err => {
            console.log(err)
            res.status(509).json({ error: "stock not found" })
        })
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})