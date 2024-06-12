const deliverAtHomeRadioBtn = document.querySelector('#deliver-box');
const pickUpRadioBtn = document.querySelector('#pick-up-box');
const pickUpAtHortaBtn = document.querySelector('#horta');
const pickUpAtMercadoBtn = document.querySelector('#praca');
const deliverSection = document.querySelector('.deliver-sec');
const pickUpSection = document.querySelector('.pick-up-sec');
const pickUpHortaSection = document.querySelector('.horta-pick-up-sec');
const allInputs = document.querySelectorAll('input')
 
// when user click on button 'Entrega', the sections that are not related with delivery dissapear
function disableInputs () {
    allInputs.forEach(el => {
        el.setAttribute('readonly', true)
    })
}

disableInputs()

function enableInputs () {
    allInputs.forEach(el => {
        el.removeAttribute('readonly', true)
    })
}

deliverAtHomeRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.add('hide-section');
    pickUpHortaSection.classList.add('hide-section');
    deliverSection.classList.remove('hide-section');
    enableInputs()
});

// when user click on button 'Levantar', the sections that are not related with Pick Up dissapear
pickUpRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.remove('hide-section');
    pickUpHortaSection.classList.remove('hide-section');
    deliverSection.classList.add('hide-section');
    enableInputs()
});

pickUpAtMercadoBtn.addEventListener('click', () => {
    pickUpHortaSection.classList.add('hide-section')
});

pickUpAtHortaBtn.addEventListener('click', () => {
    pickUpHortaSection.classList.remove('hide-section')
});

// code to validate data like name, address, email...

const clientName = document.querySelector('#name');
const errorMessage = document.querySelector('.error-message');
const submitBtn = document.querySelector('.send-user-data-btn');
const validMessage = "* Preenchimento Obrigatório"
const invalidMessage = "Algo está errado! Verifica os dados inseridos."

// CHECK IF NAME IS VALID
clientName.addEventListener('input', () => {

    let regex = new RegExp (/^[a-z][a-z\s\ã\à\á\í\ó]+$/, "gi");
    let string = clientName.value;

    if (regex.test(string) === true) {
        clientName.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    else {
        clientName.style.borderBottomColor = 'var(--red)'
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage 
        errorMessage.style.color = "var(--red)"
    }
})

// CHECK IF EMAIL IS VALID

const clientEmail = document.querySelector('#email');


email.addEventListener('input', () => {

    let regex = /^([0-9]|[a-z]|.|_)+\b@\b[a-z]{2,6}\.[a-z]{2,3}$/g
    let string = email.value;

    if (regex.test(string) === true) {
        email.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage
        errorMessage.style.color = "var(--orange)" 
        return
    }
    else {
        email.style.borderBottomColor = 'var(--red)'
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage 
        errorMessage.style.color = "var(--red)"
    }

})


// CHECK IF PHONE NUMBER IS VALID

const clientPhoneNumber = document.querySelector('#phone-number')

clientPhoneNumber.addEventListener('input', () => {

    let regex = /^9\d{8}$/g
    let string = clientPhoneNumber.value;

    if (regex.test(string) === true) {
        clientPhoneNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    if (clientPhoneNumber.value == "") {
        clientPhoneNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage
        errorMessage.style.color = "var(--orange)" 
    }
    else {
        clientPhoneNumber.style.borderBottomColor = 'var(--red)'
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage
        errorMessage.style.color = "var(--red)" 
    }

})


//CHECK IF CODIDO POSTAL IS VALID

const firstCPNumber = document.querySelector('#cp');
const secondCPNumber = document.querySelector('#cP');

firstCPNumber.addEventListener('input', () => {

    let regex = /^\d{4}$/g
    let string = firstCPNumber.value;

    if (regex.test(string) === true) {
        firstCPNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    if (firstCPNumber.value == "") {
        firstCPNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage
        errorMessage.style.color = "var(--orange)" 
    }
    else {
        firstCPNumber.style.borderBottomColor = 'var(--red)'
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage
        errorMessage.style.color = "var(--red)" 
    }
})

secondCPNumber.addEventListener('input', () => {

    let regex = /^\d{3}$/g
    let string = secondCPNumber.value;

    if (regex.test(string) === true) {
        secondCPNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    if (secondCPNumber.value == "") {
        secondCPNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage
        errorMessage.style.color = "var(--orange)" 
    }
    else {
        secondCPNumber.style.borderBottomColor = 'var(--red)'
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage
        errorMessage.style.color = "var(--red)" 
    }
})

//CHECK IF LOCALIDADE IS VALID

const clientAddressLocal = document.querySelector('#address-local');

clientAddressLocal.addEventListener('input', () => {

    let regex = new RegExp (/^[a-z][a-z\s\ã\à\á\í\ó]+$/, "gi");
    let string = clientAddressLocal.value;

    if (regex.test(string) === true) {
        clientAddressLocal.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    else {
        clientAddressLocal.style.borderBottomColor = 'var(--red)'
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage 
        errorMessage.style.color = "var(--red)"
    }

})

// SUBMIT BUTTON TO SEND DATA AND CLEAR CART 

function updateCartAndSubmit () { 
    submitBtn.addEventListener('click', () => {
        getCartItemsFromLocalStorage()
        clearCart()
        location.reload()
    })
}

updateCartAndSubmit()

function clearCart () {
    let cart = JSON.parse(localStorage.getItem('cart'))
        cart = []
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload()
}

// SEND ITEMS INSIDE CART TO COMPANY EMAIL 

function getCartItemsFromLocalStorage () {
    let cartBuy = document.querySelector('.cart-items-selected')
    let cart = JSON.parse(localStorage.getItem('cart'))
    
    cart.forEach(el => {
        let quantityBuy = el.itQuantity
        let nameBuy = el.itName

        let newItem = `
            <input type="hidden" value="${quantityBuy}">
            <input type="hidden" value="${nameBuy}"
        `
        cartBuy.append(newItem)
        console.log(cartBuy)
    })

    

}

