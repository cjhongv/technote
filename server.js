if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'))
app.listen(process.env.PORT || 5000)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.redirect('/articles')
})


app.use('/articles', articleRouter)