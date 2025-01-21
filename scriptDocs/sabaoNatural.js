// import {updateNumbItemsOnCart} from '/script.js';
// import { findStockOfItems } from "../script.js";

const secSabaoNatural = document.querySelector('.sabaoNatural');

async function callSabaoNatural () {
    return (await fetch('/ProductsData/sabaoNatural.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callSabaoNatural();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    // SABÃO NATURAL
    const sabaoNatural = document.createElement('div');
    sabaoNatural.classList.add('boxItem');
    let allSabaoNatural = object.sabaoNatural;

    sabaoNatural.innerHTML += `
        <h3>Sabão Natural</h3>
        <img src="/images/logo.png" alt="" id="image">
        <div class="kiloPrice">3.5€/Un</div>

        <select type="text" class="sabaoOptions" id="productOptions">
            <option value="select" class="productOption">Selecione o Sabão</option>
        </select>

        <select type="text" min="1" class="quantity" id="quantityBtn">
            <option value="Quantidade">Quantidade</option>
            <option value="1un">1 Sabão</option>
            <option value="2un">2 Sabões</option>
            <option value="3un">3 Sabões</option>
            <option value="4un">4 Sabões</option>
            <option value="5un">5 Sabões</option>
            <option value="6un">6 Sabões</option>
        </select>
                    
              <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
        <div class="priceToPay"></div>
        <button class="addToCart btn btn-success" disabled>Comprar</button>
    `
    const sabaoNaturalMenu = sabaoNatural.querySelector('#productOptions');
    const sabaoQuantity = sabaoNatural.querySelector('#quantityBtn');
    const addCompotaGrandeToCartBtn = sabaoNatural.querySelector('.addToCart');

    function checkIfCompotaGrandeIsSelected() {

        let finalPriceToPay = sabaoNatural.querySelector('.priceToPay');
        let imageDiv = sabaoNatural.querySelector('#image');

        if (sabaoNaturalMenu.value === 'select') {
            sabaoQuantity.disabled = true;
            addCompotaGrandeToCartBtn.disabled = true;
            sabaoQuantity.value = 'Quantidade';
            finalPriceToPay.style.visibility = 'hidden';
            imageDiv.src = '/images/logo.png';
        }
        if (sabaoNaturalMenu.value !== 'select') {
            sabaoQuantity.disabled = false;
        }          
    }   

    sabaoNaturalMenu.addEventListener('change', () => {checkIfCompotaGrandeIsSelected()})
    
    checkIfCompotaGrandeIsSelected()

    for (let i = 0; i < allSabaoNatural.length; i++) {
            
        let stock = allSabaoNatural[i].stock;
        let product_id = allSabaoNatural[i].productId;
        let name = allSabaoNatural[i].name;
        let imageDiv = sabaoNatural.querySelector('#image');

        //shows compota image when the user choose the type of compota
        sabaoNaturalMenu.addEventListener('change', () => {
            const optionsOnSelect = allSabaoNatural.find(option => option.name === sabaoNaturalMenu.value)
            if (optionsOnSelect) {
                imageDiv.src = optionsOnSelect.image;
            }
            if (optionsOnSelect.image == '') {
                imageDiv.src = '/images/logo.png';
            }
                       
        })

        let options = document.createElement('option');
        options.textContent = `${name}`;
        options.value = `${name}`;
        options.classList.add("itName", "productOption");
        options.id = product_id;

        sabaoNaturalMenu.append(options);

        if (!stock) {
            options.classList.add('displayNone')
        }
    } 

    secSabaoNatural.appendChild(sabaoNatural);
// ==============================================================================================
    // for (let i = 0; i < object.sabaoNatural.length; i++) {
        
    //     let sabaoNaturalName = object.sabaoNatural[i].name;
    //     let sabaoNaturalPrice = object.sabaoNatural[i].price;
    //     let image = object.sabaoNatural[i].image;
    //     let stock = object.sabaoNatural[i].stock;
    //     let product_id = object.sabaoNatural[i].productId;

    //     //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
    //     if (image == '') {
    //         image = "/images/logo.png";
    //     }

    //     secSabaoNatural.innerHTML += `
    //         <div class="boxItem" id="${product_id}">
    //             <h3 id="itName">${sabaoNaturalName}</h3>
    //             <img src="${image}" alt="">
    //             <div class="kiloPrice">${sabaoNaturalPrice}€/Un</div>
    //             <select type="text" min="1" class="quantity" placeholder="quantidade">
    //                 <option value="qt">Quantidade</option>
    //                 <option value="1 Un">1 Un</option>
    //                 <option value="2 Un">2 Un</option>
    //                 <option value="3 Un">3 Un</option>
    //                 <option value="4 Un">4 Un</option>
    //                 <option value="5 Un">5 Un</option>
    //                 <option value="10 Un">10 Un</option>
    //             </select>
    //             <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
    //             <div class="priceToPay"></div>
    //             <button class="addToCart btn btn-success" disabled>Comprar</button>
    //         </div>
    //     `

        // function on script.js
        // findStockOfItems (stock, product_id)

        let addCartBtn = document.querySelectorAll('.addToCart');

        function addItem() {

            addCartBtn.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    btn = event.target;
                    let name = btn.parentElement.querySelector('.sabaoOptions').value;
                    let imageSrc = btn.parentElement.querySelector('img').src;
                    let itemPrice = btn.parentElement.querySelector('.kiloPrice').textContent;
                    let quantity = btn.parentElement.querySelector('.quantity').value;
                    let itemTotal = btn.parentElement.querySelector('.priceToPay').textContent;
                    addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal)
                    updateNumbItemsOnCart()
                    refreshItemSelected(btn)
                    showAllert(name)
                    setTimeout(() => {
                        location.reload()
                    }, 2000)
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
                <span class="cart-changed-message">${name} adicionado(s) ao Cesto</span>
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

                    if (qtText === "Quantidade") {
                        finalItemPrice[i].textContent = ''
                        addCartBtn.setAttribute("disabled", "")
                    }
                    else {
                    priceToPay = kg * qt;
                    priceToPay = priceToPay.toFixed(2);
                    finalItemPrice[i].style.visibility = 'visible';
                    finalItemPrice[i].textContent = priceToPay + ' €';
                    addCartBtn.removeAttribute("disabled");
                    }
                    
                    return priceToPay

                }

                let buyBtn = btn.parentElement.querySelector('.addToCart');
                buyBtn.removeAttribute('disabled'); 
                
                finalPricePerItem() 
            })
        })
    })
    updateNumbItemsOnCart()


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