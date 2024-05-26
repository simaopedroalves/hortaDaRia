import {updateNumbItemsOnCart} from "/script.js"

const shoppingCart = document.querySelector('.cartList');


function createCart() {

    let cart = JSON.parse(localStorage.getItem('cart'));

    cart.forEach((el) => {
        let name = el.itName;
        let image = el.itImageSrc;
        let price = el.itPrice;
        let quantity = el.itQuantity;
        let newDiv = document.createElement('div');
        newDiv.classList.add('box-cart');
        
        var newItem = `
            <div class="box-1">
                <img src="${image}" alt="">
            </div>
                    
            <div class="box-2">

                <h3 class="itName">${name}</h3>

                <div class="box-2-child">
                    <select type="text" min="1" class="quantity" placeholder="quantidade">
                        <option value="">${quantity}</option>
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
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].itName == itemName) {
                cart.splice(cart[i], 1)
                localStorage.setItem('cart', JSON.stringify(cart))
            }
        }
        updateNumbItemsOnCart()
        alertItemRemoved(btn)
    })
});

function alertItemRemoved (btn) {
    
    let name = btn.parentElement.parentElement.parentElement.querySelector('.itName').textContent;
    
    alert(`${name} foi removido do cesto!`)

}