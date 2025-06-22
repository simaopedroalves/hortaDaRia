// import {updateNumbItemsOnCart} from '/script.js'

import { findStockOfItems } from "../script.js";

const secSaladas = document.querySelector('.saladas');

async function callSaladas () {
    return (await fetch('/ProductsData/saladas.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callSaladas();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.saladas.length; i++) {
        
        let saladaName = object.saladas[i].name;
        let saladaPrice = object.saladas[i].price;
        let image = object.saladas[i].image;
        let stock = object.saladas[i].stock;
        let product_id = object.saladas[i].productId;
        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secSaladas.innerHTML += `
        <div class="boxItem" id="${product_id}">
            <h3 id="itName">${saladaName}</h3>
            <img src="${image}" alt="">
            <div class="kiloPrice">${saladaPrice}€/kg</div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <option class="no-stock-message" value="qt">Quantidade</option>
                <option value="100 gr">100 gr</option>
                <option value="250 gr">250 gr</option>
                <option value="500 gr">500 gr</option>
                <option value="750 gr">750 gr</option>
                <option value="1 Kg">1 Kg</option>
            </select>
            <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
            <div class="priceToPay"></div>
            <button class="addToCart btn btn-success" disabled>Comprar</button>
        </div>
        `

          // function on script.js
          findStockOfItems (stock, product_id)

            let addCartBtn = document.querySelectorAll('.addToCart');
    
            // let itemObj = [];
    
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

                        let qtText = selectedOptionValue[i].value;
                        let addCartBtn = btn.parentElement.querySelector('.addToCart')
                      
    
                        if (kg > 10) {
                            priceToPay = kg * (qt/1000)
                            priceToPay = priceToPay.toFixed(2)
                            finalItemPrice[i].textContent = priceToPay + ' €'
    
                        }  
    
                        else if (qtText === "qt") {
                            finalItemPrice[i].textContent = ''
                            addCartBtn.setAttribute("disabled", "")
                        }   
    
                        else {
                            priceToPay = kg * (qt)
                            priceToPay = priceToPay.toFixed(2)
                            finalItemPrice[i].textContent = priceToPay + ' €'
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


let screenWidth = window.innerWidth;
console.log(`Screen width: ${screenWidth}px`);
