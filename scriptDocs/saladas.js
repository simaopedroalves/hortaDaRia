// import {updateNumbItemsOnCart} from '/script.js'

// import { findStockOfItems } from "../script.js";

// const secSaladas = document.querySelector('.saladas');

// async function callSaladas () {
//     return (await fetch('/ProductsData/saladas.json')).json()
// }

// document.addEventListener('DOMContentLoaded', async () => {

//     let object = '';

//     try {
//         object = await callSaladas();
//     }
//     catch (error) {
//         console.error('ERROR');
//         console.log(error)
//     }

//     for (let i = 0; i < object.saladas.length; i++) {
        
//         let saladaName = object.saladas[i].name;
//         let saladaPrice = object.saladas[i].price;
//         let image = object.saladas[i].image;
//         let stock = object.saladas[i].stock;
//         let product_id = object.saladas[i].productId;
//         //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
//         if (image == '') {
//             image = "/images/logo.png";
//         }

//         secSaladas.innerHTML += `
//         <div class="boxItem" id="${product_id}">
//             <h3 id="itName">${saladaName}</h3>
//             <img src="${image}" alt="">
//             <div class="kiloPrice">${saladaPrice}€/kg</div>
//             <select type="text" min="1" class="quantity" placeholder="quantidade">
//                 <option class="no-stock-message" value="qt">Quantidade</option>
//                 <option value="100 gr">100 gr</option>
//                 <option value="250 gr">250 gr</option>
//                 <option value="500 gr">500 gr</option>
//                 <option value="750 gr">750 gr</option>
//                 <option value="1 Kg">1 Kg</option>
//             </select>
//             <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
//             <div class="priceToPay"></div>
//             <button class="addToCart btn btn-success" disabled>Comprar</button>
//         </div>
//         `

//           // function on script.js
//           findStockOfItems (stock, product_id)

//             let addCartBtn = document.querySelectorAll('.addToCart');
    
//             // let itemObj = [];
    
//             function addItem() {

//                 addCartBtn.forEach(btn => {
//                     btn.addEventListener('click', (event) => {
//                         btn = event.target;
//                         let name = btn.parentElement.querySelector('#itName').textContent;
//                         let imageSrc = btn.parentElement.querySelector('img').src;
//                         let itemPrice = btn.parentElement.querySelector('.kiloPrice').textContent;
//                         let quantity = btn.parentElement.querySelector('.quantity').value;
//                         let itemTotal = btn.parentElement.querySelector('.priceToPay').textContent;
//                         addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal)
//                         updateNumbItemsOnCart() 
//                         refreshItemSelected(btn)
//                         showAllert(name)
//                         btn.setAttribute("disabled", "")
//                     })
//                 })
//             }
    
//             addItem()
    
//             function refreshItemSelected (btn) {
//                 btn.parentElement.querySelector('.priceToPay').textContent = '';
//             }
    
//             function showAllert (name) {
//                 let alert = document.querySelector('.alert');
//                 alert.classList.add('show-alert');
    
//                 alert.innerHTML = `
//                     <span class="cart-changed-message">${name} adicionado(a) ao Cesto</span>
//                     <button class="see-cart">
//                         <a href="/html/carrinho.html">
//                             Ver Cesto
//                         </a> 
//                     </button>
//                 `
    
//                 setTimeout(() => {
//                     alert.classList.remove('show-alert')
//                 }, 2000);
//             }
    

//             function addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal) {

//                 let itemObj = JSON.parse(localStorage.getItem('cart'))
           
//                 if (itemObj === null) {
//                     itemObj = []
//                 }
                  
//                 itemObj.push({
//                     itName: name,
//                     itImageSrc: imageSrc,
//                     itPrice: itemPrice,
//                     itQuantity: quantity,
//                     itTotal: itemTotal
//                 })
//                 localStorage.setItem('cart', JSON.stringify(itemObj))
//             }
                        
//             let selectedOptionValue = document.querySelectorAll('.quantity');
//             let kiloPrice = document.querySelectorAll('.kiloPrice');
//             let finalItemPrice = document.querySelectorAll('.priceToPay'); 
                
//             selectedOptionValue.forEach((btn, i) => {
    
//                 btn.addEventListener('change', () => {           
    
//                     function finalPricePerItem (kg, qt) {
//                         var priceToPay = 0;
//                         kg = parseFloat(selectedOptionValue[i].value);
//                         qt = parseFloat(kiloPrice[i].textContent)

//                         let qtText = selectedOptionValue[i].value;
//                         let addCartBtn = btn.parentElement.querySelector('.addToCart')
                      
    
//                         if (kg > 10) {
//                             priceToPay = kg * (qt/1000)
//                             priceToPay = priceToPay.toFixed(2)
//                             finalItemPrice[i].textContent = priceToPay + ' €'
    
//                         }  
    
//                         else if (qtText === "qt") {
//                             finalItemPrice[i].textContent = ''
//                             addCartBtn.setAttribute("disabled", "")
//                         }   
    
//                         else {
//                             priceToPay = kg * (qt)
//                             priceToPay = priceToPay.toFixed(2)
//                             finalItemPrice[i].textContent = priceToPay + ' €'
//                         }
                        
//                         return priceToPay
    
//                     }

//                     let buyBtn = btn.parentElement.querySelector('.addToCart');
//                     buyBtn.removeAttribute('disabled'); 
    
//                     finalPricePerItem() 
//                 })
                
//             })
//     }
//     updateNumbItemsOnCart()
// })

// function updateNumbItemsOnCart() {

//     let numbOfItemsOnCart = document.querySelectorAll('div .article-number');
//     let cart = JSON.parse(localStorage.getItem('cart'));

//     numbOfItemsOnCart.forEach(el => {
//         el.textContent = '0'

//         for (let i = 0; i < cart.length; i++) {
//             if (cart.length > 0) {
//                 el.textContent = cart.length
//             }
//             if (cart.length <= 0) {
//                 el.textContent = '0'
//             }
//         }
//     })
// }


// let screenWidth = window.innerWidth;
// console.log(`Screen width: ${screenWidth}px`);


// CÓDIGO CLAUDE

const secSaladas = document.querySelector('.saladas');

async function callSaladas () {
    return (await fetch('/ProductsData/saladas.json')).json()
}

// ─── POPUP: Ficha Técnica ────────────────────────────────────────────────────

function createPopupOverlay() {
    if (document.getElementById('fichaPopupOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'fichaPopupOverlay';
    overlay.innerHTML = `
        <div id="fichaPopup">
            <button id="fichaPopupClose">&times;</button>
            <div id="fichaPopupContent"></div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        #fichaPopupOverlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }
        #fichaPopupOverlay.active {
            display: flex;
        }
        #fichaPopup {
            background: #fff;
            border-radius: 12px;
            padding: 32px 28px 28px;
            max-width: 420px;
            width: 90%;
            position: relative;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 8px 40px rgba(0,0,0,0.18);
            animation: popupIn 0.22s ease;
        }
        @keyframes popupIn {
            from { transform: scale(0.93); opacity: 0; }
            to   { transform: scale(1);    opacity: 1; }
        }
        #fichaPopupClose {
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.6rem;
            cursor: pointer;
            color: #555;
            line-height: 1;
        }
        #fichaPopupClose:hover { color: #111; }
        #fichaPopupContent h2 {
            margin: 0 0 4px;
            font-size: 1.25rem;
        }
        #fichaPopupContent .ficha-family {
            font-size: 0.8rem;
            color: #888;
            margin-bottom: 16px;
            font-style: italic;
        }
        #fichaPopupContent .ficha-section {
            margin-bottom: 14px;
        }
        #fichaPopupContent .ficha-section-title {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #4a7c59;
            margin-bottom: 6px;
        }
        #fichaPopupContent .ficha-harvest {
            background: #f0f7f2;
            border-radius: 8px;
            padding: 8px 14px;
            font-size: 0.9rem;
            display: inline-block;
        }
        #fichaPopupContent ul {
            margin: 0;
            padding-left: 18px;
        }
        #fichaPopupContent ul li {
            font-size: 0.9rem;
            margin-bottom: 3px;
            color: #333;
        }
        #fichaPopupContent .ficha-flavor {
            font-size: 0.88rem;
            color: #555;
            background: #fafaf0;
            border-left: 3px solid #c8d88c;
            padding: 6px 12px;
            border-radius: 0 6px 6px 0;
            margin-top: 4px;
        }
        #fichaPopupContent .ficha-components {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 4px;
        }
        #fichaPopupContent .ficha-tag {
            background: #e8f5e9;
            color: #2e7d32;
            border-radius: 20px;
            padding: 3px 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .boxItem img { cursor: pointer; }
        .boxItem img:hover { opacity: 0.88; transition: opacity 0.15s; }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
    document.getElementById('fichaPopupClose').addEventListener('click', closePopup);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });
}

function closePopup() {
    document.getElementById('fichaPopupOverlay').classList.remove('active');
}

function buildFichaHTML(sheet, name) {
    if (!sheet) return `<p style="color:#888;font-size:0.9rem">Ficha técnica não disponível.</p>`;

    let html = `<h2>🥬 ${name}</h2>`;

    if (sheet.description && sheet.components) {
        html += `<p style="font-size:0.9rem;color:#444;margin-bottom:14px">${sheet.description}</p>`;
        html += `<div class="ficha-section">
            <div class="ficha-section-title">🧩 Composição</div>
            <div class="ficha-components">
                ${sheet.components.map(c => `<span class="ficha-tag">${c}</span>`).join('')}
            </div>
        </div>`;
        return html;
    }

    if (sheet.botanicalName) {
        html += `<div class="ficha-family"><em>${sheet.botanicalName}</em> · ${sheet.family}</div>`;
        if (sheet.botanicalSynonym) {
            html += `<div class="ficha-family" style="margin-top:-10px">sin. ${sheet.botanicalSynonym}</div>`;
        }
    }

    if (sheet.harvestTime) {
        html += `<div class="ficha-section">
            <div class="ficha-section-title">⏳ Sementeira → Colheita</div>
            <span class="ficha-harvest">${sheet.harvestTime.minDays} a ${sheet.harvestTime.maxDays} dias</span>
        </div>`;
    }

    if (sheet.culinaryUses?.length) {
        html += `<div class="ficha-section">
            <div class="ficha-section-title">🥗 Uso Alimentar</div>
            <ul>${sheet.culinaryUses.map(u => `<li>${u}</li>`).join('')}</ul>
        </div>`;
    }

    if (sheet.flavorNotes) {
        const notes = Object.values(sheet.flavorNotes).join(' · ');
        html += `<div class="ficha-section">
            <div class="ficha-section-title">👅 Notas de Sabor</div>
            <div class="ficha-flavor">${notes}</div>
        </div>`;
    }

    if (sheet.traditionalProperties?.length) {
        html += `<div class="ficha-section">
            <div class="ficha-section-title">🌿 Propriedades Tradicionais</div>
            <ul>${sheet.traditionalProperties.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>`;
    }

    return html;
}

function openPopup(sheet, name) {
    document.getElementById('fichaPopupContent').innerHTML = buildFichaHTML(sheet, name);
    document.getElementById('fichaPopupOverlay').classList.add('active');
}

// ─── FIM POPUP ───────────────────────────────────────────────────────────────

// ─── CRIAR CARD ──────────────────────────────────────────────────────────────

function createCard(item) {
    const { name, price, image: rawImage, stock, productId, technicalSheet } = item;
    const image = rawImage == '' ? "/images/logo.png" : rawImage;

    const boxDiv = document.createElement('div');
    boxDiv.className = 'boxItem';
    boxDiv.id = productId;
    boxDiv.innerHTML = `
        <h3 id="itName">${name}</h3>
        <img src="${image}" alt="" title="Ver ficha técnica">
        <div class="kiloPrice">${price}€/kg</div>
        <select class="quantity">
            <option value="qt">Quantidade</option>
            <option value="100 gr">100 gr</option>
            <option value="250 gr">250 gr</option>
            <option value="500 gr">500 gr</option>
            <option value="750 gr">750 gr</option>
            <option value="1 Kg">1 Kg</option>
        </select>
        <div class="priceToPay"></div>
        <button class="addToCart btn btn-success" disabled>Comprar</button>
    `;

    // ── Popup na imagem ──────────────────────────────────────────────────────
    boxDiv.querySelector('img').addEventListener('click', () => openPopup(technicalSheet, name));

    // ── Stock — passa o boxDiv directamente, sem precisar que esteja no DOM ──
    if (!stock) {
        boxDiv.classList.add('out-of-stock');
    }

    // ── Botão Comprar — 1 listener, apenas neste boxDiv ─────────────────────
    const cartBtn      = boxDiv.querySelector('.addToCart');
    const selectEl     = boxDiv.querySelector('.quantity');
    const kiloPriceEl  = boxDiv.querySelector('.kiloPrice');
    const priceToPayEl = boxDiv.querySelector('.priceToPay');

    cartBtn.addEventListener('click', () => {
        addToitemObj(
            boxDiv.querySelector('#itName').textContent,
            boxDiv.querySelector('img').src,
            kiloPriceEl.textContent,
            selectEl.value,
            priceToPayEl.textContent
        );
        updateNumbItemsOnCart();
        priceToPayEl.textContent = '';
        showAllert(boxDiv.querySelector('#itName').textContent);
        cartBtn.setAttribute('disabled', '');
    });

    // ── Cálculo de preço ao mudar quantidade ─────────────────────────────────
    selectEl.addEventListener('change', () => {
        const qtText = selectEl.value;
        const kg     = parseFloat(qtText);
        const qt     = parseFloat(kiloPriceEl.textContent);

        if (qtText === 'qt') {
            priceToPayEl.textContent = '';
            cartBtn.setAttribute('disabled', '');
            return;
        }

        const priceToPay = kg > 10
            ? (kg * (qt / 1000)).toFixed(2)
            : (kg * qt).toFixed(2);

        priceToPayEl.textContent = priceToPay + ' €';
        cartBtn.removeAttribute('disabled');
    });

    return boxDiv;
}

// ─── TÍTULO DE SUBSECÇÃO ──────────────────────────────────────────────────────

function createSubtitle(text, available) {
    const el = document.createElement('div');
    el.className = `stock-subtitle ${available ? 'stock-subtitle--available' : 'stock-subtitle--unavailable'}`;
    el.textContent = text;
    return el;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {

    createPopupOverlay();

    let object = '';
    try {
        object = await callSaladas();
    } catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    const available   = object.saladas.filter(s => s.stock === true);
    const unavailable = object.saladas.filter(s => s.stock === false);

    // ── Disponíveis ───────────────────────────────────────────────────────────
    if (available.length > 0) {
        secSaladas.appendChild(createSubtitle('✅ Disponíveis', true));
        available.forEach(item => secSaladas.appendChild(createCard(item)));
    }

    // ── Indisponíveis ─────────────────────────────────────────────────────────
    if (unavailable.length > 0) {
        secSaladas.appendChild(createSubtitle('⏳ Brevemente disponíveis', false));
        unavailable.forEach(item => secSaladas.appendChild(createCard(item)));
    }

    updateNumbItemsOnCart();
});

// ─── Alerta ───────────────────────────────────────────────────────────────────

function showAllert(name) {
    let alert = document.querySelector('.alert');
    alert.classList.add('show-alert');
    alert.innerHTML = `
        <span class="cart-changed-message">${name} adicionado(a) ao Cesto</span>
        <button class="see-cart">
            <a href="/html/carrinho.html">Ver Cesto</a>
        </button>
    `;
    setTimeout(() => alert.classList.remove('show-alert'), 2000);
}

// ─── Adicionar ao localStorage ────────────────────────────────────────────────

function addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal) {
    let itemObj = JSON.parse(localStorage.getItem('cart'));
    if (itemObj === null) itemObj = [];
    itemObj.push({ itName: name, itImageSrc: imageSrc, itPrice: itemPrice, itQuantity: quantity, itTotal: itemTotal });
    localStorage.setItem('cart', JSON.stringify(itemObj));
}

// ─── Contador do carrinho ─────────────────────────────────────────────────────

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('div .article-number');
    let cart = JSON.parse(localStorage.getItem('cart'));
    numbOfItemsOnCart.forEach(el => {
        el.textContent = cart.length > 0 ? cart.length : '0';
    });
}

let screenWidth = window.innerWidth;
