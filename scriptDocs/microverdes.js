// import {updateNumbItemsOnCart} from '/script.js';

const secMicroverdes = document.querySelector('.microverdes');

async function callMicroverdes () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callMicroverdes();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    } 

    for (let i = 0; i < object.microverdes.length; i++) {

        let microverdesName = object.microverdes[i].name;
        let microverdesPrice = object.microverdes[i].price;
        let image = object.microverdes[i].image;
        
        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secMicroverdes.innerHTML += `
        <div class="boxItem">
            <h3 id="itName">${microverdesName}</h3>
            <img src="${image}" alt="">
            <div class="kiloPrice">${microverdesPrice}€/Kg</div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <!-- <option value="">Quantidade</option> -->
                <option value="25gr">25 gr</option>
                <option value="50gr">50 gr</option>
                <option value="75gr">75 gr</option>
                <option value="100gr">100 gr</option>
                <option value="150gr">150 gr</option>
                <option value="200gr">200 gr</option>
                <option value="250gr">250 gr</option>
                <option value="500gr">500 gr</option>
                <option value="1Un">1 Un</option>
                <option value="2Un">2 Un</option>
                <option value="3Un">3 Un</option>
            </select>
            <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
            <div class="priceToPay"></div>
            <button class="addToCart btn btn-success" disabled>Comprar</button>
        </div>
        `
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
            }, 3000);
        }
        function addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal) {
            let itemObj = JSON.parse(localStorage.getItem('cart'))
           
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
                    qt = parseFloat(kiloPrice[i].textContent);

                    if (kg >= 1) {
                        priceToPay = kg * (qt)
                        finalItemPrice[i].textContent = priceToPay + ' €'

                    }
                    if (kg > 3) {
                        priceToPay = kg * (qt/1000)
                        priceToPay = priceToPay.toFixed(2)
                        finalItemPrice[i].textContent = priceToPay + ' €'
                        return priceToPay
                    }
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