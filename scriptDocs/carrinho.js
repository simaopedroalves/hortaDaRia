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
                        <span class="quantity">${quantity}</span>
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

        // let cart = JSON.parse(localStorage.getItem('cart'))
        
        let itemName = btn.parentElement.parentElement.parentElement.querySelector('.itName').textContent;
        let itemQuantity = btn.parentElement.parentElement.parentElement.querySelector('div .quantity').textContent;
        remove(itemName, itemQuantity)
        alertItemRemoved(btn);
        calcFinalPrice();
    })

});

function remove(itemName, itemQuantity) {

    let cart = JSON.parse(localStorage.getItem('cart'))
    
    for (let i = 0; i < cart.length; i++) {
        
        if (cart[i].itName === itemName && cart[i].itQuantity === itemQuantity) {
            cart.splice(i, 1);
        }
        if (cart.length === 0) {
            location.reload()
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateNumbItemsOnCart()
}

function alertItemRemoved (btn) {
    
    let name = btn.parentElement.parentElement.parentElement.querySelector('.itName').textContent;
    
    let alert = document.querySelector('.alert');
    alert.classList.add('show-alert');

    alert.innerHTML = `
        <span class="cart-changed-message">${name} removido(a) do Cesto</span>
    `

    setTimeout(() => {
        alert.classList.remove('show-alert')
    }, 2000);
}

function clearCart () {
    let deleteCartBtn = document.querySelector('.delete-cart');
    let cart = JSON.parse(localStorage.getItem('cart'))

    deleteCartBtn.addEventListener('click', () => {

        cart = []

        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload()
    })
}

clearCart()

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

function calcFinalPrice () {
    let finalPrice = document.querySelector('.final-price');
    let priceToPay = document.querySelectorAll('.priceToPay');
    let sumAllPricesArr = [];

    priceToPay.forEach(price => {
        let allPrices = parseFloat(price.textContent);
        sumAllPricesArr.push(allPrices);
    })

    let sum = sumAllPricesArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    );
    sum = sum.toFixed(2)
    finalPrice.textContent = sum + '€'

    localStorage.setItem('finalPrice', JSON.stringify(sum))
}

calcFinalPrice()

function enableOrDisableButtonOnTop () {

    let cart = JSON.parse(localStorage.getItem('cart'));
    let delCartAndAdvanceBtnDiv = document.querySelector('.buttonsDelAndAdvance');
    
    document.addEventListener('DOMContentLoaded', () => { 
        
        if (cart.length == 0) {
            delCartAndAdvanceBtnDiv.classList.add('hide-button')
        }

        if (cart.length > 0) {
            delCartAndAdvanceBtnDiv.classList.remove('hide-button')

        }
    })
}

enableOrDisableButtonOnTop()
// ========================  ADVANCE PAGE Nº 1  ===========================================
// reload page when the user retroced after submit the form
window.onpageshow = (e) => {
    if(e.persisted) {
        window.location.reload()
    }
}

