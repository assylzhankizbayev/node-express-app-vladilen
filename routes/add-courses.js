const {Router} = require('express')
const router = new Router()
const Course = require('../models/course')

router.get('/', (req, res, next) => {
    res.render('add-courses', {
        title: 'Add new courses',
        isAddCourses: true
    })
})

router.post('/', async (req, res, next) => {
    const course = new Course(
        req.body.name,
        req.body.price,
        req.body.img
    )
    await course.save()
    res.redirect('/courses')
})

module.exports = router