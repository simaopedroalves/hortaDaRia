// import {updateNumbItemsOnCart} from "/script.js"

const shoppingCart = document.querySelector('.cartList');


function createCart() {

    let cart = JSON.parse(localStorage.getItem('cart'));

    cart.forEach((el) => {
        let name = el.itName;
        let image = el.itImageSrc;
        let price = el.itTotal;
        let quantity = el.itQuantity;
        let newDiv = document.createElement('div');
        newDiv.classList.add('box-cart');
        let emptyCarMessage = document.querySelector('.empty-car-message');

        if(cart.length >= 1) {
            emptyCarMessage.style.display = 'none';
        }

        if (image == "") {
            image = "/images/logo.png"
        }

        var newItem = `
            <div class="box-1">
                <img src="${image}" alt="">
            </div>
                    
            <div class="box-2">

                <h3 class="itName">${name}</h3>

                <div class="box-2-child">
                        <span value="">${quantity}</span>
                    <!--
                        <option value="1Un">1 Un</option>
                        <option value="5Un">5 Un</option>
                        <option value="10Un">10 Un</option>
                        <option value="25Un">25 Un</option>
                        <option value="50Un">50 Un</option>
                        <option value="75Un">75 Un</option>
                        <option value="100Un">100 Un</option>
                        <option value="250Un">250 Un</option>
                        <option value="500Un">500 Un</option>
                    -->
                    </select>
                </div>

                <div>
                    <span class="priceToPay">${price}</span>
                    <button><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        ` 

        newDiv.innerHTML = newItem;
        shoppingCart.appendChild(newDiv);
        // console.log(shoppingCart);

        // <div class="totalPriceDiv">
        //     <span>Total: </span>
        //     <span class="totalPrice">0</span>
        //     <span>€</span>
        // </div> 
        // updateCartTotal(`${price}`)

    })
    updateNumbItemsOnCart()

}

createCart()



const allTrashBtn = document.querySelectorAll('.fa-trash-can');

allTrashBtn.forEach(btn => {

    
    btn.addEventListener('click', (event) => {
        btn = event.target;
        let div = btn.parentElement.parentElement.parentElement.parentElement;
        div.remove()
        let cart = JSON.parse(localStorage.getItem('cart'))
        
        let itemName = btn.parentElement.parentElement.parentElement.querySelector('.itName').textContent;
        cart.splice(itemName, 1)
        localStorage.setItem('cart', JSON.stringify(cart))
        remove(itemName)
        updateNumbItemsOnCart()
        alertItemRemoved(btn);
    })

});


// REMOVE ITEM FROM LOCALSTORAGE
function remove(itemName) {

    let cart = JSON.parse(localStorage.getItem('cart'))
    
    for (let i = 0; i < cart.length; i++) {
        
        if (cart[i].itName === itemName) {
            cart.splice(i, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    }

}

function alertItemRemoved (btn) {
    
    let name = btn.parentElement.parentElement.parentElement.querySelector('.itName').textContent;
    
    alert(`${name} foi removido do cesto!`)
}

function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('nav .article-number');
    let cart = JSON.parse(localStorage.getItem('cart'));

    numbOfItemsOnCart.forEach(el => {
        el.textContent = '0'

        for (let i = 0; i < cart.length; i++) {
            if (cart.length > 0) {
                el.textContent = cart.length
            }
            if (cart.length <= 0) {
                el.textContent = '0'
            }
        }
    })
}

// TROCAR O OBJETO DO CARRINHO E PASSAR DE CADA ITEM PRA O CARRINHO APENAS O
// VALOR FINAL E NÃO O VALOR POR UN OU KG

// function updateCartTotal() {
//     let price = document.querySelectorAll('.box-2-child');

//     price.forEach(el => {
//         console.log(el.textContent)
//     })
    

// }

