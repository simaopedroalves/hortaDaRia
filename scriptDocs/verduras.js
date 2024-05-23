import {updateNumbItemsOnCart} from '/script.js'

const secVerduras = document.querySelector('.verduras');

async function callVerduras () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callVerduras();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.verduras.length; i++) {
        
        let verdurasName = object.verduras[i].name;
        let verdurasPrice = object.verduras[i].price;
        let image = object.verduras[i].image;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }
        
        secVerduras.innerHTML += 
        `
            <div class="boxItem">
                <h3>${verdurasName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${verdurasPrice}<span>€/Kg</span></div>
                <select type="text" min="1" class="quantity" placeholder="quantidade">
                    <!-- <option value="">Quantidade</option> -->
                    <option value="100gr">100 gr</option>
                    <option value="250gr">250 gr</option>
                    <option value="500gr">500 gr</option>
                    <option value="750gr">750 gr</option>
                    <option value="1kg">1 kg</option>
                    <option value="1.5kg">1.5 kg</option>
                    <option value="2kg">2 kg</option>
                    <option value="1Un">1 Un</option>
                    <option value="2Un">2 Un</option>
                </select>
                <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
                <div class="priceToPay">Total<span>€</span></div>
                <button class="addToCart btn btn-success">Comprar</button>
            </div>
        `

    }
    updateNumbItemsOnCart()
})