const secCarnes = document.querySelector('.carnes');

async function callCarnes () {
    return (await fetch('/ProductsData/carnes.json')).json()
}

// ─── SHEETS CONFIG ────────────────────────────────────────────────────────────
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTt94zo_YFY4pz2ILaVDJDmQ_iIeD0XdSC3sASqse1a_tyIAUca2Q5Kr2yIgIqB8SJ3_zr0iCJdm1tc/pub?gid=0&single=true&output=csv';

async function fetchSheetsData() {
    const CACHE_KEY      = 'sheetsCache_carnes';
    const CACHE_DATE_KEY = 'sheetsCacheDate_carnes';
    const cached     = localStorage.getItem(CACHE_KEY);
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);

    function getLastMondayMidnight() {
        const now = new Date(); const day = now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
        monday.setHours(0,0,0,0); return monday.getTime();
    }

    if (cached && cachedDate && parseInt(cachedDate) >= getLastMondayMidnight()) {
        console.log('A usar cache do Sheets (carnes)');
        return JSON.parse(cached);
    }

    try {
        console.log('A fazer fetch ao Sheets (carnes)...');
        const text = await (await fetch(SHEET_CSV_URL)).text();
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
        console.error('Erro Sheets (carnes):', e);
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

    let html = `<h2>🥩 ${name}</h2>`;

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

document.addEventListener('DOMContentLoaded', async () => {

    createPopupOverlay();

    let object = '';
    try {
        object = await callCarnes();
    } catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    // ── Aplicar dados do Sheets ───────────────────────────────────────────────
    const sheetsData = await fetchSheetsData();
    const produtos   = object.carnes.map(item => {
        const s = sheetsData[item.productId?.toString()];
        if (s) { item._sheetPrice = s.preco; item._sheetStock = s.stock; }
        return item;
    });

    for (let i = 0; i < produtos.length; i++) {

        const item        = produtos[i];
        const carnesName  = item.name;
        const carnesPrice = item._sheetPrice ?? item.price;
        const image       = item.image == '' ? "/images/logo.png" : item.image;
        const stock       = item._sheetStock ?? item.stock;
        const product_id  = item.productId;
        const techSheet   = item.technicalSheet;

        if (carnesName === 'Caldo de carnes e de ossos - 250ml') {
            secCarnes.innerHTML += `
                <div class="boxItem" id="${product_id}">
                    <h3 id="itName">${carnesName}</h3>
                    <img src="${image}" alt="" title="Ver ficha técnica">
                    <div class="kiloPrice">${carnesPrice}€/Un</div>
                    <select type="text" min="1" class="quantity" placeholder="quantidade">
                        <option value="qt">Quantidade</option>
                        <option value="1 frasco">1 Frasco</option>
                        <option value="2 frascos">2 Frascos</option>
                        <option value="3 frascos">3 Frascos</option>
                    </select>
                    <div class="priceToPay"></div>
                    <button class="addToCart btn btn-success" disabled>Comprar</button>
                </div>
            `;
        } else {
            secCarnes.innerHTML += `
                <div class="boxItem" id="${product_id}">
                    <h3 id="itName">${carnesName}</h3>
                    <img src="${image}" alt="" title="Ver ficha técnica">
                    <div class="kiloPrice">${carnesPrice}€/Kg</div>
                    <select type="text" min="1" class="quantity" placeholder="quantidade">
                        <option value="qt">Quantidade</option>
                        <option value="50gr">50 gr.</option>
                        <option value="100gr">100 gr.</option>
                        <option value="150gr">150 gr.</option>
                        <option value="200gr">200 gr.</option>
                        <option value="250gr">250 gr.</option>
                    </select>
                    <div class="priceToPay"></div>
                    <button class="addToCart btn btn-success" disabled>Comprar</button>
                </div>
            `;
        }

        // ── Stock ─────────────────────────────────────────────────────────────
        findStockOfItems(stock, product_id);

        // ── Popup na imagem ───────────────────────────────────────────────────
        const boxDiv = document.getElementById(product_id);
        boxDiv.querySelector('img').addEventListener('click', () => openPopup(techSheet, carnesName));

        // ── Botão Comprar ─────────────────────────────────────────────────────
        let addCartBtn = document.querySelectorAll('.addToCart');

        function addItem() {
            addCartBtn.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    btn = event.target;
                    let name      = btn.parentElement.querySelector('#itName').textContent;
                    let imageSrc  = btn.parentElement.querySelector('img').src;
                    let itemPrice = btn.parentElement.querySelector('.kiloPrice').textContent;
                    let quantity  = btn.parentElement.querySelector('.quantity').value;
                    let itemTotal = btn.parentElement.querySelector('.priceToPay').textContent;
                    addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal);
                    updateNumbItemsOnCart();
                    refreshItemSelected(btn);
                    showAllert(name);
                    btn.setAttribute("disabled", "");
                });
            });
        }

        addItem();

        function refreshItemSelected(btn) {
            btn.parentElement.querySelector('.priceToPay').textContent = '';
        }

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

        function addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal) {
            let itemObj = JSON.parse(localStorage.getItem('cart'));
            if (itemObj === null) itemObj = [];
            itemObj.push({ itName: name, itImageSrc: imageSrc, itPrice: itemPrice, itQuantity: quantity, itTotal: itemTotal });
            localStorage.setItem('cart', JSON.stringify(itemObj));
        }

        // ── Cálculo de preço ──────────────────────────────────────────────────
        let selectedOptionValue = document.querySelectorAll('.quantity');
        let kiloPrice           = document.querySelectorAll('.kiloPrice');
        let finalItemPrice      = document.querySelectorAll('.priceToPay');

        selectedOptionValue.forEach((btn, i) => {
            btn.addEventListener('change', () => {

                function finalPricePerItem(kg, qt) {
                    var priceToPay = 0;
                    kg = parseFloat(selectedOptionValue[i].value);
                    qt = parseFloat(kiloPrice[i].textContent);

                    let qtText    = selectedOptionValue[i].value;
                    let addCartBtn = btn.parentElement.querySelector('.addToCart');

                    if (qtText === "qt") {
                        finalItemPrice[i].textContent = '';
                        addCartBtn.setAttribute("disabled", "");
                    }

                    if (selectedOptionValue[i].value.includes('frasco' || 'frascos')) {
                        priceToPay = kg * qt;
                        priceToPay = priceToPay.toFixed(2);
                        finalItemPrice[i].textContent = priceToPay + ' €';
                        addCartBtn.removeAttribute("disabled");
                    } else {
                        priceToPay = kg * (qt / 1000);
                        priceToPay = priceToPay.toFixed(2);
                        finalItemPrice[i].textContent = priceToPay + ' €';
                        addCartBtn.removeAttribute("disabled");
                    }

                    return priceToPay;
                }

                let buyBtn = btn.parentElement.querySelector('.addToCart');
                buyBtn.removeAttribute('disabled');
                finalPricePerItem();
            });
        });
    }

    updateNumbItemsOnCart();
});

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('div .article-number');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    numbOfItemsOnCart.forEach(el => {
        el.textContent = '0';
        for (let i = 0; i < cart.length; i++) {
            if (cart.length > 0) el.textContent = cart.length;
            if (cart.length <= 0) el.textContent = '0';
        }
    });
}