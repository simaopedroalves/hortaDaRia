// HEADER
// GOOGLE TAG INSIDE HEADER FUNCTION

export function header() {
    const header = document.querySelector('header');

    if (header) {
        header.innerHTML = `

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C2520N6HZE"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-C2520N6HZE');
</script>
  
         <nav class="navbar" id="navBar">

            <div class="logo-img-div">
                <a href="https://hortadaria.com/" target="_self">
                    <img src="/images/logo.png" class="logo-img" alt="Logotipo - Horta d'Ria - Agricultura Natural - cor verde">
                </a>
            </div> 

            <div class="logo-img-div">
                <a href="https://hortadaria.com/" target="_self">
                     <h1>
                         Horta d'Ria
                     </h1>
                </a>
            </div>

            <div class="cart-and-menu">

                <a href="/html/ordersHistoric.html">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                </a>

                <i class="fa-solid fa-magnifying-glass"></i>

                <div class="cart-div">
                    <a href="/html/carrinho.html">
                        <!-- cesto -->
                        <i class="fa-solid fa-basket-shopping"></i>
                    </a>
                    <span class="article-number"></span>
                </div>
                <!-- menu para telemovel -->
                <i class="fa-solid fa-bars-staggered openMenu"></i>
            </div>

        </nav>

        <ul class="menu-list">
                <!-- href.value = element.id.value -->
            <a href="/html/aboutUs.html"> <li>Quem Somos</li>  </a>
            <a href="/index.html#cabazesMenu" id="cabazesButton"><li>Cabazes</li></a>
            <a href="/html/produtos.html"> <li>Produtos</li></a>
            <a href="/html/form.html"> <li>Contactos</li></a>
            <a href="/html/informations.html"> <li>Informações</li></a>
            <a href="/html/testemunhos.html"> <li>Testemunhos</li></a>
            <a href="/html/basketHistoric.html"> <li>Fotos</li></a>
            <a href="/html/videos.html"><li>Videos</li></a>
        </ul>
        `
    }
}

header();


export function bottomIconsMenu () {
    if (document.getElementById('bottomIconsMenu')) {
        const bottomIconsMenu = document.getElementById('bottomIconsMenu');
        bottomIconsMenu.innerHTML = `
        <section class="bottom-menu" id="bottomIconsMenu">
            <div class="home">
                <a href="/index.html">
                    <i class="fa-solid fa-house"></i>
                </a>
            </div>
        
            <div class="cart-div">
                <a href="/html/carrinho.html">
                    <i class="fa-solid fa-basket-shopping"></i>
                </a>
                <span class="article-number"></span>
            </div>
        
        
            <div class="info">
                <a href="/html/informations.html">
                    <i class="fa-solid fa-info"></i>
                </a>
            </div>
            <div class="criar-cabaz">
                <a href="/html/produtos.html">
                    <i class="fa-solid fa-seedling"></i>
                </a>
            </div>
            <div class="">
                <a href="/html/basketHistoric.html">
                    <i class="fa-solid fa-inbox"></i>
                </a>
            </div>

            <div class="cart-div">
                <a href="/html/ordersHistoric.html">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                </a>
            </div>

        </section>`
}}

bottomIconsMenu();

const openMenu = document.querySelector('.openMenu');
const menu = document.querySelector('.menu-list');
const headerMenu = document.querySelector('header');

// OPEN AND CLOSE THE MENU

openMenu.addEventListener('click', () => {
    menu.classList.toggle('show')
    openMenu.classList.toggle('fa-x')
    headerMenu.classList.toggle('change-header-overflow-x')
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.spanWithButton').forEach(button => {
        button.classList.add('see-more-button');
    });

});



const cabazesMenu = document.querySelector('#cabazesButton');

if (cabazesMenu) {
    cabazesMenu.addEventListener('click', () => {
        menu.classList.toggle('show')
        openMenu.classList.toggle('fa-x')
    });
}

// images scroll right automatically
const welcomeSection = document.querySelector('.welcomeSection');

function scrollRight() {
    welcomeSection.scrollLeft += window.innerWidth;

    if (welcomeSection.scrollLeft >= welcomeSection.scrollWidth - window.innerWidth) {
        welcomeSection.scrollLeft = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(scrollRight, 2200)
});

// menu de cabazes na pagina principal
const cabazOne = document.querySelector('.cabazOne');
const cabazTwo = document.querySelector('.cabazTwo')
const cabazThree = document.querySelector('.cabazThree')
const cabazFour = document.querySelector('.cabazFour')
const cabazExtra = document.querySelector('.cabazExtra')


async function callData() {
    return (await fetch('/ProductsData/cabazes.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = ''

    try {
        object = await callData();
    }
    catch (error) {
        console.error('ERROR')
        console.log(error)
    }

        let nameOne = object.cabazes[0].name;
        let priceOne = object.cabazes[0].price;

        cabazOne.innerHTML += `
             <div class="cabazContent">
                <h4 class="cabazName">${nameOne}</h4>
                <span class="cabazPrice">${priceOne}€</span>
            </div>
        `

        let nameTwo = object.cabazes[1].name
        let priceTwo = object.cabazes[1].price

        cabazTwo.innerHTML = `
            <div class="cabazContent">
                <h4 class="cabazName">${nameTwo}</h4>
                <span class="cabazPrice">${priceTwo}€</span>
            </div>
        `
        let nameThree = object.cabazes[2].name
        let priceThree = object.cabazes[2].price

        cabazThree.innerHTML = `
            <div class="cabazContent">
                <h4 class="cabazName">${nameThree}</h4>
                <span class="cabazPrice">${priceThree}€</span>
            </div>
        `
        let nameFour = object.cabazes[3].name
        let priceFour = object.cabazes[3].price

        cabazFour.innerHTML = `
            <div class="cabazContent">
                <h4 class="cabazName">${nameFour}</h4>
            </div>
        `

        let nameExtra = object.cabazes[4].name
        let priceExtra = object.cabazes[4].price

        cabazExtra.innerHTML = `
            <div class="cabazContent">
                <h4 class="cabazName">${nameExtra}</h4>
                <span class="cabazPrice">${priceExtra}€</span>
            </div>
        `
        // termsAndConditions()
})




// // to disable cart order and add a message that says that, using DATE.

// let dateNow = new Date()
// dateNow = dateNow.toString().split(' ');
// dateNow = dateNow[0];

// function disabledAllOrders () {

//     let orderDisableMessage = document.querySelector('.disable-orders');
  
//     if (dateNow == 'Mon' || dateNow == 'Tue' || dateNow == 'Wed')  {
//        orderDisableMessage.style.display = 'none';
//     }

//     else {
//         orderDisableMessage.style.display = 'flex'
        
//     }
// }

//  disabledAllOrders()

 
// find inside JSON data if each item have stock or not to display
// a message saying that item his out of stock

// export function findStockOfItems (stock, product_id) {
//     let box = document.getElementById(product_id)

//     if (!stock) {
//         box.querySelector('.addToCart').style.visibility = 'hidden'
//         box.querySelector('.quantity').style.visibility = 'hidden'
//         box.querySelector('.priceToPay').textContent = 'Indisponível'
//         box.querySelector('.priceToPay').style.color = 'var(--red)'
//         box.querySelector('.priceToPay').style.textTransform = 'upperCase'
//         box.style.borderColor = 'var(--red)'
//         box.style.textAlign = 'center'
//     }
// }

export function findStockOfItems (stock, product_id) {
    let box = document.getElementById(product_id)

    if (!stock) {
        box.querySelector('.addToCart').style.visibility = 'hidden'
        box.querySelector('.quantity').style.visibility = 'hidden'
        box.classList.add('out-of-stock')
    }
}


// EVENTLISTENER TO CALL HORTA D'RIA ON CLICK BUTTON

const allcallButtons = document.querySelectorAll('.media-and-contacts .contact a');

allcallButtons.forEach((el) => {
    el.href = 'tel:914547465';
});

// FOOTER - MADE BY NAME AND RESERVED RIGHTS

const madeBy = document.querySelector('.my-name');

// madeBy.forEach(nameDescription => {

//     document.addEventListener('DOMContentLoaded', () => {
//         if (nameDescription) {
//             nameDescription.textContent = "Desenvolvido por Simão Pedro";
//         } else {
//             console.error("Element with class 'my-name' not found.");
//         }
//     })
// })

madeBy.textContent = "Desenvolvido por Simão Pedro";

const reservedRigtHs = document.querySelector('.reservedRigths');
if (reservedRigtHs) {
    reservedRigtHs.textContent = "Todos os Direitos Reservados";
} else {
    console.error("Element with class 'reservedRigths' not found.");
}

  
  // update number of items to be equal to the number
// displayed on basket on top of the page
export function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('.cart-div .article-number');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    numbOfItemsOnCart.forEach(el => {
        el.textContent = '0'

        for (let i = 0; i < cart.length; i++) {
            if (cart.length > 0) {
                el.textContent = cart.length
            }
            if (cart.length <= 0) {
                el.textContent = '0'
            }
            else return
        }
    })
}

updateNumbItemsOnCart()



// ===== CAI NEVE ====
//(colocar o canvas no header para aparecer em todas as paginas, e colocar o script dentro do script.js para nao ter de colocar em todas as paginas)
  // <canvas id="modu-snow-canvas" style="position: fixed; top: 0; left: 0; pointer-events: none; z-index: 999999;"> </canvas> 
// document.addEventListener("DOMContentLoaded", function () {
//   const canvas = document.getElementById("modu-snow-canvas");
//   if (!canvas) return;

//   const ctx = canvas.getContext("2d");

//   let width = canvas.width = window.innerWidth;
//   let height = canvas.height = window.innerHeight;

//   // ❄️ SETTINGS
//   const SNOWFLAKE_COUNT = 80;
//   const MIN_SIZE = 1;
//   const MAX_SIZE = 4;

//   let particles = [];

//   for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
//     particles.push({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       r: Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE,
//       d: Math.random() * 50
//     });
//   }

//   function draw() {
//     ctx.clearRect(0, 0, width, height);
//     ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
//     ctx.beginPath();

//     for (let i = 0; i < particles.length; i++) {
//       const p = particles[i];
//       ctx.moveTo(p.x, p.y);
//       ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
//     }

//     ctx.fill();
//     update();
//   }

//   let angle = 0;

//   function update() {
//     angle += 0.01;

//     for (let i = 0; i < particles.length; i++) {
//       const p = particles[i];
//       p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
//       p.x += Math.sin(angle) * 0.5;

//       if (p.x > width + 5 || p.x < -5 || p.y > height) {
//         if (i % 3 > 0) {
//           particles[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d };
//         } else {
//           particles[i] = {
//             x: Math.sin(angle) > 0 ? -5 : width + 5,
//             y: Math.random() * height,
//             r: p.r,
//             d: p.d
//           };
//         }
//       }
//     }
//   }

//   setInterval(draw, 33);

//   window.addEventListener("resize", () => {
//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;
//   });
// });



