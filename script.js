

const openMenu = document.querySelector('.openMenu');
const menu = document.querySelector('.menu-list');
// OPEN AND CLOSE THE MENU

openMenu.addEventListener('click', () => {
    menu.classList.toggle('show')
    openMenu.classList.toggle('fa-x')
})

// menu de cabazes na pagina principal
const cabazOne = document.querySelector('.cabazOne');
const cabazTwo = document.querySelector('.cabazTwo')
const cabazThree = document.querySelector('.cabazThree')
const cabazFour = document.querySelector('.cabazFour')


async function callData() {
    return (await fetch('/ProductsData/cabazes.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = ''

    try {
        object = await callData();
    }
    catch (error) {
        console.error('ERROR')
        console.log(error)
    }

        let nameOne = object.cabazes[0].name;
        let priceOne = object.cabazes[0].price;

        cabazOne.innerHTML += `
             <div class="cabazContent">
                <h4 class="cabazName">${nameOne}</h4>
                <span class="cabazPrice">${priceOne}€</span>
            </div>
        `

        let nameTwo = object.cabazes[1].name
        let priceTwo = object.cabazes[1].price

        cabazTwo.innerHTML = `
            <div class="cabazContent">
                <h4 class="cabazName">${nameTwo}</h4>
                <span class="cabazPrice">${priceTwo}€</span>
            </div>
        `
        let nameThree = object.cabazes[2].name
        let priceThree = object.cabazes[2].price

        cabazThree.innerHTML = `
            <div class="cabazContent">
                <h4 class="cabazName">${nameThree}</h4>
                <span class="cabazPrice">${priceThree}€</span>
            </div>
        `
        let nameFour = object.cabazes[3].name
        let priceFour = object.cabazes[3].price

        cabazFour.innerHTML = `
            <div class="cabazContent">
                <h4 class="cabazName">${nameFour}</h4>
            </div>
        `

        // termsAndConditions()
})


// update number of items to be equal to the number
// displayed on basket on top of the page
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
            else return
        }
    })
}

updateNumbItemsOnCart()

// to disable cart order and add a message that says that, using DATE.

let dateNow = new Date()
dateNow = dateNow.toString().split(' ');
dateNow = dateNow[0];

function disabledAllOrders () {

    let orderDisableMessage = document.querySelector('.disable-orders');
  
    if (dateNow == 'Mon' || dateNow == 'Tue' || dateNow == 'Wed')  {
       orderDisableMessage.style.display = 'none'
    }

    else {
        orderDisableMessage.style.display = 'flex'
        
    }
}

 disabledAllOrders()

 
// find inside JSON data if each item have stock or not to display
// a message saying that item his out of stock

export function findStockOfItems (stock, product_id) {
    let box = document.getElementById(product_id)

    if (!stock) {
        box.querySelector('.addToCart').style.visibility = 'hidden'
        box.querySelector('.quantity').style.visibility = 'hidden'
        box.querySelector('.priceToPay').textContent = 'Indisponível'
        box.querySelector('.priceToPay').style.color = 'var(--red)'
        box.querySelector('.priceToPay').style.textTransform = 'upperCase'
        box.style.borderColor = 'var(--red)'
        box.style.textAlign = 'center'
    }
}


// EVENTLISTENER TO CALL HORTA D'RIA ON CLICK BUTTON

const allcallButtons = document.querySelectorAll('.media-and-contacts .contact a');

allcallButtons.forEach((el) => {
    el.href = 'tel:914547465';
});

// FOOTER - MADE BY NAME AND RESERVED RIGHTS

const madeBy = document.querySelector('.my-name');

// madeBy.forEach(nameDescription => {

//     document.addEventListener('DOMContentLoaded', () => {
//         if (nameDescription) {
//             nameDescription.textContent = "Desenvolvido por Simão Pedro";
//         } else {
//             console.error("Element with class 'my-name' not found.");
//         }
//     })
// })

madeBy.textContent = "Desenvolvido por Simão Pedro";

const reservedRigtHs = document.querySelector('.reservedRigths');
if (reservedRigtHs) {
    reservedRigtHs.textContent = "Todos os Direitos Reservados";
} else {
    console.error("Element with class 'reservedRigths' not found.");
}


