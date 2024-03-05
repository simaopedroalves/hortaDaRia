const secErvas = document.querySelector('.ervas');
async function callErvas() {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {
   
    let object = '';
   
    try {
        object = await callErvas();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    for (let i = 0; i < object.ervasAromaticasECha.length; i++) {
     
        let ervaName = object.ervasAromaticasECha[i].name;
        let ervaPrice = object.ervasAromaticasECha[i].price;
        let image = object.ervasAromaticasECha[i].image;
    
        // console.log('Nome: ' + ervaName + '\n' + 'Preço: ' + ervaPrice)
        
        secErvas.innerHTML += `
        <div class="boxItem">
            <h3>${ervaName}</h3>
            <img src="/images/cabaz-photo.jpeg" alt="">
            <div class="kiloPrice">${ervaPrice}<span>€/kilo</span></div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <!-- <option value="">Quantidade</option> -->
                <option value="15gr">15 gr.</option>
                <option value="25gr">25 gr.</option>
                <option value="50gr">50 gr.</option>
                <option value="100gr">100 gr.</option>
                <option value="250gr">250 gr.</option>
                <option value="500gr">500 gr.</option>
            </select>
            <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
            <div class="priceToPay">Total<span>€</span></div>
            <button class="addToCart btn btn-success">Comprar</button>
        </div>
    `
    }

    
})