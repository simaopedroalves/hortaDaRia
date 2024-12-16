// import {updateNumbItemsOnCart} from '/script.js'


const autoResponseMessage = document.querySelector('#autoResponseMessage');
const email = document.querySelector('#email');
const clientMessage = document.querySelector('#clientMessage');
const submitBtn = document.querySelector('#submitBtn');
const clientName = document.querySelector('#name');
const subjectNewMessage = document.querySelector('#newMessage')
const phoneNumber = document.querySelector('#phoneNumber')
const errorMessage = document.querySelector('.obligationOrErrorMessage')
const validMessage = "* Preenchimento obrigatório"
const invalidMessage = "Algo está errado! Verifica os dados inseridos."

// RESPOSTA AUTOMATICA DO NETLIFY PARA O CLIENTE

submitBtn.addEventListener('click', () => {

    subjectNewMessage.value = "Mensagem de " + clientName.value;
})




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

phoneNumber.addEventListener('input', () => {

    let regex = /^9\d{8}$/g
    let string = phoneNumber.value;

    if (regex.test(string) === true) {
        phoneNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    if (phoneNumber.value == "") {
        phoneNumber.style.borderBottomColor = 'var(--green)'
        submitBtn.disabled = false
        errorMessage.textContent = validMessage
        errorMessage.style.color = "var(--orange)" 
 
    }
    else {
        phoneNumber.style.borderBottomColor = 'var(--red)'
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage
        errorMessage.style.color = "var(--red)" 
    }

})

updateNumbItemsOnCart()

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('nav .article-number');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];


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
