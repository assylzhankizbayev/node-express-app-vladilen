document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('ru-RU', {
        currency: 'kzt',
        style: 'currency'
    }).format(node.textContent)
})