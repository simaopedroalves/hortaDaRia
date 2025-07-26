

const deliverAtHomeRadioBtn = document.querySelector('#deliver-box');
const pickUpRadioBtn = document.querySelector('#pick-up-box');
const pickUpAtHortaBtn = document.querySelector('#horta');
// const pickUpAtMercadoBtn = document.querySelector('#praca');
const deliverSection = document.querySelector('.deliver-sec');
const pickUpSection = document.querySelector('.pick-up-sec');
const pickUpHortaSection = document.querySelector('.horta-pick-up-sec');
const allInputs = document.querySelectorAll('input');
const firstCPNumber = document.querySelector('#cp');
 
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
    firstCPNumber.setAttribute('readonly', true)
}


// when user click on radio button 'Entrega', the sections that are 
//not related with delivery dissapear

deliverAtHomeRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.add('hide-section');
    pickUpHortaSection.classList.add('hide-section');
    deliverSection.classList.remove('hide-section');
    enableInputs()
    addRequiredAttribute()
    document.querySelector('#other-schedule').removeAttribute('required')
    document.querySelector('#pick-up-day').removeAttribute('required')

});

// when user click on radio button 'Levantar', the sections that are not 
//related with Pick Up dissapear
pickUpRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.remove('hide-section');
    pickUpHortaSection.classList.remove('hide-section');
    deliverSection.classList.add('hide-section');
    enableInputs()
    removeRequiredAttribute()
    document.querySelector('#deliver-day').removeAttribute('required');
    document.querySelector('#pick-up-day').setAttribute("required", "");
    document.querySelector('#ppick-up-schedule').setAttribute("required", "");
    document.querySelector('#scheduleToDeliverAtHome').removeAttribute('required');
});

// pickUpAtMercadoBtn.addEventListener('click', () => {
//     pickUpHortaSection.classList.add('hide-section');
//     removeRequiredAttribute()
//     document.querySelector('#pick-up-day').removeAttribute('required');
// });

pickUpAtHortaBtn.addEventListener('click', () => {
    pickUpHortaSection.classList.remove('hide-section');
    removeRequiredAttribute()

});

// when the user wants pick up, the input that are required on address section, aren't required 
function removeRequiredAttribute() {
    let previousRequiredElements = document.querySelectorAll('.deliver-sec div input')

    previousRequiredElements.forEach(el => {
        el.removeAttribute('required');
    })

}

// // when the user wants a deliver, some input are required on address section
function addRequiredAttribute() {
    let previousRequiredElements = document.querySelectorAll('.deliver-sec div input');
    let floorInput = document.querySelector('#floor-number');

    previousRequiredElements.forEach(el => {
        el.setAttribute('required', '');
    });

    floorInput.removeAttribute('required')
}

// code to validate data like name, address, email...
const clientName = document.querySelector('#name');
const errorMessage = document.querySelector('.error-message');
const submitBtn = document.querySelector('.send-user-data-btn');
const validMessage = "* Preenchimento Obrigatório"
const invalidMessage = "Algo está errado! Verifica os dados inseridos."

// CHECK IF NAME IS VALID
clientName.addEventListener('input', () => {
    // let label = document.querySelectorAll('label')
    let regex = new RegExp (/^[a-z][a-z\s\ã\à\á\í\ó]+$/, "gi");
    let string = clientName.value;

    if (regex.test(string) === true || string == '') {
        clientName.parentElement.style.color = 'var(--green)'
        submitBtn.disabled = false
        clientName.parentElement.firstElementChild.classList.remove('invalid-input')
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        console.log(string);
        
        localStorage.setItem('clientName', JSON.stringify(string))
        return
    }
    else {
        clientName.parentElement.style.color = 'var(--red)'
        clientName.parentElement.firstElementChild.classList.add('invalid-input')
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage 
        errorMessage.style.color = "var(--red)"
    }
})

// CHECK IF EMAIL IS VALID

const clientEmail = document.querySelector('#email');


clientEmail.addEventListener('input', () => {

    let regex = /^([0-9]|[a-z]|.|_)+\b@\b[a-z]{2,7}\.[a-z]{2,3}$/g
    let string = clientEmail.value;

    if (regex.test(string) === true || string == '') {
        clientEmail.parentElement.style.color = 'var(--green)'
        clientEmail.parentElement.firstElementChild.classList.remove('invalid-input')
        submitBtn.disabled = false
        errorMessage.textContent = validMessage
        errorMessage.style.color = "var(--orange)" 
        return
    }
    else if (string == '') {
        clientEmail.parentElement.style.color = 'var(--green)'
        clientEmail.parentElement.firstElementChild.classList.remove('invalid-input')
        submitBtn.disabled = false
        errorMessage.textContent = validMessage
        errorMessage.style.color = "var(--orange)" 
    }
    else {
        clientEmail.parentElement.style.color = 'var(--red)'
        clientEmail.parentElement.firstElementChild.classList.add('invalid-input')
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

    if (regex.test(string) === true || string == '') {
        clientPhoneNumber.parentElement.style.color = 'var(--green)'
        clientPhoneNumber.parentElement.firstElementChild.classList.remove('invalid-input')
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    else {
        clientPhoneNumber.parentElement.style.color = 'var(--red)'
        clientPhoneNumber.parentElement.firstElementChild.classList.add('invalid-input')
        submitBtn.disabled = true
        errorMessage.textContent = invalidMessage
        errorMessage.style.color = "var(--red)" 
    }

})


//CHECK IF CODIDO POSTAL IS VALID

const secondCPNumber = document.querySelector('#cP');

// firstCPNumber.addEventListener('input', () => {

//     let regex = /^\d{4}$/g
//     let string = firstCPNumber.value;

//     if (regex.test(string) === true || firstCPNumber.value == "") {
//         firstCPNumber.parentElement.parentElement.style.color = 'var(--white)'
//         firstCPNumber.parentElement.parentElement.firstElementChild.classList.remove('invalid-input')
//         submitBtn.disabled = false
//         errorMessage.textContent = validMessage 
//         errorMessage.style.color = "var(--orange)" 
//         return
//     }
//     else {
//         firstCPNumber.parentElement.parentElement.style.color = 'var(--red)'
//         firstCPNumber.parentElement.parentElement.firstElementChild.classList.add('invalid-input')
//         submitBtn.disabled = true
//         errorMessage.textContent = invalidMessage
//         errorMessage.style.color = "var(--red)" 
//     }
// })

secondCPNumber.addEventListener('input', () => {

    let regex = /^\d{3}$/g
    let string = secondCPNumber.value;

    if (regex.test(string) === true || secondCPNumber.value == "") {
        secondCPNumber.parentElement.parentElement.style.color = 'var(--green)'
        secondCPNumber.parentElement.parentElement.firstElementChild.classList.remove('invalid-input')
        submitBtn.disabled = false
        errorMessage.textContent = validMessage 
        errorMessage.style.color = "var(--orange)" 
        return
    }
    else {
        secondCPNumber.parentElement.parentElement.style.color = 'var(--red)'
        secondCPNumber.parentElement.parentElement.firstElementChild.classList.add('invalid-input')
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

const orderSubject = document.querySelector('#newOrderSubject');

// SUBMIT BUTTON TO SEND DATA AND CLEAR CART 
submitBtn.addEventListener('click', () => {
    clearCart()
    allInputs.value = ''
    orderSubject.value = `Encomenda de ${clientName.value}`
})

function clearCart () {
    let cart = JSON.parse(localStorage.getItem('cart'))
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
}



// SEND ITEMS INSIDE CART TO COMPANY EMAIL 

document.addEventListener('DOMContentLoaded', () => {
    getCartItemsFromLocalStorage()
    getTotalToPay()
  
})
const cartForm = document.forms['hortaDaRiaEncomenda'];
const cartBuy = document.querySelector('.cart-items-selected');
const cartContent = document.querySelector('#cartContent')


function getCartItemsFromLocalStorage () {
    let cart = JSON.parse(localStorage.getItem('cart'));
   
    cart.forEach(el => {
        let item = `${el.itQuantity} de ${el.itName}`;
        // let clientCart = JSON.stringify(item);
        cartContent.value += item + "\n"
    })

    console.log(cartContent.value);
    
}

const totalToPayInput = document.querySelector('#totalPriceToPayId');
const finalPrice = JSON.parse(localStorage.getItem('finalPrice'));

function getTotalToPay() {
    totalToPayInput.value = finalPrice + '€';
}

// reload page when the user retroced after submit the form
window.onpageshow = (e) => {
    if(e.persisted) {
        window.location.reload()
    }
}



// DISABLE SUBMIT BUTTON FROM THURSDAY TO SUNDAY BECAUSE
// ORDERS ARE NOT AVAIABLE

let disabledButtonSubmit = () => {

    let dateNow = new Date()
    dateNow = dateNow.toString().split(' ');
    dateNow = dateNow[0];
    dateNow = "Mon";
    
    if (dateNow == 'Mon' || dateNow == 'Tue' || dateNow == 'Wed') {
        submitBtn.style.display = 'flex';
    }

    else {
        submitBtn.style.display = 'none';
    }
}

disabledButtonSubmit()
