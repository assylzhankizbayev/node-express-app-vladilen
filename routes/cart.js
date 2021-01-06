const { Router } = require('express')
const router = Router()

const Cart = require('../models/cart')
const Course = require('../models/course')

router.get('/', async (req, res) => {
    const cart = await Cart.fetch()
    
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        courses: cart.courses,
        price: cart.price
    })
})

router.post('/add', async (req, res) => {
    const course = await Course.get(req.body.id)
    await Cart.add(course)
    res.redirect('/cart')
})

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.remove(req.params.id)
    res.json(cart)
})

module.exports = router