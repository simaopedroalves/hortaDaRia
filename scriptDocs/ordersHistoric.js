console.log('hi');
// localStorage.clear();

// ==== CHECK HISTORIC =====

let sendOrderButton = document.querySelector('.send-user-data-btn');
let recentOrder = JSON.parse(localStorage.getItem('cart')) || [];
let historic = JSON.parse(localStorage.getItem('historic')) || [];

console.log(sendOrderButton);


// sendOrderButton.addEventListener('click', () => {


//     if (recentOrder.length > 0) {
//         historic.push(...recentOrder);
//         localStorage.setItem('historic', JSON.stringify(historic));
//     } 
//     console.log('clicked');
    
// });

// Add timestamp to each order when pushing to historic
sendOrderButton.addEventListener('click', () => {
    if (recentOrder.length > 0) {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        
        recentOrder.forEach(item => {
            item.orderDay = day;
            item.orderMonth = month;
        });
        
        historic.push(...recentOrder);
        localStorage.setItem('historic', JSON.stringify(historic));
    } 
    console.log('clicked');
});


const ordersHistoricSection = document.getElementById('ordersHistoricSection');

let historicData = JSON.parse(localStorage.getItem('historic')) || [];


if (historicData.length > 0) {
    historicData.forEach(item => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('historic-item');
        let newItem = `
        <section class="order-date" style="background-image: url('${item.itImageSrc}');">
            <h4>Encomenda de: ${item.orderDay}/${item.orderMonth}</h4>
            <button class="view-order-details-btn">Ver detalhes</button>
            <button class="order-again-btn">Encomendar novamente</button>
            <button class="delete-order-btn">Eliminar encomenda</button>
        </section>
        `;
            
        newDiv.innerHTML = newItem;
        ordersHistoricSection.appendChild(newDiv);
    });
} else {
    let noOrdersMessage = document.createElement('p');
    noOrdersMessage.textContent = "Não há encomendas no histórico.";
    ordersHistoricSection.appendChild(noOrdersMessage);
}   

let viewDetailsButtons = document.querySelectorAll('.view-order-details-btn');

viewDetailsButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const orderItems = historicData[index];
        console.log('Order details:', orderItems);
        const filteredOrder = historicData.filter(order => 
            order.orderDay === orderItems.orderDay && 
            order.orderMonth === orderItems.orderMonth
        );
        console.log('Filtered order details:', filteredOrder);
    });
});

let orderAgainButtons = document.querySelectorAll('.order-again-btn');

orderAgainButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const orderItems = historicData[index];
        const filteredOrder = historicData.filter(order => 
            order.orderDay === orderItems.orderDay && 
            order.orderMonth === orderItems.orderMonth
        );
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(...filteredOrder);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        console.log('Order added to cart:', filteredOrder);
    });
});
let deleteOrderButtons = document.querySelectorAll('.delete-order-btn');

deleteOrderButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const orderItems = historicData[index];
        historic = historic.filter(order => 
            !(order.orderDay === orderItems.orderDay && 
              order.orderMonth === orderItems.orderMonth)
        );
        localStorage.setItem('historic', JSON.stringify(historic));
        location.reload();
    });
});

// para apresentar cada encomenda
// let newItem = `
//             <img src="${item.itImageSrc}" alt="${item.itName}" class="product-image"/>
//             <h3>${item.itName}</h3>
//             <p>Quantidade: ${item.itQuantity}</p>`;