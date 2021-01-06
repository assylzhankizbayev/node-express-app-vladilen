const express = require('express')
const exhbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addCourseRoutes = require('./routes/add-course')
const cartRoutes = require('./routes/cart')
const path = require('path')

const app = express()

// port
const PORT = process.env.PORT || 3000

// handlebars setup
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// parser for post/put requests
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add-course', addCourseRoutes)
app.use('/cart', cartRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})