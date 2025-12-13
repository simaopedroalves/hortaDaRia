// ==== CHECK HISTORIC =====

const basketHistoric = JSON.parse(localStorage.getItem('basketHistoric')) || [];
const saveButton =  document.querySelector('.send-user-data-btn');
const cartData = JSON.parse(localStorage.getItem('cart')) || [];
const ordersHistoricSection = document.querySelector('.orders-historic-section');

saveButton.addEventListener('click', () => {
    basketHistoric.push({   items: cartData, 
                            date: new Date().toLocaleDateString() 
                        });
    localStorage.setItem('basketHistoric', JSON.stringify(basketHistoric));
    cartData = [];
    localStorage.setItem('cart', JSON.stringify(cartData));
    location.reload();
});

basketHistoric.forEach((order) => {
  // =====================
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

const orderDate = new Date(order.date);
if (orderDate < threeMonthsAgo) {
    basketHistoric.splice(basketHistoric.indexOf(order), 1);
    localStorage.setItem('basketHistoric', JSON.stringify(basketHistoric));
    return;
}

  const orderDiv = document.createElement("div"); // Create a div for each order
  orderDiv.classList.add("order-date");
  orderDiv.innerHTML = `
        <h3>Encomenda realizada em: ${order.date}</h3>
        <button class="order-again-btn">Encomendar Novamente</button>`;

  const popUpDiv = document.createElement("div"); // Create a pop-up div for order details
  popUpDiv.classList.add("pop-up-order-details");
  popUpDiv.innerHTML = `<h4>Encomenda de ${order.date}</h4>`;

  orderDiv.addEventListener("click", () => {
    popUpDiv.classList.toggle("show-order-details");
    document.querySelectorAll('.pop-up-order-details').forEach((popup) => {
        if (popup !== popUpDiv) {
            popup.classList.remove('show-order-details');
        }
    });
  });

  // ============================

  order.items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order-item");
    itemDiv.classList.add("pop-up-order-details");

    itemDiv.innerHTML = `
            <span class="item-quantity">${item.itQuantity} de: ${item.itName}</span>
        `;
    popUpDiv.appendChild(itemDiv);
    orderDiv.style.backgroundImage = `url(${item.itImageSrc})`;
  });

  orderDiv.appendChild(popUpDiv);
  ordersHistoricSection.appendChild(orderDiv);
});

function showAllert (name) {
            let alert = document.querySelector('.alert');
            alert.classList.add('show-alert');

            alert.innerHTML = `
                <span class="cart-changed-message">${name} adicionado(a) ao Cesto</span>
                <button class="see-cart">
                    <a href="/html/carrinho.html">
                        Ver Cesto
                    </a> 
                </button>
            `

            setTimeout(() => {
                alert.classList.remove('show-alert')
            }, 2000);
        }

const orderAgainButtons = document.querySelectorAll('.order-again-btn');

orderAgainButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const orderItems = basketHistoric[index].items;     
        let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart = currentCart.concat(orderItems); 
        localStorage.setItem('cart', JSON.stringify(currentCart));
        showAllert('Encomenda');
        setTimeout(() => {
              location.reload();
            }, 2000);
    });
}); 
 