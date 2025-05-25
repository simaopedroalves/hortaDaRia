const allFamilyImages = document.querySelectorAll('.all-products .photo-div-product img');

allFamilyImages.forEach(image => {
    image.setAttribute('loading', 'lazy');
})

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('div .article-number');
    let cart = JSON.parse(localStorage.getItem('cart'));

    numbOfItemsOnCart.forEach(el => {
        el.textContent = '0'

        for (let i = 0; i < cart.length; i++) {
            if (cart.length > 0) {
                el.textContent = cart.length
            }
            if (cart.length <= 0) {
                el.textContent = '0'
            }
        }
    })
}

updateNumbItemsOnCart()

// reload page when the user retroced after submit the form
window.onpageshow = (e) => {
    if(e.persisted) {
        window.location.reload()
    }
}

