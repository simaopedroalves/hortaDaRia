const secErvas = document.querySelector('.ervas');

// ─── SHEETS CONFIG ────────────────────────────────────────────────────────────

const SHEET_ID = '1iXbRmLHG90ER9vr5pge2KVLF11w2E2qW7rzerCxAZXQ';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

async function fetchSheetsData() {
    try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2));

        const map = {};
        json.table.rows.forEach(row => {
            const id    = row.c[0]?.v?.toString();
            const preco = row.c[2]?.v;
            const stock = row.c[3]?.v === 'true' || row.c[3]?.v === true;
            if (id) map[id] = { preco, stock };
        });

        return map;
    } catch (error) {
        console.error('Erro ao buscar Sheets:', error);
        return {};
    }
}

// ─── FUNÇÃO ───────────────────────────────────────────────────────────────────

async function callErvas() {
    return (await fetch('/ProductsData/ervasAromaticasECha.json')).json()
}

// ─── POPUP ────────────────────────────────────────────────────────────────────

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
        #fichaPopupContent ul, #fichaPopupContent ol {
            margin: 0;
            padding-left: 18px;
            font-size: 0.85rem;
        }
        #fichaPopupContent li {
            margin: 4px 0;
        }
        #fichaPopupContent .ficha-harvest {
            font-size: 0.9rem;
            font-weight: 600;
            color: #4a7c59;
        }
        #fichaPopupContent .ficha-flavor {
            font-size: 0.85rem;
        }
        #fichaPopupContent .ficha-components {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        #fichaPopupContent .ficha-tag {
            background: #e8f0e8;
            color: #4a7c59;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 0.75rem;
            font-weight: 600;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    document.getElementById('fichaPopupClose').addEventListener('click', () => {
        document.getElementById('fichaPopupOverlay').classList.remove('active');
        document.body.style.overflow = '';
    });

    document.getElementById('fichaPopupOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'fichaPopupOverlay') {
            document.getElementById('fichaPopupOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('fichaPopupOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function buildFichaHTML(sheet, name) {
    if (!sheet) return `<h2>${name}</h2><p>Sem ficha técnica</p>`;

    let html = `<h2>${name}</h2>`;

    if (sheet.components?.length) {
        html += `<div class="ficha-components">
                ${sheet.components.map(c => `<span class="ficha-tag">${c}</span>`).join('')}
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

    // ── Preço e stock vêm do Sheets, com fallback para o JSON ────────────────
    const price = item._sheetPrice  ?? item.price;
    const stock = item._sheetStock  ?? item.stock;

    const image = rawImage == '' ? "/images/logo.png" : rawImage;

    const boxDiv = document.createElement('div');
    boxDiv.className = 'boxItem hidden';
    boxDiv.id = productId;
    boxDiv.dataset.animation = 'animate__fadeInLeft';

    const isLavanda = name === "1 Saco Organza Lavanda Inglesa" || name === "2 Sacos Organza Lavanda Inglesa";

    if (isLavanda) {
        boxDiv.innerHTML = `
            <h3 id="itName">${name}</h3>
            <img src="${image}" alt="" title="Ver ficha técnica">
            <div class="kiloPrice displayNone">${price}€</div>
            <input type="hidden" min="1" class="quantity" placeholder="quantidade" value="1">
            <div class="priceToPay">${price}€</div>
            <button class="addToCart btn btn-success">Comprar</button>
        `;
    } else {
        boxDiv.innerHTML = `
            <h3 id="itName">${name}</h3>
            <img src="${image}" alt="" title="Ver ficha técnica">
            <div class="kiloPrice">${price}€/Kg</div>
            <select class="quantity">
                <option value="qt">Quantidade</option>
                <option value="15gr">15 gr</option>
                <option value="25gr">25 gr</option>
                <option value="50gr">50 gr</option>
                <option value="100gr">100 gr</option>
                <option value="250gr">250 gr</option>
            </select>
            <div class="priceToPay"></div>
            <button class="addToCart btn btn-success" disabled>Comprar</button>
        `;
    }

    boxDiv.querySelector('img').addEventListener('click', () => openPopup(technicalSheet, name));

    if (!stock) {
        boxDiv.classList.add('out-of-stock');
    }

    const cartBtn = boxDiv.querySelector('.addToCart');
    const selectEl = boxDiv.querySelector('.quantity');
    const kiloPriceEl = boxDiv.querySelector('.kiloPrice');
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

    if (!isLavanda) {
        selectEl.addEventListener('change', () => {
            const qtText = selectEl.value;
            const kg     = parseFloat(qtText);
            const qt     = parseFloat(kiloPriceEl.textContent);

            if (qtText === 'qt') {
                priceToPayEl.textContent = '';
                cartBtn.setAttribute('disabled', '');
                return;
            }

            const priceToPay = (kg * (qt / 1000)).toFixed(2);
            priceToPayEl.textContent = priceToPay + ' €';
            cartBtn.removeAttribute('disabled');
        });
    }

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
        object = await callErvas();
    } catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    // ── Buscar preços e stock do Sheets ──────────────────────────────────────
    const sheetsData = await fetchSheetsData();

    // ── Aplicar valores do Sheets a cada produto pelo productId ─────────────
    const produtos = object.ervasAromaticasECha.map(item => {
        const sheetItem = sheetsData[item.productId?.toString()];
        if (sheetItem) {
            item._sheetPrice = sheetItem.preco;
            item._sheetStock = sheetItem.stock;
        }
        return item;
    });

    const available   = produtos.filter(e => (e._sheetStock ?? e.stock) === true);
    const unavailable = produtos.filter(e => (e._sheetStock ?? e.stock) === false);

    if (available.length > 0) {
        secErvas.appendChild(createSubtitle('✅ Disponíveis', true));
        available.forEach(item => secErvas.appendChild(createCard(item)));
    }

    if (unavailable.length > 0) {
        secErvas.appendChild(createSubtitle('⏳ Brevemente disponíveis', false));
        unavailable.forEach(item => secErvas.appendChild(createCard(item)));
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