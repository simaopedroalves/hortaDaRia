const secRaizes = document.querySelector('.raizes');

async function callRaizes () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callRaizes();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.raizes.length; i++) {
        
        let raizesName = object.raizes[i].name;
        let raizesPrice = object.raizes[i].price;
        let image = object.raizes[i].image;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }
        
        secRaizes.innerHTML += `
            <div class="boxItem">
                <h3>${raizesName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${raizesPrice}<span>€/kilo</span></div>
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
})