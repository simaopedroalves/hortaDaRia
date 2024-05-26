import {updateNumbItemsOnCart} from '/script.js';  

const secOvos = document.querySelector('.ovos');

async function callOvos () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callOvos();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.ovos.length; i++) {
        
        let ovosName = object.ovos[i].name;
        let ovosPrice = object.ovos[i].price;
        let image = object.ovos[i].image;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secOvos.innerHTML += `
            <div class="boxItem">
                <h3 id="itName">${ovosName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${ovosPrice}€/dúzia</div>
                <select type="text" min="1" class="quantity" placeholder="quantidade">
                    <!-- <option value="">Quantidade</option> -->
                    <option value="1/2-duzia">1/2 dúzia</option>
                    <option value="1-duzia">1 dúzia</option>
                    <option value="duzia_e_meia">dúzia e meia</option>
                    <option value="2-duzias">2 dúzias</option>
                    <option value="3-duzias">3 dúzias</option>
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
                    priceToPay = kg * (qt)
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