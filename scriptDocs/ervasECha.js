import {updateNumbItemsOnCart} from '/script.js';

const secErvas = document.querySelector('.ervas');
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
       
            //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
            if (image == '') {
                image = "/images/logo.png";
            }
        
        // console.log('Nome ' + ervaName + '\n' + 'Preço: ' + ervaPrice)
        
        secErvas.innerHTML += `
            <div class="boxItem">
                <h3 id="itName">${ervaName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${ervaPrice}€/Kg</div>
                <select type="text" min="1" class="quantity" placeholder="quantidade">
                    <!-- <option value="">Quantidade</option> -->
                    <option value="15gr">15 gr</option>
                    <option value="25gr">25 gr</option>
                    <option value="50gr">50 gr</option>
                    <option value="100gr">100 gr</option>
                    <option value="250gr">250 gr</option>
                    <option value="500gr">500 gr</option>
                </select>
                <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
                <div class="priceToPay"></div>
                <button class="addToCart btn btn-success">Comprar</button>
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
                })
            })
        }

        addItem()

        function refreshItemSelected (btn) {
            let name = btn.parentElement.querySelector('#itName').textContent;

            btn.parentElement.querySelector('.priceToPay').textContent = '';
            alert(`${name} foi adicionado ao cesto!`)
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
            console.log(itemObj)
            localStorage.setItem('cart', JSON.stringify(itemObj))

        }
                    
        let selectedOptionValue = document.querySelectorAll('.quantity');
        let kiloPrice = document.querySelectorAll('.kiloPrice');
        let finalItemPrice = document.querySelectorAll('.priceToPay'); 

        selectedOptionValue.forEach((btn, i) => {

            btn.addEventListener('click', () => {           

                function finalPricePerItem (kg, qt) {
                    var priceToPay = 0;
                    kg = parseFloat(selectedOptionValue[i].value);
                    qt = parseFloat(kiloPrice[i].textContent)
                    priceToPay = kg * (qt/1000)
                    priceToPay = priceToPay.toFixed(2)
                    finalItemPrice[i].textContent = priceToPay + ' €'
                    return priceToPay

                }

                finalPricePerItem() 
            })
            
        })
    }

    updateNumbItemsOnCart()
})
    // for (let i = 0; i < object.ervasAromaticasECha.length; i++) {


        
       // updateNumbItemsOnCart()
    // }



