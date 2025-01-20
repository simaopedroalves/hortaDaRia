import { findStockOfItems } from "../script.js";

const secCompotas = document.querySelector('.compotas');

async function callCompotas () {
    return (await fetch('/ProductsData/compotas.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callCompotas();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }
    
    // COMPOTAS GRANDES
    const compotasGrandes = document.createElement('div');
    compotasGrandes.classList.add('boxItem');
    let allCompotasGrandes = object.compotasGrandes;

    compotasGrandes.innerHTML += `
        <h3>Compotas Grandes</h3>
        <img src="/images/logo.png" alt="" id="image">
        <div class="kiloPrice">5.5€/Un</div>

        <select type="text" class="compotasOptions" id="productOptions">
            <option value="select" class="productOption">Selecione a compota</option>
        </select>

        <select type="text" min="1" class="quantity" id="quantityBtn">
            <option value="Quantidade">Quantidade</option>
            <option value="1un">1 Compota</option>
            <option value="2un">2 Compotas</option>
            <option value="3un">3 Compotas</option>
        </select>
                    
              <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
        <div class="priceToPay"></div>
        <button class="addToCart btn btn-success" disabled>Comprar</button>
    `
    const compotasGrandesMenu = compotasGrandes.querySelector('#productOptions');
    const compotaGrandeQuantity = compotasGrandes.querySelector('#quantityBtn');
    const addCompotaGrandeToCartBtn = compotasGrandes.querySelector('.addToCart');

    function checkIfCompotaGrandeIsSelected() {

        let finalPriceToPay = compotasGrandes.querySelector('.priceToPay');
        let imageDiv = compotasGrandes.querySelector('#image');

        if (compotasGrandesMenu.value === 'select') {
            compotaGrandeQuantity.disabled = true;
            addCompotaGrandeToCartBtn.disabled = true;
            compotaGrandeQuantity.value = 'Quantidade';
            finalPriceToPay.style.visibility = 'hidden';
            imageDiv.src = '/images/logo.png';
        }
        if (compotasGrandesMenu.value !== 'select') {
            compotaGrandeQuantity.disabled = false;
        }          
    }   

    compotasGrandesMenu.addEventListener('change', () => {checkIfCompotaGrandeIsSelected()})
    
    checkIfCompotaGrandeIsSelected()

    for (let i = 0; i < allCompotasGrandes.length; i++) {
            
        let stock = allCompotasGrandes[i].stock;
        let product_id = allCompotasGrandes[i].productId;
        let name = allCompotasGrandes[i].name;
        let imageDiv = compotasGrandes.querySelector('#image');

        //shows compota image when the user choose the type of compota
        compotasGrandesMenu.addEventListener('change', () => {
            const optionsOnSelect = allCompotasGrandes.find(option => option.name === compotasGrandesMenu.value)
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

        compotasGrandesMenu.append(options);

        if (!stock) {
            options.classList.add('displayNone')
        }
    } 

    secCompotas.appendChild(compotasGrandes);

    //COMPOTAS PEQUENAS
    const compotasPequenas = document.createElement('div');
    compotasPequenas.classList.add('boxItem');
    let allCompotasPequenas = object.compotasPequenas;

    compotasPequenas.innerHTML += `
        <h3 >Compotas Pequenas</h3>
        <img src="/images/logo.png" alt="" id="image">
        <div class="kiloPrice">3.5€/Un</div>

        <select type="text" class="compotasOptions" id="productOptions">
            <option value="select" class="productOption">Selecione a compota</option>
        </select>

        <select type="text" min="1" class="quantity" id="quantityBtn">
            <option value="Quantidade">Quantidade</option>
            <option value="1un">1 Compota</option>
            <option value="2un">2 Compotas</option>
            <option value="3un">3 Compotas</option>
        </select>
                    
              <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
        <div class="priceToPay"></div>
        <button class="addToCart btn btn-success" disabled>Comprar</button>
    `
    const compotasPequenasMenu = compotasPequenas.querySelector('#productOptions');
    const compotaPequenaQuantity = compotasPequenas.querySelector('#quantityBtn');
    const addCompotaPequenaToCartBtn = compotasPequenas.querySelector('.addToCart');

    function checkIfCompotaPequenaIsSelected() {

        let finalPriceToPay = compotasPequenas.querySelector('.priceToPay');
        let imageDiv = compotasPequenas.querySelector('#image');

        if (compotasPequenasMenu.value === 'select') {
            compotaPequenaQuantity.disabled = true;
            addCompotaPequenaToCartBtn.disabled = true;
            compotaPequenaQuantity.value = 'Quantidade';
            finalPriceToPay.style.visibility = 'hidden';
            imageDiv.src = '/images/logo.png';
        }

        if (compotasPequenasMenu.value !== 'select') {
            console.log(compotasPequenasMenu.value);
            compotaPequenaQuantity.disabled = false;
        }          
    }   

    compotasPequenasMenu.addEventListener('change', () => {checkIfCompotaPequenaIsSelected()})
    
    checkIfCompotaPequenaIsSelected()

    // allCompotasPequenas.forEach((compota, i) => {
    for (let i = 0; i < allCompotasPequenas.length; i++) {
            
        let stock = allCompotasPequenas[i].stock;

        let product_id = allCompotasPequenas[i].productId;
        let name = allCompotasPequenas[i].name;
        let imageDiv = compotasPequenas.querySelector('#image');

        compotasPequenasMenu.addEventListener('change', () => {
            const optionsOnSelect = allCompotasPequenas.find(option => option.name === compotasPequenasMenu.value);

            if (optionsOnSelect) {
                imageDiv.src = optionsOnSelect.image
            }  
            if (optionsOnSelect.image === '') {
                imageDiv.src = '/images/logo.png';
            }
        })

        let options = document.createElement('option');
        options.textContent = `${name}`;
        options.value = `${name}`;
        options.classList.add("itName", "productOption");
        options.id = product_id;

        compotasPequenasMenu.append(options);
        
        if (!stock) {
            options.classList.add('displayNone')
        }
    }
        
    secCompotas.appendChild(compotasPequenas);


    //ALL COMPOTAS
        let addCartBtn = document.querySelectorAll('.addToCart');

        function addItem() {

            addCartBtn.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    btn = event.target;
                    let name = btn.parentElement.querySelector('.compotasOptions').value;
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
                <span class="cart-changed-message">${name} adicionada ao Cesto</span>
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
                    qt = parseFloat(kiloPrice[i].textContent);

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

})

updateNumbItemsOnCart()

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('nav .article-number');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

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