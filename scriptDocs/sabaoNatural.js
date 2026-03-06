const secSabaoNatural = document.querySelector('.sabaoNatural');

async function callSabaoNatural () {
    return (await fetch('/ProductsData/sabaoNatural.json')).json()
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

    let html = `<h2>🧼 ${name}</h2>`;

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

document.addEventListener('DOMContentLoaded', async () => {

    createPopupOverlay();

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

    sabaoNatural.innerHTML = `
        <h3>Sabão Natural</h3>
        <img src="/images/logo.png" alt="" id="image" title="Ver ficha técnica">
        <div class="kiloPrice">4.5€/Un</div>

        <select type="text" class="sabaoOptions" id="productOptions">
            <option value="select" class="productOption">Selecione o Sabão</option>
        </select>

        <select type="text" min="1" class="quantity" id="quantityBtn">
            <option value="Quantidade">Quantidade</option>
            <option value="1">1 Sabão</option>
            <option value="2">2 Sabões</option>
            <option value="3">3 Sabões</option>
            <option value="4">4 Sabões</option>
            <option value="5">5 Sabões</option>
            <option value="6">6 Sabões</option>
        </select>
                    
        <div class="priceToPay"></div>
        <button class="addToCart btn btn-success" disabled>Comprar</button>
    `
    const sabaoNaturalMenu = sabaoNatural.querySelector('#productOptions');
    const sabaoQuantity = sabaoNatural.querySelector('#quantityBtn');
    const addSabaoToCartBtn = sabaoNatural.querySelector('.addToCart');
    const imageDiv = sabaoNatural.querySelector('#image');
    const priceToPayDiv = sabaoNatural.querySelector('.priceToPay');
    const kiloPriceDiv = sabaoNatural.querySelector('.kiloPrice');

    function checkIfSabaoIsSelected() {
        if (sabaoNaturalMenu.value === 'select') {
            sabaoQuantity.disabled = true;
            addSabaoToCartBtn.disabled = true;
            sabaoQuantity.value = 'Quantidade';
            priceToPayDiv.style.visibility = 'hidden';
            imageDiv.src = '/images/logo.png';
        }
        if (sabaoNaturalMenu.value !== 'select') {
            sabaoQuantity.disabled = false;
        }          
    }   

    sabaoNaturalMenu.addEventListener('change', () => {
        checkIfSabaoIsSelected();
    })
    
    checkIfSabaoIsSelected()

    for (let i = 0; i < allSabaoNatural.length; i++) {
            
        let stock = allSabaoNatural[i].stock;
        let product_id = allSabaoNatural[i].productId;
        let name = allSabaoNatural[i].name;
        let price = allSabaoNatural[i].price;
        let technicalSheet = allSabaoNatural[i].technicalSheet;

        //shows image when option is selected
        sabaoNaturalMenu.addEventListener('change', () => {
            const optionsOnSelect = allSabaoNatural.find(option => option.name === sabaoNaturalMenu.value)
            if (optionsOnSelect) {
                imageDiv.src = optionsOnSelect.image;
                kiloPriceDiv.textContent = optionsOnSelect.price + '€/Un';
                imageDiv.addEventListener('click', () => openPopup(optionsOnSelect.technicalSheet, name));
            }
            if (optionsOnSelect?.image == '') {
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

    // ─── Comportamento do carrinho ───────────────────────────────────────────

    const addCartBtn = sabaoNatural.querySelector('.addToCart');
    const selectEl = sabaoNatural.querySelector('.quantity');

    addCartBtn.addEventListener('click', () => {
        let name = sabaoNaturalMenu.value;
        let imageSrc = imageDiv.src;
        let itemPrice = kiloPriceDiv.textContent;
        let quantity = selectEl.value;
        let itemTotal = priceToPayDiv.textContent;
        addToitemObj(name, imageSrc, itemPrice, quantity, itemTotal);
        updateNumbItemsOnCart();
        priceToPayDiv.textContent = '';
        showAllert(name);
        setTimeout(() => {
            location.reload();
        }, 2000);
    });

    selectEl.addEventListener('change', () => {
        const qtText = selectEl.value;
        const qty = parseFloat(qtText);
        const price = parseFloat(kiloPriceDiv.textContent);

        if (qtText === "Quantidade") {
            priceToPayDiv.textContent = '';
            addCartBtn.setAttribute("disabled", "");
        }
        else {
            const priceToPay = (qty * price).toFixed(2);
            priceToPayDiv.style.visibility = 'visible';
            priceToPayDiv.textContent = priceToPay + ' €';
            addCartBtn.removeAttribute("disabled");
        }
    });

    updateNumbItemsOnCart();
});

// ─── Alerta ───────────────────────────────────────────────────────────────────

function showAllert(name) {
    let alert = document.querySelector('.alert');
    alert.classList.add('show-alert');

    alert.innerHTML = `
        <span class="cart-changed-message">${name} adicionado(s) ao Cesto</span>
        <button class="see-cart">
            <a href="/html/carrinho.html">Ver Cesto</a>
        </button>
    `

    setTimeout(() => {
        alert.classList.remove('show-alert')
    }, 2000);
}

// ─── Adicionar ao localStorage ────────────────────────────────────────────────

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

// ─── Contador do carrinho ─────────────────────────────────────────────────────

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('div .article-number');
    let cart = JSON.parse(localStorage.getItem('cart'));

    numbOfItemsOnCart.forEach(el => {
        el.textContent = cart.length > 0 ? cart.length : '0';
    })
}

let screenWidth = window.innerWidth;