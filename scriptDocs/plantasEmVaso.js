// import {updateNumbItemsOnCart} from '/script.js';
import { findStockOfItems } from "../script.js";

const secPlantasEmVaso = document.querySelector('.plantasEmVaso');

async function callPlantasEmVaso () {
    return (await fetch('/ProductsData/plantasEmVaso.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callPlantasEmVaso();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.plantasEmVaso.length; i++) {
        
        let plantasEmVasoName = object.plantasEmVaso[i].name;
        let plantasEmVasoPrice = object.plantasEmVaso[i].price;
        let image = object.plantasEmVaso[i].image;
        let stock = object.plantasEmVaso[i].stock;
        let product_id = object.plantasEmVaso[i].productId;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secPlantasEmVaso.innerHTML += `
            <div class="boxItem" id="${product_id}">
                <h3 id="itName">${plantasEmVasoName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${plantasEmVasoPrice}€/Un</div>
                <select type="text" min="1" class="quantity" placeholder="Nº de Vasos">
                    <option value="qt">Quantidade</option>
                    <option value="1UN">1 Un</option>
                    <option value="2UN">2 Un</option>
                    <option value="3UN">3 Un</option>
                    <option value="4UN">4 Un</option>
                    <option value="5UN">5 Un</option>
                    <option value="6UN">6 Un</option>
                </select>
                <div class="priceToPay"></div>
                <button class="addToCart btn btn-success" disabled>Comprar</button>
            </div>
        `

        // function on script.js
        findStockOfItems (stock, product_id)

        let addCartBtn = document.querySelectorAll('.addToCart');

        function addItem() {

            addCartBtn.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    btn = event.target;
                    let name = btn.parentElement.querySelector('#itName').textContent;
                    let imageSrc = btn.parentElement.querySelector('img').src;
                    let itemPrice = btn.parentElement.querySelector('.kiloPrice').textContent;
                    let quantity = btn.parentElement.querySelector('.quantity').value;
                    let itemTotal = btn.parentElement.querySelector('.priceToPay').textContent;
                    addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal)
                    updateNumbItemsOnCart() 
                    refreshItemSelected(btn)
                    showAllert(name)
                    btn.setAttribute("disabled", "")
                })
            })
        }

        addItem()

        function refreshItemSelected (btn) {
            btn.parentElement.querySelector('.priceToPay').textContent = '';
        }

        function showAllert (name) {
            let alert = document.querySelector('.alert');
            alert.classList.add('show-alert');

            alert.innerHTML = `
                <span class="cart-changed-message">${name} adicionado(a) ao Cesto</span>
                <button class="see-cart">
                    <a href="/html/carrinho.html">
                        Ver Cesto
                    </a> 
                </button>
            `

            setTimeout(() => {
                alert.classList.remove('show-alert')
            }, 2000);
        }

        function addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal) {
            let itemObj = JSON.parse(localStorage.getItem('cart'))

            if (itemObj === null) {
                itemObj = []
            }
           
            itemObj.push({
                itName: name,
                itImageSrc: imageSrc,
                itPrice: itemPrice,
                itQuantity: quantity,
                itTotal: itemTotal
            })
            localStorage.setItem('cart', JSON.stringify(itemObj))

        }
                    
        let selectedOptionValue = document.querySelectorAll('.quantity');
        let kiloPrice = document.querySelectorAll('.kiloPrice');
        let finalItemPrice = document.querySelectorAll('.priceToPay'); 
            
        selectedOptionValue.forEach((btn, i) => {

            btn.addEventListener('change', () => {           

                function finalPricePerItem (kg, qt) {
                    var priceToPay = 0;
                    kg = parseFloat(selectedOptionValue[i].value);
                    qt = parseFloat(kiloPrice[i].textContent)
                    priceToPay = kg * (qt)
                    priceToPay = priceToPay.toFixed(2)
                    finalItemPrice[i].textContent = priceToPay + ' €'
                    
                    let qtText = selectedOptionValue[i].value;
                    let addCartBtn = btn.parentElement.querySelector('.addToCart')
                    
                    if (qtText === "qt") {
                        finalItemPrice[i].textContent = ''
                        addCartBtn.setAttribute("disabled", "")
                    }

                    return priceToPay

                }

                let buyBtn = btn.parentElement.querySelector('.addToCart');
                buyBtn.removeAttribute('disabled'); 

                finalPricePerItem() 
            })
            
        })
    }
    updateNumbItemsOnCart()

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