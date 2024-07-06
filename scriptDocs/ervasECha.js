// import {updateNumbItemsOnCart} from '/script.js';

const section = document.querySelector('.ervas');
// const cartList = document.querySelector('.shopping-cart')
// let products = JSON.parse(localStorage.getItem('products'));

async function callErvas() {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {
   
    let object = '';
   
    try {
        object = await callErvas();

    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    for (let i = 0; i < object.ervasAromaticasECha.length; i++) {
     
        let ervaName = object.ervasAromaticasECha[i].name;
        let ervaPrice = object.ervasAromaticasECha[i].price;
        let image = object.ervasAromaticasECha[i].image;
        // let resultado = document.querySelectorAll('.priceToPay');
        let stock = object.ervasAromaticasECha[i].stock;
        let product_id = object.ervasAromaticasECha[i].productId;

            //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
            if (image == '') {
                image = "/images/logo.png";
            }
        
        section.innerHTML += `
            <div class="boxItem" id="${product_id}">
                <h3 id="itName">${ervaName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${ervaPrice}€/Kg</div>
                <select type="text" min="1" class="quantity" placeholder="quantidade">
                    <option value="qt">Quantidade</option>
                    <option value="15gr">15 gr</option>
                    <option value="25gr">25 gr</option>
                    <option value="50gr">50 gr</option>
                    <option value="100gr">100 gr</option>
                    <option value="250gr">250 gr</option>
                    <option value="500gr">500 gr</option>
                </select>
                <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
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
                        Ver Carrinho
                    </a> 
                </button>
            `

            setTimeout(() => {
                alert.classList.remove('show-alert')
            }, 2000);
        }

        // THIS FUNCTION ALLOWS TO ADD THE ITEM SELECTED TO LOCALSTORAGE
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

        // THE BUTTON BUY, ARE DISABLED, AND ONLY TURN TO ENABLED WHEN THE  
        //USER SELECT THE QUANTITY OF THE RESPECTIVE ITEM
        // ALSO MAKES THE TOTAL PRICE PER ITEM CALCULATION 
        selectedOptionValue.forEach((btn, i) => {

            btn.addEventListener('change', () => {           
              
                function finalPricePerItem (kg, qt) {
                    var priceToPay = 0;
                    kg = parseFloat(selectedOptionValue[i].value);
                    qt = parseFloat(kiloPrice[i].textContent);

                    let qtText = selectedOptionValue[i].value;
                    let addCartBtn = btn.parentElement.querySelector('.addToCart')

                    if (qtText === "qt") {
                        finalItemPrice[i].textContent = ''
                        addCartBtn.setAttribute("disabled", "")
                    }
                    else {
                    priceToPay = kg * (qt/1000)
                    priceToPay = priceToPay.toFixed(2)
                    finalItemPrice[i].textContent = priceToPay + ' €'
                    addCartBtn.removeAttribute("disabled")
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
  
// THE NUMBER OF ITEMS INSIDE CART IS UPDATED
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
