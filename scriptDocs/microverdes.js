const secMicroverdes = document.querySelector('.microverdes');

async function callMicroverdes () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callMicroverdes();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    } 

    for (let i = 0; i < object.microverdes.length; i++) {

        let microverdesName = object.microverdes[i].name;
        let microverdesPrice = object.microverdes[i].price;
        let image = object.microverdes[i].image;
        
        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }

        secMicroverdes.innerHTML += `
        <div class="boxItem">
            <h3>${microverdesName}</h3>
            <img src="${image}" alt="">
            <div class="kiloPrice">${microverdesPrice}<span>€/kilo</span></div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <!-- <option value="">Quantidade</option> -->
                <option value="25gr">25 gr</option>
                <option value="50gr">50 gr</option>
                <option value="75gr">75 gr</option>
                <option value="100gr">100 gr</option>
                <option value="150gr">150 gr</option>
                <option value="200gr">200 gr</option>
                <option value="250gr">250 gr</option>
                <option value="500gr">500 gr</option>
                <option value="1Un">1 Un</option>
                <option value="2Un">2 Un</option>
                <option value="3Un">3 Un</option>
            </select>
            <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
            <div class="priceToPay">Total<span>€</span></div>
            <button class="addToCart btn btn-success">Comprar</button>
        </div>
        `

        
    }


  
})