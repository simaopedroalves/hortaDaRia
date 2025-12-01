const popUpEncomendas = document.querySelector('.pop-up-encomendas');

export function setPopUpEncomendas(customMessage = null) {

    const existingPopup = popUpEncomendas.querySelector('.pop-up-mensagem');
    
    if (existingPopup) {
        popUpEncomendas.removeChild(existingPopup);
    }

    let paragraphOne = '';
    let paragraphTwo = '';
    let today = new Date()
    today = today.toString().split(' ');
    today = today[0];
    today = 'Sun'


    if (customMessage) {  
        ({ paragraphOne, paragraphTwo } = customMessage);  
    }

    else if  (today === 'Mon')  {
        paragraphOne = 'Consulta os novos cabazes que preparámos e faz a tua encomenda!'
        paragraphTwo = 'Tens até quarta-feira para a fazer.'
    }
    else if (today === 'Tue') {
        paragraphOne = 'Consulta os nossos cabazes e faz a tua encomenda!'
        paragraphTwo = 'Tens até amanhã para a fazer.'
    }
    else if (today === 'Wed') {
        paragraphOne = 'Último dia da semana para fazeres a tua encomenda!'
        paragraphTwo = 'Não percas mais tempo e cria o teu cabaz!'
    }

    else if (today === 'Thu' || today === 'Fri') {
        paragraphOne = 'Encomendas encerradas! Entra em contacto connosco pelos meios alternativos.'
        paragraphTwo = 'Ainda podes conseguir reservar o teu cabaz!'
    }

    else if (today === 'Sat') {
        paragraphOne = 'Encomendas encerradas!'
        paragraphTwo = 'Vem visitar-nos ao Mercado Municipal de Famalicão até às 12:30h!'
    }

    // else {
    //     paragraphOne = 'Encomendas encerradas! Dá uma vista de olhos aos nossos produtos.'
    //     paragraphTwo = 'Amanhã teremos novos cabazes!'
    // }


    // Cabazes indisponiveis temporariamente - apagar "today = 'Sun'" acima para voltar ao normal

    
    else {
        paragraphOne = 'Não haverá cabazes disponíveis até fevereiro/março.'
        paragraphTwo = 'Entretanto, pode encontrar os nossos produtos disponíveis, no Mercado Municipal, todos os sábados de manhã.'
    }

    const popUpMessage = document.createElement('div');
    popUpMessage.classList.add('pop-up-mensagem');
    popUpMessage.innerHTML = `
                <i class="fa-solid fa-rectangle-xmark close-pop-up-button"></i>

                    <p>${paragraphOne}</p>
                    <p>${paragraphTwo}</p>
    `;
    popUpEncomendas.appendChild(popUpMessage); 

    const closePopUpButton = document.querySelector('.close-pop-up-button');
    // close pop-up encomendas

    closePopUpButton.addEventListener('click', () => {
        popUpEncomendas.classList.replace('pop-up-encomendas-opened','pop-up-encomendas');
    });

    setTimeout (() => {popUpEncomendas.classList.replace('pop-up-encomendas','pop-up-encomendas-opened')}, 2000);

}

setPopUpEncomendas()

// open pop-up encomendas

// export function openPopUpEncomendas() {
//    setTimeout (() => {popUpEncomendas.classList.replace('pop-up-encomendas','pop-up-encomendas-opened')}, 2000);
// }


