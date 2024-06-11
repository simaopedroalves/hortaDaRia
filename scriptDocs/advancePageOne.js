const deliverAtHomeRadioBtn = document.querySelector('#deliver-box');
const pickUpRadioBtn = document.querySelector('#pick-up-box');
const pickUpAtHortaBtn = document.querySelector('#horta');
const pickUpAtMercadoBtn = document.querySelector('#praca');
const deliverSection = document.querySelector('.deliver-sec');
const pickUpSection = document.querySelector('.pick-up-sec');
const pickUpHortaSection = document.querySelector('.horta-pick-up-sec');
const allInputs = document.querySelectorAll('input')
 
// when user click on button 'Entrega', the sections that are not related with delivery dissapear
function disableInputs () {
    allInputs.forEach(el => {
        el.setAttribute('readonly', true)
    })
}

disableInputs()

function enableInputs () {
    allInputs.forEach(el => {
        el.removeAttribute('readonly', true)
    })
}

deliverAtHomeRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.add('hide-section');
    pickUpHortaSection.classList.add('hide-section');
    deliverSection.classList.remove('hide-section');
    enableInputs()
});

// when user click on button 'Levantar', the sections that are not related with Pick Up dissapear
pickUpRadioBtn.addEventListener('click', () => {
    pickUpSection.classList.remove('hide-section');
    pickUpHortaSection.classList.remove('hide-section');
    deliverSection.classList.add('hide-section');
    enableInputs()
});

pickUpAtMercadoBtn.addEventListener('click', () => {
    pickUpHortaSection.classList.add('hide-section')
});

pickUpAtHortaBtn.addEventListener('click', () => {
    pickUpHortaSection.classList.remove('hide-section')
});