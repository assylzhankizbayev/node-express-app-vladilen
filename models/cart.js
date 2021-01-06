const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
    static async add(course) {
        const cart = await Cart.fetch()

        const courseInCart = cart.courses.find(c => c.id === course.id)

        if (courseInCart) {
            courseInCart.count++
        } else {
            cart.courses.push({ ...course, isInCart: true, count: 1 })
        }

        cart.price += +course.price

        return new Promise( (resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                } 
            })
        })
    }

    static async remove(id) {
        const cart = await Cart.fetch()
        const idx = cart.courses.findIndex(c => c.id === id)
        const course = cart.courses[idx]

        if (course.count === 1) {
            cart.courses = cart.courses.filter(c => c.id !== id)
        } else {
            course.count--
        }

        cart.price -= course.price

        return new Promise( (resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(cart)
                } 
            })
        })
    }

    static async fetch() {
        return new Promise( (resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Cart