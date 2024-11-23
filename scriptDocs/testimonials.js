// import {updateNumbItemsOnCart} from '/script.js';

const secTestimonials = document.querySelector('.testimonials');

async function callTestimonials() {
    return (await fetch('/ProductsData/testimonials.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {
   
    let object = '';
   
    try {
        object = await callTestimonials();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    for (let i = 0; i < object.testimonials.length; i++) {
     
        let clientName = object.testimonials[i].name;
        let clientTestimonial = object.testimonials[i].testimonial;
        let testimonialDate = object.testimonials[i].testimonialDate;

        secTestimonials.innerHTML += 
        `
            <div class="client-testimonial">
                <h4 class="client-name">${clientName}</h4>
                <p class="testimonial-text">"${clientTestimonial}"</p>
                <div class="date-and-job">
                    <h6 class="testimonial-date">${testimonialDate}</h6>
                </div>
            </div>
        `
    }

    updateNumbItemsOnCart()
})

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