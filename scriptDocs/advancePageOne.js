const deliverAtHomeRadioBtn = document.querySelector('#deliver-box');
const pickUpRadioBtn = document.querySelector('#pick-up-box');
const pickUpAtHortaBtn = document.querySelector('#horta');
const pickUpAtMercadoBtn = document.querySelector('#praca');
const deliverSection = document.querySelector('.deliver-sec');
const pickUpSection = document.querySelector('.pick-up-sec');
const pickUpHortaSection = document.querySelector('.horta-pick-up-sec');
const allInputs = document.querySelectorAll('input');
 
// the user needs to choose if he want a delivery or pick up the products
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

// when user click on radio button 'Entrega', the sections that are 
//not related with delivery dissapear

deliverAtHomeRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.add('hide-section');
    pickUpHortaSection.classList.add('hide-section');
    deliverSection.classList.remove('hide-section');
    enableInputs()
    addRequiredAttribute()
});

// when user click on radio button 'Levantar', the sections that are not 
//related with Pick Up dissapear
pickUpRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.remove('hide-section');
    pickUpHortaSection.classList.add('hide-section');
    deliverSection.classList.add('hide-section');
    enableInputs()
    removeRequiredAttribute()
});

pickUpAtMercadoBtn.addEventListener('click', () => {
    pickUpHortaSection.classList.add('hide-section')
});

pickUpAtHortaBtn.addEventListener('click', () => {
    pickUpHortaSection.classList.remove('hide-section')
});

// when the user wants pick up, the input that are required on address section, aren't required 
function removeRequiredAttribute() {
    let previousRequiredElements = document.querySelectorAll('.deliver-sec div input')

    previousRequiredElements.forEach(el => {
        el.removeAttribute('required')
    })
}

// when the user wants a deliver, some input are required on address section
function addRequiredAttribute() {
    let previousRequiredElements = document.querySelectorAll('.deliver-sec div input')

    previousRequiredElements.forEach(el => {
        el.setAttribute('required')
    })
}

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
submitBtn.addEventListener('click', () => {
    // getCartItemsFromLocalStorage()
    clearCart()
    allInputs.value = ''
})

function clearCart () {
    let cart = JSON.parse(localStorage.getItem('cart'))
        cart = []
        localStorage.setItem('cart', JSON.stringify(cart));
}

// SEND ITEMS INSIDE CART TO COMPANY EMAIL 

document.addEventListener('DOMContentLoaded', () => {
    getCartItemsFromLocalStorage()
})

let cartForm = document.forms['hortaDaRiaEncomenda'];
let cartBuy = document.querySelector('.cart-items-selected');

function getCartItemsFromLocalStorage () {
    let cart = JSON.parse(localStorage.getItem('cart'));
   
   //what 

    cart.forEach(el => {

        const quantityBuy = el.itQuantity
        const nameBuy = el.itName

        
        const newItemName = document.createElement('input');
            newItemName.type = 'hidden';
            newItemName.name = 'itemNome';
            newItemName.value = nameBuy;
        
        const newItemQuantity = document.createElement('input')
            newItemQuantity.type = 'hidden';
            newItemQuantity.name = 'itemQuantidade';
            newItemQuantity.value = quantityBuy;

        cartBuy.appendChild(newItemName);
        cartBuy.appendChild(newItemQuantity);

    })
  
    console.log(cartBuy);
    console.log(cartForm);

    console.log(cart);

}

// reload page when the user retroced after submit the form
window.onpageshow = (e) => {
    if(e.persisted) {
        window.location.reload()
    }
}

