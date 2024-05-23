import {updateNumbItemsOnCart} from '/script.js'

const secfloresComestiveis = document.querySelector('.floresComestiveis');

async function callFloresComestiveis () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {
 
    let object = '';

    try {
        object = await callFloresComestiveis();
        // console.log(object.floresComestiveis)
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.floresComestiveis.length; i++) {
        let floresComestiveisName = object.floresComestiveis[i].name;
        let floresComestiveisPrice = object.floresComestiveis[i].price;
        let image = object.floresComestiveis[i].image;
        let product_id = object.floresComestiveis[i].productId;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }
        
        secfloresComestiveis.innerHTML += `
        <div class="boxItem">
            <h3 id="itName">${floresComestiveisName}</h3>
            <img class="itemImg" src="${image}" alt="">
            <div class="kiloPrice">${floresComestiveisPrice}€/Un</div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <!-- <option value="">Quantidade</option> -->
                <option value="1Un">1 Un</option>
                <option value="5Un">5 Un</option>
                <option value="10Un">10 Un</option>
                <option value="25Un">25 Un</option>
                <option value="50Un">50 Un</option>
                <option value="75Un">75 Un</option>
                <option value="100Un">100 Un</option>
                <option value="250Un">250 Un</option>
                <option value="500Un">500 Un</option>
            </select>
            <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
            <div class="priceToPay"></div>
            <button class="addToCart btn btn-success">Comprar</button>
        </div>
        `

        // console.log(floresComestiveisName)

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }
        
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
                })
            })
        }
        addItem()
    
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
        
            updateNumbItemsOnCart()
    }
})
