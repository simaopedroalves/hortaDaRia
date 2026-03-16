const secMicroverdes = document.querySelector('.microverdes');

async function callMicroverdes () {
    return (await fetch('/ProductsData/microverdes.json')).json()
}

// ─── SHEETS CONFIG ────────────────────────────────────────────────────────────
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTt94zo_YFY4pz2ILaVDJDmQ_iIeD0XdSC3sASqse1a_tyIAUca2Q5Kr2yIgIqB8SJ3_zr0iCJdm1tc/pub?gid=0&single=true&output=csv';

async function fetchSheetsData() {
    const CACHE_KEY      = 'sheetsCache_microverdes';
    const CACHE_DATE_KEY = 'sheetsCacheDate_microverdes';
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
        console.log('A usar cache do Sheets (microverdes)');
        return JSON.parse(cached);
    }

    try {
        console.log('A fazer fetch ao Sheets (microverdes)...');
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
        console.error('Erro Sheets (microverdes):', e);
        return cached ? JSON.parse(cached) : {};
    }
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
    document.body.style.overflow = '';
}

function buildFichaHTML(sheet, name) {
    if (!sheet) return `<p style="color:#888;font-size:0.9rem">Ficha técnica não disponível.</p>`;

    let html = `<h2>🌱 ${name}</h2>`;

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
    document.body.style.overflow = 'hidden';
}

// ─── FIM POPUP ───────────────────────────────────────────────────────────────

// ─── CRIAR CARD ──────────────────────────────────────────────────────────────

function createCard(item) {
    const { name, image: rawImage, productId, technicalSheet } = item;
    const price = item._sheetPrice ?? item.price;
    const stock = item._sheetStock ?? item.stock;
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

    // ── Stock ────────────────────────────────────────────────────────────────
    if (!stock) boxDiv.classList.add('out-of-stock');

    // ── Referências ──────────────────────────────────────────────────────────
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
        object = await callMicroverdes();
    } catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    const sheetsData = await fetchSheetsData();
    const produtos   = object.microverdes.map(item => {
        const s = sheetsData[item.productId?.toString()];
        if (s) { item._sheetPrice = s.preco; item._sheetStock = s.stock; }
        return item;
    });

    const available   = produtos.filter(s => (s._sheetStock ?? s.stock) === true);
    const unavailable = produtos.filter(s => (s._sheetStock ?? s.stock) === false);

    if (available.length > 0) {
        secMicroverdes.appendChild(createSubtitle('✅ Disponíveis', true));
        available.forEach(item => secMicroverdes.appendChild(createCard(item)));
    }

    if (unavailable.length > 0) {
        secMicroverdes.appendChild(createSubtitle('⏳ Brevemente disponíveis', false));
        unavailable.forEach(item => secMicroverdes.appendChild(createCard(item)));
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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    numbOfItemsOnCart.forEach(el => {
        el.textContent = cart.length > 0 ? cart.length : '0';
    });
}

let screenWidth = window.innerWidth;