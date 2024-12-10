// import {updateNumbItemsOnCart} from '/script.js'


const secCabazDois = document.querySelector('.cabaz-dois');

async function callCabazDois() {
    return (await fetch('/ProductsData/cabazes.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {
   
    let object = '';
   
    try {
        object = await callCabazDois();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    // for (let i = 0; i < object.cabazes.length; i++) {

        let cabazName = object.cabazes[1].name;
        let cabazPrice =  object.cabazes[1].price;
        let cabazContent = object.cabazes[1].content;
        let cabazNumOne = object.cabazes[0].open;
        let cabazNumThree = object.cabazes[2].open;
        let createCabaz = object.cabazes[3].open;
        // let imageCabazOne = object.cabazes[0].image;
        // let imageCabazTwo = object.cabazes[1].image;
        // let imageCabazThree = object.cabazes[2].image;
        // let imageCreateCabaz = object.cabazes[3].image;

      
        // console.log(cabazContent)
        // console.log(typeof(cabazContent.toString()))

        cabazContent = cabazContent.toString().replaceAll(',', '<br>');
        // cabazContent = cabazContent.toString().replaceAll(',', ' + ');

        secCabazDois.innerHTML += `
            <div class="cabaz-box">

                <h2 class="cabaz-name-title">${cabazName}</h2>
                <span class="cabazPrice">${cabazPrice} €</span>
                

                <div class="cabaz-content">
                    <div class="cabaz-list">
                        ${cabazContent}
                    </div>
                    <button type="button" class="add-to-cart-button-number-two">Adicionar ao Carrinho</button>
                </div>
            </div>

            <div class="sugestionsContent">
                <h4 class="sugestionsTitle">Outras Sugestões:</h4>
                    <div class="sugestionOne sugestion">
                        <a href="${cabazNumOne}">
                            <span>Cabaz pequeno</span>
                        </a>
                    </div> 

                    <div class="sugestionTwo sugestion">
                        <a href="${cabazNumThree}">
                            <span>Cabaz grande</span>
                        </a>
                    </div>

                    <div class="sugestionThree sugestion">
                        <a href="${createCabaz}">
                            <span>Criar Cabaz</span>
                        </a>
                    </div>

            </div>

        `

        let sugOne = document.querySelector('.sugestionOne')
            
        sugOne.addEventListener('click', () => {
            window.open(`${newPage}`)
        })
            
    // }
    addCabazToCart()
    updateNumbItemsOnCart()
    disabledAllOrders()

})

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('nav .article-number');
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

function addCabazToCart() {

    let addToCartBtn = secCabazDois.querySelector('.add-to-cart-button-number-two');

    addToCartBtn.addEventListener('click', () => {
        let name = secCabazDois.querySelector('.cabaz-name-title').textContent;
        let quantity = 1
        let itemPrice = secCabazDois.querySelector('.cabazPrice').textContent
        let itemTotal = itemPrice;
        let cart = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0; i < cart.length; i++) {
           
            if (cart[i].itQuantity > 1) {
                cart[i].itQuantity = quantity + 1
            }
        }

         cart.push({
                    itName: name,
                    itImageSrc: "",
                    itPrice: itemPrice,
                    itQuantity: quantity + " Cabaz",
                    itTotal: itemTotal
                })

        localStorage.setItem('cart', JSON.stringify(cart))
        updateNumbItemsOnCart()
        showAllert(name)
    
    })

}

addCabazToCart()

function showAllert (name) {
    let alert = document.querySelector('.alert');
    alert.classList.add('show-alert');

    alert.innerHTML = `
        <span class="cart-changed-message">${name} adicionado(a) ao Cesto</span>
        <button class="see-cart">
            <a href="/html/carrinho.html">
                Ver Carrinho
            </a> 
        </button>
    `

    setTimeout(() => {
        alert.classList.remove('show-alert')
    }, 2000);
}

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('nav .article-number');
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
