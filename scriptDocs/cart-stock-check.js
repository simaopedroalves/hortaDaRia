// ─── Remove do carrinho itens com stock: false no Sheets ──────────────────────

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTt94zo_YFY4pz2ILaVDJDmQ_iIeD0XdSC3sASqse1a_tyIAUca2Q5Kr2yIgIqB8SJ3_zr0iCJdm1tc/pub?gid=0&single=true&output=csv';

async function fetchStockMap() {
    try {
        const text = await (await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`)).text();
        const map = {};
        text.trim().split('\n').slice(1).forEach(row => {
            const cols  = row.split(',');
            const id    = cols[0]?.trim().replace(/"/g, '');
            const name  = cols[1]?.trim().replace(/"/g, ''); // coluna B = nome
            const stock = cols[3]?.trim().replace(/"/g, '').toLowerCase() === 'true';
            if (id)   map[id]   = stock;
            if (name) map[name] = stock;
        });
        return map;
    } catch (e) {
        console.error('cart-stock-check: erro ao buscar Sheets', e);
        return null; // em caso de erro, não mexe no carrinho
    }
}

async function removeOutOfStockFromCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length === 0) return;

    const stockMap = await fetchStockMap();
    if (!stockMap) return; // falha silenciosa — protege o carrinho

    const before = cart.length;
    const clean  = cart.filter(item => {
        // tenta por nome (itName); se não encontrar entrada, deixa ficar
        const inStock = stockMap[item.itName];
        return inStock !== false; // remove só se explicitamente false
    });

    if (clean.length < before) {
        localStorage.setItem('cart', JSON.stringify(clean));
        console.log(`cart-stock-check: ${before - clean.length} item(s) removido(s) por falta de stock`);
    }
}

// Corre imediatamente — antes de qualquer renderização
removeOutOfStockFromCart();