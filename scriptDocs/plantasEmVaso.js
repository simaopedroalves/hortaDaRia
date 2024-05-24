import {updateNumbItemsOnCart} from '/script.js';

const secPlantasEmVaso = document.querySelector('.plantasEmVaso');

async function callPlantasEmVaso () {
    return (await fetch('/productsList.json')).json()
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

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secPlantasEmVaso.innerHTML += `
            <div class="boxItem vasosSec">
                <h3 id="itName">${plantasEmVasoName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${plantasEmVasoPrice}€/Un</div>
                <select type="text" min="1" class="quantity" placeholder="Nº de Vasos">
                    <!-- <option value="">Quantidade</option> -->
                    <option value="1UN">1 Un</option>
                    <option value="2UN">2 Un</option>
                    <option value="3UN">3 Un</option>
                    <option value="4UN">4 Un</option>
                    <option value="5UN">5 Un</option>
                    <option value="6UN">6 Un</option>
                </select>
                <div class="priceToPay"></div>
                <button class="addToCart btn btn-success">Comprar</button>
            </div>
        `
        let addCartBtn = document.querySelectorAll('.addToCart');

        function addItem(item) {

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