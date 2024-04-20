const secfloresComestiveis = document.querySelector('.floresComestiveis');

async function callFloresComestiveis () {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = '';

    try {
        object = await callFloresComestiveis();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error)
    }

    for (let i = 0; i < object.verduras.length; i++) {
        
        let floresComestiveisName = object.floresComestiveis[i].name;
        let floresComestiveisPrice = object.floresComestiveis[i].price;
        let image = object.floresComestiveis[i].image;

        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }
        
        secfloresComestiveis.innerHTML += `
        <div class="boxItem">
            <h3>${floresComestiveisName}</h3>
            <img src="${image}" alt="">
            <div class="kiloPrice">${floresComestiveisPrice}<span>€/kilo</span></div>
            <select type="text" min="1" class="quantity" placeholder="quantidade">
                <!-- <option value="">Quantidade</option> -->
                <option value="1Un">1 Un</option>
                <option value="5Un">5 Un</option>
                <option value="10Un">10 Un</option>
                <option value="25Un">25 Un</option>
                <option value="50Un">50 Un</option>
                <option value="75Un">75 Un</option>
                <option value="100Un">100 Un</option>
                <option value="250Un">250 Un</option>
                <option value="500Un">500 Un</option>
            </select>
        <!-- Igual à quantidade a multiplicar pelo preço por kilo -->
        <div class="priceToPay">Total<span>€</span></div>
        <button class="addToCart btn btn-success">Comprar</button>
    </div>
        `

    }
})