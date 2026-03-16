const secCompotas = document.querySelector('.compotas');

async function callCompotas() {
    return (await fetch('/ProductsData/compotas.json')).json();
}

// ─── SHEETS CONFIG ────────────────────────────────────────────────────────────
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTt94zo_YFY4pz2ILaVDJDmQ_iIeD0XdSC3sASqse1a_tyIAUca2Q5Kr2yIgIqB8SJ3_zr0iCJdm1tc/pub?gid=0&single=true&output=csv';

async function fetchSheetsData() {
    const CACHE_KEY      = 'sheetsCache_compotas';
    const CACHE_DATE_KEY = 'sheetsCacheDate_compotas';
    const cached     = localStorage.getItem(CACHE_KEY);
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);

    function getLastScheduledTime() {
        const now = new Date();
        const hours = [8, 12, 17];
        const todaySlots = hours.map(h => {
            const d = new Date(now);
            d.setHours(h, 0, 0, 0);
            return d.getTime();
        });
        const pastSlots = todaySlots.filter(t => t <= Date.now());
        if (pastSlots.length > 0) return Math.max(...pastSlots);
        const yesterday17 = new Date(now);
        yesterday17.setDate(now.getDate() - 1);
        yesterday17.setHours(17, 0, 0, 0);
        return yesterday17.getTime();
    }

    if (cached && cachedDate && parseInt(cachedDate) >= getLastScheduledTime()) {
        console.log('A usar cache do Sheets (compotas)');
        return JSON.parse(cached);
    }

    try {
        console.log('A fazer fetch ao Sheets (compotas)...');
        const text = await (await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`)).text();
        const map  = {};
        text.trim().split('\n').slice(1).forEach(row => {
            const cols  = row.split(',');
            const id    = cols[0]?.trim().replace(/"/g, '');
            const preco = parseFloat(cols[2]?.trim().replace(/"/g, ''));
            const stock = cols[3]?.trim().replace(/"/g, '').toLowerCase() === 'true';
            if (id) map[id] = { preco, stock };
        });
        localStorage.setItem(CACHE_KEY, JSON.stringify(map));
        localStorage.setItem(CACHE_DATE_KEY, Date.now().toString());
        return map;
    } catch (e) {
        console.error('Erro Sheets (compotas):', e);
        return cached ? JSON.parse(cached) : {};
    }
}

// ─── POPUP: Ficha Técnica ─────────────────────────────────────────────────────

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
        #fichaPopupOverlay.active { display: flex; }
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
            top: 12px; right: 16px;
            background: none; border: none;
            font-size: 1.6rem; cursor: pointer;
            color: #555; line-height: 1;
        }
        #fichaPopupClose:hover { color: #111; }
        #fichaPopupContent h2 { margin: 0 0 4px; font-size: 1.25rem; }
        #fichaPopupContent .ficha-section { margin-bottom: 14px; }
        #fichaPopupContent .ficha-section-title {
            font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
            letter-spacing: 0.08em; color: #4a7c59; margin-bottom: 6px;
        }
        #fichaPopupContent .ficha-components { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
        #fichaPopupContent .ficha-tag {
            background: #e8f5e9; color: #2e7d32; border-radius: 20px;
            padding: 3px 12px; font-size: 0.8rem; font-weight: 500;
        }
        .boxItem img { cursor: pointer; }
        .boxItem img:hover { opacity: 0.88; transition: opacity 0.15s; }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
    document.getElementById('fichaPopupClose').addEventListener('click', closePopup);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });
}

function closePopup() {
    document.getElementById('fichaPopupOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function buildFichaHTML(sheet, name) {
    if (!sheet) return `<p style="color:#888;font-size:0.9rem">Ficha técnica não disponível.</p>`;

    let html = `<h2>🍓 ${name}</h2>`;

    if (sheet.description) {
        html += `<p style="font-size:0.9rem;color:#444;margin-bottom:14px">${sheet.description}</p>`;
    }

    if (sheet.components?.length) {
        html += `<div class="ficha-section">
            <div class="ficha-section-title">🧩 Ingredientes</div>
            <div class="ficha-components">
                ${sheet.components.map(c => `<span class="ficha-tag">${c}</span>`).join('')}
            </div>
        </div>`;
    }

    return html;
}

function openPopup(sheet, name) {
    document.getElementById('fichaPopupContent').innerHTML = buildFichaHTML(sheet, name);
    document.getElementById('fichaPopupOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ─── FIM POPUP ────────────────────────────────────────────────────────────────

// ─── CRIAR CARD ───────────────────────────────────────────────────────────────

function createCard(item, tipo) {
    const { name, image: rawImage, productId, technicalSheet } = item;
    const price = item._sheetPrice ?? (tipo === 'grande' ? 3.5 : 2.5);
    const stock = item._sheetStock ?? item.stock;
    const image = rawImage === '' ? '/images/logo.png' : rawImage;
    const unidade = tipo === 'grande' ? 'Gr.' : 'Pq.';

    const boxDiv = document.createElement('div');
    boxDiv.className = 'boxItem';
    boxDiv.id = productId;

    boxDiv.innerHTML = `
        <h3 id="itName">${name} <small>(${unidade})</small></h3>
        <img src="${image}" alt="" title="Ver ficha técnica">
        <div class="kiloPrice">${price}€/Un</div>
        <select class="quantity">
            <option value="qt">Quantidade</option>
            <option value="1">1 Unidade</option>
            <option value="2">2 Unidades</option>
            <option value="3">3 Unidades</option>
        </select>
        <div class="priceToPay"></div>
        <button class="addToCart btn btn-success" disabled>Comprar</button>
    `;

    // ── Popup na imagem ───────────────────────────────────────────────────────
    boxDiv.querySelector('img').addEventListener('click', () => openPopup(technicalSheet, name));

    // ── Stock ─────────────────────────────────────────────────────────────────
    if (!stock) boxDiv.classList.add('out-of-stock');

    // ── Referências ───────────────────────────────────────────────────────────
    const cartBtn      = boxDiv.querySelector('.addToCart');
    const selectEl     = boxDiv.querySelector('.quantity');
    const kiloPriceEl  = boxDiv.querySelector('.kiloPrice');
    const priceToPayEl = boxDiv.querySelector('.priceToPay');

    // ── Cálculo de preço ──────────────────────────────────────────────────────
    selectEl.addEventListener('change', () => {
        const qtText = selectEl.value;
        if (qtText === 'qt') {
            priceToPayEl.textContent = '';
            cartBtn.setAttribute('disabled', '');
            return;
        }
        const priceToPay = parseFloat(qtText) * parseFloat(kiloPriceEl.textContent);
        priceToPayEl.textContent = priceToPay.toFixed(2) + ' €';
        cartBtn.removeAttribute('disabled');
    });

    // ── Botão Comprar ─────────────────────────────────────────────────────────
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
        showAllert(name);
        cartBtn.setAttribute('disabled', '');
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
        object = await callCompotas();
    } catch (error) {
        console.error('ERROR', error);
    }

    const sheetsData = await fetchSheetsData();

    function applySheets(item) {
        const s = sheetsData[item.productId?.toString()];
        if (s) { item._sheetPrice = s.preco; item._sheetStock = s.stock; }
        return item;
    }

    const grandes  = object.compotasGrandes.map(applySheets);
    const pequenas = object.compotasPequenas.map(applySheets);

    // ── Compotas Grandes ──────────────────────────────────────────────────────
    const grandesDisponiveis   = grandes.filter(i => (i._sheetStock ?? i.stock) === true);
    const grandesIndisponiveis = grandes.filter(i => (i._sheetStock ?? i.stock) === false);

    secCompotas.appendChild(createSubtitle('Compotas Grandes — ✅ Disponíveis', true));
    grandesDisponiveis.forEach(item => secCompotas.appendChild(createCard(item, 'grande')));

    if (grandesIndisponiveis.length > 0) {
        secCompotas.appendChild(createSubtitle('Compotas Grandes — ⏳ Brevemente disponíveis', false));
        grandesIndisponiveis.forEach(item => secCompotas.appendChild(createCard(item, 'grande')));
    }

    // ── Compotas Pequenas ─────────────────────────────────────────────────────
    const pequenasDisponiveis   = pequenas.filter(i => (i._sheetStock ?? i.stock) === true);
    const pequenasIndisponiveis = pequenas.filter(i => (i._sheetStock ?? i.stock) === false);

    secCompotas.appendChild(createSubtitle('Compotas Pequenas — ✅ Disponíveis', true));
    pequenasDisponiveis.forEach(item => secCompotas.appendChild(createCard(item, 'pequena')));

    if (pequenasIndisponiveis.length > 0) {
        secCompotas.appendChild(createSubtitle('Compotas Pequenas — ⏳ Brevemente disponíveis', false));
        pequenasIndisponiveis.forEach(item => secCompotas.appendChild(createCard(item, 'pequena')));
    }

    updateNumbItemsOnCart();
});

// ─── Alerta ───────────────────────────────────────────────────────────────────

function showAllert(name) {
    let alert = document.querySelector('.alert');
    alert.classList.add('show-alert');
    alert.innerHTML = `
        <span class="cart-changed-message">${name} adicionada ao Cesto</span>
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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    numbOfItemsOnCart.forEach(el => {
        el.textContent = cart.length > 0 ? cart.length : '0';
    });
}

// const secCompotas = document.querySelector('.compotas');

// async function callCompotas () {
//     return (await fetch('/ProductsData/compotas.json')).json()
// }

// // ─── SHEETS CONFIG ────────────────────────────────────────────────────────────
// const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTt94zo_YFY4pz2ILaVDJDmQ_iIeD0XdSC3sASqse1a_tyIAUca2Q5Kr2yIgIqB8SJ3_zr0iCJdm1tc/pub?gid=0&single=true&output=csv';

// async function fetchSheetsData() {
//     const CACHE_KEY      = 'sheetsCache_compotas';
//     const CACHE_DATE_KEY = 'sheetsCacheDate_compotas';
//     const cached     = localStorage.getItem(CACHE_KEY);
//     const cachedDate = localStorage.getItem(CACHE_DATE_KEY);

//     function getLastScheduledTime() {
//         const now = new Date();
//         const hours = [8, 12, 17];
//         const todaySlots = hours.map(h => {
//             const d = new Date(now);
//             d.setHours(h, 0, 0, 0);
//             return d.getTime();
//         });

//         const pastSlots = todaySlots.filter(t => t <= Date.now());

//         if (pastSlots.length > 0) {
//             return Math.max(...pastSlots);
//         }

//         const yesterday17 = new Date(now);
//         yesterday17.setDate(now.getDate() - 1);
//         yesterday17.setHours(17, 0, 0, 0);
//         return yesterday17.getTime();
//     }

//     if (cached && cachedDate && parseInt(cachedDate) >= getLastScheduledTime()) {
//         console.log('A usar cache do Sheets (compotas)');
//         return JSON.parse(cached);
//     }

//     try {
//         console.log('A fazer fetch ao Sheets (compotas)...');
//         const text = await (await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`)).text();
//         const map  = {};
//         text.trim().split('\n').slice(1).forEach(row => {
//             const cols  = row.split(',');
//             const id    = cols[0]?.trim().replace(/"/g, '');
//             const preco = parseFloat(cols[2]?.trim().replace(/"/g, ''));
//             const stock = cols[3]?.trim().replace(/"/g, '').toLowerCase() === 'true';
//             if (id) map[id] = { preco, stock };
//         });
//         localStorage.setItem(CACHE_KEY, JSON.stringify(map));
//         localStorage.setItem(CACHE_DATE_KEY, Date.now().toString());
//         return map;
//     } catch (e) {
//         console.error('Erro Sheets (compotas):', e);
//         return cached ? JSON.parse(cached) : {};
//     }
// }

// document.addEventListener('DOMContentLoaded', async () => {

//     let object = '';

//     try {
//         object = await callCompotas();
//     }
//     catch (error) {
//         console.error('ERROR');
//         console.log(error)
//     }

//     // ─── aplicar sheets data ──────────────────────────────────────────────────
//     const sheetsData = await fetchSheetsData();

//     function applySheets(item) {
//         const s = sheetsData[item.productId?.toString()];
//         if (s) { item._sheetPrice = s.preco; item._sheetStock = s.stock; }
//         return item;
//     }

//     object.compotasGrandes  = object.compotasGrandes.map(applySheets);
//     object.compotasPequenas = object.compotasPequenas.map(applySheets);
//     // ─────────────────────────────────────────────────────────────────────────

//     // COMPOTAS GRANDES
//     const compotasGrandes = document.createElement('div');
//     compotasGrandes.classList.add('boxItem');
//     let allCompotasGrandes = object.compotasGrandes;

//     const grandesPrice = allCompotasGrandes[0]?._sheetPrice ?? 3.5;

//     compotasGrandes.innerHTML += `
//         <h3>Compotas Grandes</h3>
//         <img src="/images/logo.png" alt="" id="image">
//         <div class="kiloPrice">${grandesPrice}€/Un</div>

//         <select type="text" class="compotasOptions" id="productOptions">
//             <option value="select" class="productOption">Selecione a compota</option>
//         </select>

//         <select type="text" min="1" class="quantity" id="quantityBtn">
//             <option value="Quantidade">Quantidade</option>
//             <option value="1un">1 Compota</option>
//             <option value="2un">2 Compotas</option>
//             <option value="3un">3 Compotas</option>
//         </select>
                    
//         <div class="priceToPay"></div>
//         <button class="addToCart btn btn-success" disabled>Comprar</button>
//     `
//     const compotasGrandesMenu = compotasGrandes.querySelector('#productOptions');
//     const compotaGrandeQuantity = compotasGrandes.querySelector('#quantityBtn');
//     const addCompotaGrandeToCartBtn = compotasGrandes.querySelector('.addToCart');

//     function checkIfCompotaGrandeIsSelected() {

//         let finalPriceToPay = compotasGrandes.querySelector('.priceToPay');
//         let imageDiv = compotasGrandes.querySelector('#image');

//         if (compotasGrandesMenu.value === 'select') {
//             compotaGrandeQuantity.disabled = true;
//             addCompotaGrandeToCartBtn.disabled = true;
//             compotaGrandeQuantity.value = 'Quantidade';
//             finalPriceToPay.style.visibility = 'hidden';
//             imageDiv.src = '/images/logo.png';
//         }
//         if (compotasGrandesMenu.value !== 'select') {
//             compotaGrandeQuantity.disabled = false;
//         }          
//     }   

//     compotasGrandesMenu.addEventListener('change', () => {checkIfCompotaGrandeIsSelected()})
    
//     checkIfCompotaGrandeIsSelected()

//     for (let i = 0; i < allCompotasGrandes.length; i++) {
            
//         const stock      = allCompotasGrandes[i]._sheetStock ?? allCompotasGrandes[i].stock;
//         let product_id   = allCompotasGrandes[i].productId;
//         let name         = allCompotasGrandes[i].name;
//         let imageDiv     = compotasGrandes.querySelector('#image');

//         compotasGrandesMenu.addEventListener('change', () => {
//             const optionsOnSelect = allCompotasGrandes.find(option => option.name === compotasGrandesMenu.value)
//             if (optionsOnSelect) {
//                 imageDiv.src = optionsOnSelect.image;
//             }
//             if (optionsOnSelect.image == '') {
//                 imageDiv.src = '/images/logo.png';
//             }
//         })

//         let options = document.createElement('option');
//         options.textContent = `${name}`;
//         options.value = `${name}`;
//         options.classList.add("itName", "productOption");
//         options.id = product_id;

//         compotasGrandesMenu.append(options);

//         if (!stock) {
//             options.classList.add('displayNone')
//         }
//     } 

//     secCompotas.appendChild(compotasGrandes);

//     //COMPOTAS PEQUENAS
//     const compotasPequenas = document.createElement('div');
//     compotasPequenas.classList.add('boxItem');
//     let allCompotasPequenas = object.compotasPequenas;

//     const pequenasPrice = allCompotasPequenas[0]?._sheetPrice ?? 2.5;

//     compotasPequenas.innerHTML += `
//         <h3 >Compotas Pequenas</h3>
//         <img src="/images/logo.png" alt="" id="image">
//         <div class="kiloPrice">${pequenasPrice}€/Un</div>

//         <select type="text" class="compotasOptions" id="productOptions">
//             <option value="select" class="productOption">Selecione a compota</option>
//         </select>

//         <select type="text" min="1" class="quantity" id="quantityBtn">
//             <option value="Quantidade">Quantidade</option>
//             <option value="1un">1 Compota</option>
//             <option value="2un">2 Compotas</option>
//             <option value="3un">3 Compotas</option>
//         </select>
                    
//         <div class="priceToPay"></div>
//         <button class="addToCart btn btn-success" disabled>Comprar</button>
//     `
//     const compotasPequenasMenu = compotasPequenas.querySelector('#productOptions');
//     const compotaPequenaQuantity = compotasPequenas.querySelector('#quantityBtn');
//     const addCompotaPequenaToCartBtn = compotasPequenas.querySelector('.addToCart');

//     function checkIfCompotaPequenaIsSelected() {

//         let finalPriceToPay = compotasPequenas.querySelector('.priceToPay');
//         let imageDiv = compotasPequenas.querySelector('#image');

//         if (compotasPequenasMenu.value === 'select') {
//             compotaPequenaQuantity.disabled = true;
//             addCompotaPequenaToCartBtn.disabled = true;
//             compotaPequenaQuantity.value = 'Quantidade';
//             finalPriceToPay.style.visibility = 'hidden';
//             imageDiv.src = '/images/logo.png';
//         }

//         if (compotasPequenasMenu.value !== 'select') {
//             console.log(compotasPequenasMenu.value);
//             compotaPequenaQuantity.disabled = false;
//         }          
//     }   

//     compotasPequenasMenu.addEventListener('change', () => {checkIfCompotaPequenaIsSelected()})
    
//     checkIfCompotaPequenaIsSelected()

//     for (let i = 0; i < allCompotasPequenas.length; i++) {
            
//         const stock    = allCompotasPequenas[i]._sheetStock ?? allCompotasPequenas[i].stock;
//         let product_id = allCompotasPequenas[i].productId;
//         let name       = allCompotasPequenas[i].name;
//         let imageDiv   = compotasPequenas.querySelector('#image');

//         compotasPequenasMenu.addEventListener('change', () => {
//             const optionsOnSelect = allCompotasPequenas.find(option => option.name === compotasPequenasMenu.value);

//             if (optionsOnSelect) {
//                 imageDiv.src = optionsOnSelect.image
//             }  
//             if (optionsOnSelect.image === '') {
//                 imageDiv.src = '/images/logo.png';
//             }
//         })

//         let options = document.createElement('option');
//         options.textContent = `${name}`;
//         options.value = `${name}`;
//         options.classList.add("itName", "productOption");
//         options.id = product_id;

//         compotasPequenasMenu.append(options);
        
//         if (!stock) {
//             options.classList.add('displayNone')
//         }
//     }
        
//     secCompotas.appendChild(compotasPequenas);


//     //ALL COMPOTAS — resto do código sem alterações
//     let addCartBtn = document.querySelectorAll('.addToCart');

//         function addItem() {

//             addCartBtn.forEach(btn => {
//                 btn.addEventListener('click', (event) => {
//                     btn = event.target;
//                     let name = btn.parentElement.querySelector('.compotasOptions').value;
//                     let imageSrc = btn.parentElement.querySelector('img').src;
//                     let itemPrice = btn.parentElement.querySelector('.kiloPrice').textContent;
//                     let quantity = btn.parentElement.querySelector('.quantity').value;
//                     let itemTotal = btn.parentElement.querySelector('.priceToPay').textContent;
//                     addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal)
//                     updateNumbItemsOnCart()
//                     refreshItemSelected(btn)
//                     showAllert(name)
//                     setTimeout(() => {
//                         location.reload()
//                     }, 2000)
//                 })
//             })
//         }

//         addItem()

//         function refreshItemSelected (btn) {
//             btn.parentElement.querySelector('.priceToPay').textContent = '';
//         }

//         function showAllert (name) {
//             let alert = document.querySelector('.alert');
//             alert.classList.add('show-alert');

//             alert.innerHTML = `
//                 <span class="cart-changed-message">${name} adicionada ao Cesto</span>
//                 <button class="see-cart">
//                     <a href="/html/carrinho.html">
//                         Ver Cesto
//                     </a> 
//                 </button>
//             `

//             setTimeout(() => {
//                 alert.classList.remove('show-alert')
//             }, 2000);
//         }
    
//         function addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal) {
//             let itemObj = JSON.parse(localStorage.getItem('cart'))
           
//             if (itemObj === null) {
//                 itemObj = []
//             }

//             itemObj.push({
//                 itName: name,
//                 itImageSrc: imageSrc,
//                 itPrice: itemPrice,
//                 itQuantity: quantity,
//                 itTotal: itemTotal
//             })
//             localStorage.setItem('cart', JSON.stringify(itemObj))
//         }
                    
//         let selectedOptionValue = document.querySelectorAll('.quantity');
//         let kiloPrice = document.querySelectorAll('.kiloPrice');
//         let finalItemPrice = document.querySelectorAll('.priceToPay'); 

//         selectedOptionValue.forEach((btn, i) => {

//             btn.addEventListener('change', () => {           

//                 function finalPricePerItem (kg, qt) {
//                     var priceToPay = 0;
//                     kg = parseFloat(selectedOptionValue[i].value);
//                     qt = parseFloat(kiloPrice[i].textContent);

//                     let qtText = selectedOptionValue[i].value;
//                     let addCartBtn = btn.parentElement.querySelector('.addToCart')

//                     if (qtText === "Quantidade") {
//                         finalItemPrice[i].textContent = ''
//                         addCartBtn.setAttribute("disabled", "")
//                     }
//                     else {
//                     priceToPay = kg * qt;
//                     priceToPay = priceToPay.toFixed(2);
//                     finalItemPrice[i].style.visibility = 'visible';
//                     finalItemPrice[i].textContent = priceToPay + ' €';
//                     addCartBtn.removeAttribute("disabled");
//                     }
                    
//                     return priceToPay

//                 }

//                 let buyBtn = btn.parentElement.querySelector('.addToCart');
//                 buyBtn.removeAttribute('disabled'); 

//                 finalPricePerItem() 
//             })
            
//         })

// })

// updateNumbItemsOnCart()

// function updateNumbItemsOnCart() {
//     let numbOfItemsOnCart = document.querySelectorAll('div .article-number');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

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