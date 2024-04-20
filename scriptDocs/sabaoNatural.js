const secSabaoNatural = document.querySelector('.sabaoNatural');

async function callSabaoNatural () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callSabaoNatural();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.sabaoNatural.length; i++) {
        
        let sabaoNaturalName = object.sabaoNatural[i].name;
        let sabaoNaturalPrice = object.sabaoNatural[i].price;
        let image = object.sabaoNatural[i].image;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secSabaoNatural.innerHTML += `
            <div class="boxItem">
                <h3>${sabaoNaturalName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${sabaoNaturalPrice}<span>€/kilo</span></div>
                <select type="text" min="1" class="quantity" placeholder="quantidade">
                    <!-- <option value="">Quantidade</option> -->
                    <option value="1Un">1 Un</option>
                    <option value="2Un">2 Un</option>
                    <option value="3Un">3 Un</option>
                    <option value="4Un">4 Un</option>
                    <option value="5Un">5 Un</option>
                    <option value="10Un">10 Un</option>
                </select>
                <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
                <div class="priceToPay">Total<span>€</span></div>
                <button class="addToCart btn btn-success">Comprar</button>
            </div>
        `

    }
})