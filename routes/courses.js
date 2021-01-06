const {Router} = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', async (req, res) => {
    const courses = await Course.getAll()

    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.get(req.params.id)

    res.render('course', {
        title: `Course ${ course.title }`,
        isCourses: true,
        course
    })
})

router.get('/:id/edit', async (req, res) => {
    if (req.query.allow !== 'true') {
        return res.redirect('/')
    }

    const course = await Course.get(req.params.id)

    res.render('course-edit', {
        title: `Edit course ${ course.title }`,
        isCourses: true,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})

module.exports = router