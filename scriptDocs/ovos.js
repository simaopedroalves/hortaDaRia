const secOvos = document.querySelector('.ovos');

async function callOvos () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callOvos();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.ovos.length; i++) {
        
        let ovosName = object.ovos[i].name;
        let ovosPrice = object.ovos[i].price;
        let image = object.ovos[i].image;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secOvos.innerHTML += `
            <div class="boxItem">
                <h3>${ovosName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${ovosPrice}<span>€/kilo</span></div>
                <select type="text" min="1" class="quantity" placeholder="quantidade">
                    <!-- <option value="">Quantidade</option> -->
                    <option value="1/2-duzia">1/2 dúzia</option>
                    <option value="1-duzia">1 dúzia</option>
                    <option value="duzia_e_meia">dúzia e meia</option>
                    <option value="2-duzias">2 dúzias</option>
                    <option value="3-duzias">3 dúzias</option>
                </select>
                <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
                <div class="priceToPay">Total<span>€</span></div>
                <button class="addToCart btn btn-success">Comprar</button>
            </div>
        `

    }
})