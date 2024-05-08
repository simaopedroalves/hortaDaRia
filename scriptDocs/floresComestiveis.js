const secfloresComestiveis = document.querySelector('.floresComestiveis');
const cartList = document.querySelector('.shopping-cart')
const cart = [];


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


    

    for (let i = 0; i < object.floresComestiveis.length; i++) {
        
        let floresComestiveisName = object.floresComestiveis[i].name;
        let floresComestiveisPrice = object.floresComestiveis[i].price;
        let image = object.floresComestiveis[i].image;
        let product_id = object.floresComestiveis[i].productId;


        //WHEN, IN productList.json() AN IMAGE KEY IS AN EMPTY STRING
        if (image == '') {
            image = "/images/logo.png";
        }
        
        secfloresComestiveis.innerHTML += `
        <div class="boxItem">
            <h3 id="itName">${floresComestiveisName}</h3>
            <img src="${image}" alt="">
            <div class="kiloPrice">${floresComestiveisPrice}€/Un</div>
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
            <div class="priceToPay"></div>
            <button class="addToCart btn btn-success">Comprar</button>
        </div>
        `

        let addCartBtn = document.querySelectorAll('.addToCart');
        let titleName = document.querySelectorAll('#itName');
        let selectedOptionValue = document.querySelectorAll('.quantity');
        let kiloPrice = document.querySelectorAll('.kiloPrice');
        let finalItemPrice = document.querySelectorAll('.priceToPay') 

                // cartList.appendChild(document.createElement('div'));
      

        selectedOptionValue.forEach((btn, i) => {

            btn.addEventListener('click', () => {           

                function finalPricePerItem (kg, qt) {
                    var priceToPay = 0;
                    kg = parseFloat(selectedOptionValue[i].value);
                    qt = parseFloat(kiloPrice[i].textContent)
                    priceToPay = kg * qt
                    finalItemPrice[i].textContent = priceToPay + ' €'
                    return priceToPay

                }

                finalPricePerItem() 

                // function addCartToHTML () { 
                
                //     let newItem = document.createElement('div')
                //     let totalPrice = document.querySelectorAll('.priceToPay')

                //     newItem.classList.add('box-cart');
                //      cartList.textContent = '';
                //      cartList.appendChild(newItem) 

                //     newItem.innerHTML = `
                    
                //         <div class="box-1">
                //             <img src="${image}" alt="">
                //         </div>
                            
                //         <div class="box-2">

                //             <h3>${floresComestiveisName}</h3>

                //             <div class="box-2-child">
                //                 <button class="lessOneItemBtn">-</button>
                //                 <input type="number" >
                //                 <button class="oneMoreItemBtn">+</button>
                //             </div>

                //             <div>
                //                 <span class="priceToPay">${totalPrice}</span>
                //                 <button><i class="fa-regular fa-trash-can"></i></button>
                //             </div>
                //         </div>
                //     `
                //   console.log(newItem)
                // }

            })
            
        })

// aqui o objetivo é adicionar o item ao carrinho com outro stylesheet ja defenido
        

            // para ser adicionado à memoria
            // function addCartToLocalStorage() {
            //     localStorage.setItem('cart', JSON.stringify(cart))
            // }
            
        

    }
})

