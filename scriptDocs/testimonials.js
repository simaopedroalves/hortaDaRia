const secTestimonials = document.querySelector('.testimonials');

async function callTestimonials() {
    return (await fetch('/productsList.json')).json()
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

        // let image = object.ervasAromaticasECha[i].image;
    
        // console.log('Nome: ' + ervaName + '\n' + 'Preço: ' + ervaPrice)
        
        secTestimonials.innerHTML += 
        `
            <div class="client-testimonial">
                <h4 class="client-name">${clientName}</h4>
                <p class="testimonial-text">${clientTestimonial}</p>
                <div class="date-and-job">
                    <h6 class="testimonial-date">${testimonialDate}</h6>
                </div>
            </div>
        `
    }

    
})