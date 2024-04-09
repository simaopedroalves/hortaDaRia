const secSaladas = document.querySelector('.saladas');

async function callSaladas () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callSaladas();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.saladas.length; i++) {
        
        let saladaName = object.saladas[i].name;
        let saladaPrice = object.saladas[i].price;
        let image = object.saladas[i].image;

        
        secSaladas.innerHTML += `
        <div class="boxItem">
            <h3>${saladaName}</h3>
            <img src="${image}" alt="">
            <div class="kiloPrice">${saladaPrice}<span>€/kilo</span></div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <!-- <option value="">Quantidade</option> -->
                <option value="100gr">100 gr</option>
                <option value="250gr">250 gr</option>
                <option value="500gr">500 gr</option>
                <option value="750gr">750 gr</option>
                <option value="1Kg">1 Kg</option>
                <option value="2Kg">2Kg</option>
                <option value="1Un">1 Unidade</option>
                <option value="2Un">2 Unidades</option>
            </select>
            <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
            <div class="priceToPay">Total<span>€</span></div>
            <button class="addToCart btn btn-success">Comprar</button>
        </div>
        `

    }
})