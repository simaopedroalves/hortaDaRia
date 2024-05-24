const openMenu = document.querySelector('.openMenu');
const menu = document.querySelector('.menu-list');
// OPEN AND CLOSE THE MENU

openMenu.addEventListener('click', () => {
    menu.classList.toggle('show')
    openMenu.classList.toggle('fa-x')
})
// menu de cabazes na pagina principal
const cabazOne = document.querySelector('.cabazOne')
const cabazTwo = document.querySelector('.cabazTwo')
const cabazThree = document.querySelector('.cabazThree')
const cabazFour = document.querySelector('.cabazFour')

// let cart = JSON.parse(localStorage.getItem('cart'));
// let products = JSON.parse(localStorage.getItem('products'));

async function callData() {
    return (await fetch('/productsList.json')).json()
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

    let nameOne = object.cabazes[0].name
    let priceOne = object.cabazes[0].price
        // let imageCabazOne = object.cabazes[0].image;
        // let imageCabazTwo = object.cabazes[1].image;
        // let imageCabazThree = object.cabazes[2].image;
        // let imageCreateCabaz = object.cabazes[3].image;

        cabazOne.innerHTML = `
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


       
})

// update number of items to be equal to the number
// displayed on basket on top of the page
export function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('nav .article-number');

    numbOfItemsOnCart.forEach(el => {
        el.textContent = '0'
        let cart = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0; i < cart.length; i++) {
            if (cart.length > 0) {
                el.textContent = cart.length
            }
            if (cart.length <= 0) {
                el.textContent = '0'
            }
            // else {return}
        }
    })
}

updateNumbItemsOnCart()
