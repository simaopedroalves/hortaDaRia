// import {updateNumbItemsOnCart} from '/script.js'


const secSaladas = document.querySelector('.saladas');

async function callSaladas () {
    return (await fetch('/productsList.json')).json()
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
        
        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secSaladas.innerHTML += `
        <div class="boxItem">
            <h3 id="itName">${saladaName}</h3>
            <img src="${image}" alt="">
            <div class="kiloPrice">${saladaPrice}€/kg</div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <!-- <option value="">Quantidade</option> -->
                <option value="100gr">100 gr</option>
                <option value="250gr">250 gr</option>
                <option value="500gr">500 gr</option>
                <option value="750gr">750 gr</option>
                <option value="1Kg">1 Kg</option>
                <option value="2Kg">2Kg</option>
                <option value="1Un">1 Unidade</option>
                <option value="2Un">2 Unidades</option>
            </select>
            <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
            <div class="priceToPay"></div>
            <button class="addToCart btn btn-success">Comprar</button>
        </div>
        `
            let addCartBtn = document.querySelectorAll('.addToCart');
    
            let itemObj = [];
    
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