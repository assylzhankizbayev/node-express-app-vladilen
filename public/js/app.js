const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'kzt',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

const $cartList = document.querySelector('#cart-list')

if ($cartList) {
    $cartList.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove')) {
            const id = event.target.dataset.id 

            fetch(`/cart/remove/${id}`, { method: 'delete' })
            .then(res => res.json())
            .then(cart => {
                if (cart.courses.length) {
                    const html = cart.courses.map(c => {
                        return `
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td>
                                <button type="button" class="btn btn-small btn-remove" data-id="${c.id}">Delete</button>
                            </td>
                        </tr>`
                    }).join('')

                    $cartList.querySelector('tbody').innerHTML = html
                    $cartList.querySelector('.price').textContent = toCurrency(cart.price)
                } else {
                    $cartList.innerHTML = '<p>Empty cart</p>'
                }
            })
        }
    })
}