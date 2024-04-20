const secPlantasEmVaso = document.querySelector('.plantasEmVaso');

async function callPlantasEmVaso () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callPlantasEmVaso();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.plantasEmVaso.length; i++) {
        
        let plantasEmVasoName = object.plantasEmVaso[i].name;
        let plantasEmVasoPrice = object.plantasEmVaso[i].price;
        let image = object.plantasEmVaso[i].image;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secPlantasEmVaso.innerHTML += `
            <div class="boxItem vasosSec">
                <h3>${plantasEmVasoName}</h3>
                <img src="${image}" alt="">
                <div class="kiloPrice">${plantasEmVasoPrice}<span>€/Un</span></div>
                <select type="text" min="1" class="quantity" placeholder="Nº de Vasos">
                    <!-- <option value="">Quantidade</option> -->
                    <option value="1UN">1 Un</option>
                    <option value="2UN">2 Un</option>
                    <option value="3UN">3 Un</option>
                    <option value="4UN">4 Un</option>
                    <option value="5UN">5 Un</option>
                    <option value="6UN">6 Un</option>
                </select>
                <div class="priceToPay">Total<span>€</span></div>
                <button class="addToCart btn btn-success">Comprar</button>
            </div>
        `

    }
})