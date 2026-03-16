import { fetchCabazesSheetData, getCabazContent } from '/scriptDocs/script-cabazes.js';

const secCabazExtra = document.querySelector('.cabaz-extra');

async function callCabazExtra() {
    return (await fetch('/ProductsData/cabazes.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';
    try {
        object = await callCabazExtra();
    } catch (error) {
        console.error('ERROR', error);
    }

    const sheetsData   = await fetchCabazesSheetData();
    const allContent   = getCabazContent(sheetsData, object.cabazes[4].content.flat());

    const cabazName     = object.cabazes[4].name;
    const cabazPrice    = sheetsData['5']?.preco   ?? object.cabazes[4].price;
    const cabazContent  = allContent.premium;
    const cabazNumOne   = object.cabazes[0].open;
    const cabazNumTwo   = object.cabazes[1].open;
    const cabazNumThree = object.cabazes[2].open;
    const createCabaz   = object.cabazes[3].open;

    const contentHTML = cabazContent.join('<br>');

    secCabazExtra.innerHTML += `
        <div class="cabaz-box">
            <h2 class="cabaz-name-title">${cabazName}</h2>
            <span class="cabazPrice">${cabazPrice} €</span>
            <div class="cabaz-content">
                <div class="cabaz-list">${contentHTML}</div>
                <button type="button" class="add-to-cart-button-extra">Adicionar ao Cesto</button>
            </div>
        </div>
        <div class="sugestionsContent">
            <h4 class="sugestionsTitle">Outras Sugestões:</h4>
            <div class="sugestionOne sugestion"><a href="${cabazNumOne}"><span>Cabaz pequeno</span></a></div>
            <div class="sugestionTwo sugestion"><a href="${cabazNumTwo}"><span>Cabaz médio</span></a></div>
            <div class="sugestionThree sugestion"><a href="${cabazNumThree}"><span>Cabaz grande</span></a></div>
            <div class="sugestionFour sugestion"><a href="${createCabaz}"><span>Criar Cabaz</span></a></div>
        </div>
    `;

    addCabazToCart();
    updateNumbItemsOnCart();
});

function addCabazToCart() {
    const addToCartBtn = secCabazExtra.querySelector('.add-to-cart-button-extra');
    addToCartBtn.addEventListener('click', () => {
        const name      = secCabazExtra.querySelector('.cabaz-name-title').textContent;
        const itemPrice = secCabazExtra.querySelector('.cabazPrice').textContent;
        const cart      = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ itName: name, itImageSrc: '', itPrice: itemPrice, itQuantity: '1 Cabaz', itTotal: itemPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateNumbItemsOnCart();
        showAllert(name);
    });
}

function showAllert(name) {
    const alert = document.querySelector('.alert');
    alert.classList.add('show-alert');
    alert.innerHTML = `
        <span class="cart-changed-message">${name} adicionado(a) ao Cesto</span>
        <button class="see-cart"><a href="/html/carrinho.html">Ver Cesto</a></button>
    `;
    setTimeout(() => alert.classList.remove('show-alert'), 2000);
}

function updateNumbItemsOnCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('div .article-number').forEach(el => {
        el.textContent = cart.length > 0 ? cart.length : '0';
    });
}